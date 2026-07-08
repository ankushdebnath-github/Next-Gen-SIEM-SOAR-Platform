import {
  Component, Input, Output, EventEmitter, OnChanges, OnDestroy,
  AfterViewInit, ElementRef, ViewChild, NgZone,
  ChangeDetectionStrategy, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3          from 'd3';
import { GraphNode, GraphEdge, OsintGraph } from '../../models/osint.model';

// ── Visual config ─────────────────────────────────────────────────────────

const NODE_STYLES: Record<string, { fill: string; stroke: string; r: number; icon: string }> = {
  ip:     { fill: '#0d2a4d', stroke: '#00d4ff', r: 32, icon: '⬡' },
  vt:     { fill: '#1a1a2e', stroke: '#e040fb', r: 26, icon: '🛡' },
  engine: { fill: '#1a0a0a', stroke: '#ef4444', r: 18, icon: '⚠' },
  shodan: { fill: '#0a1a1a', stroke: '#00bcd4', r: 26, icon: '📡' },
  asn:    { fill: '#0a1a0a', stroke: '#4caf50', r: 20, icon: '🌐' },
  port:   { fill: '#1a1a0a', stroke: '#ff9800', r: 18, icon: '🔌' },
};

const MITIGATED_IP_STYLE = {
  fill:   '#0a2a0a',
  stroke: '#22c55e',
  glow:   'rgba(34,197,94,0.5)',
};

const EDGE_COLORS: Record<string, string> = {
  analyzed_by: '#9c27b0',
  detected_by: '#ef4444',
  scanned_by:  '#00bcd4',
  belongs_to:  '#4caf50',
  exposes:     '#ff9800',
};

@Component({
  selector:        'app-osint-graph',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './osint-graph.component.html',
  styleUrls:       ['./osint-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OsintGraphComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input()  graph!:    OsintGraph;
  @Input()  mitigated = false;
  @Output() nodeSelected = new EventEmitter<GraphNode>();

  @ViewChild('svgContainer', { static: true })
  private svgRef!: ElementRef<SVGElement>;

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private sim!: d3.Simulation<GraphNode, GraphEdge>;
  private resizeObserver!: ResizeObserver;
  private renderScheduled = false;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    // Watch the SVG container for size changes — re-render when it settles
    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.graph?.nodes?.length) {
          this.scheduleRender();
        }
      });
      this.resizeObserver.observe(this.svgRef.nativeElement.parentElement!);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graph'] && this.graph?.nodes?.length) {
      // Delay render by one frame to let the DOM finish layouting
      this.zone.runOutsideAngular(() => this.scheduleRender());
    }
    if (changes['mitigated'] && !changes['graph'] && this.svg) {
      this.zone.runOutsideAngular(() => this.applyMitigatedStyle());
    }
  }

  private scheduleRender(): void {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    // Use requestAnimationFrame so the browser has finished layout
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      this.render();
    });
  }

  // ── Mitigated recolor ─────────────────────────────────────────────────

  private applyMitigatedStyle(): void {
    if (!this.svg) return;

    this.svg.selectAll<SVGGElement, GraphNode>('.graph-node')
      .filter((d) => d.type === 'ip')
      .each(function () {
        const group = d3.select(this);

        group.selectAll('circle')
          .transition().duration(600)
          .attr('fill',   (_d, i) => i === 0 ? 'none' : MITIGATED_IP_STYLE.fill)
          .attr('stroke', MITIGATED_IP_STYLE.stroke);

        group.selectAll('text').filter((_d, i) => i === 0)
          .transition().duration(400).text('🔒');

        group.selectAll('text').filter((_d, i) => i === 1)
          .attr('fill', MITIGATED_IP_STYLE.stroke);

        group.insert('circle', ':first-child')
          .attr('r', 40).attr('fill', 'none')
          .attr('stroke', MITIGATED_IP_STYLE.glow)
          .attr('stroke-width', 8).attr('opacity', 0.8)
          .transition().duration(1200)
          .attr('r', 56).attr('opacity', 0)
          .remove();
      });
  }

  // ── D3 render ─────────────────────────────────────────────────────────

  private render(): void {
    const container = this.svgRef.nativeElement.parentElement!;
    const width  = container.clientWidth  || 800;
    const height = container.clientHeight || 500;

    if (width < 50 || height < 50) return; // container not visible yet

    if (this.sim) this.sim.stop();
    const el = this.svgRef.nativeElement;
    d3.select(el).selectAll('*').remove();

    const nodes: GraphNode[] = this.graph.nodes.map((n) => ({ ...n }));
    const edges: GraphEdge[] = this.graph.edges.map((e) => ({ ...e }));

    // SVG fills container exactly
    this.svg = d3.select(el as SVGSVGElement)
      .attr('width',  width)
      .attr('height', height)
      .style('width',  '100%')
      .style('height', '100%');

    // ── Defs: arrow markers + glow filter ─────────────────────────────
    const defs = this.svg.append('defs');

    // Glow filter for IP node
    const glowFilter = defs.append('filter').attr('id', 'ip-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    glowFilter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    Object.entries(EDGE_COLORS).forEach(([rel, color]) => {
      defs.append('marker')
        .attr('id', `arrow-${rel}`)
        .attr('viewBox', '0 -4 8 8')
        .attr('refX', 22).attr('markerWidth', 6).attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path').attr('d', 'M0,-4L8,0L0,4').attr('fill', color);
    });

    // ── Background grid ────────────────────────────────────────────────
    const gridSpacing = 40;
    const grid = defs.append('pattern')
      .attr('id', 'grid').attr('width', gridSpacing).attr('height', gridSpacing)
      .attr('patternUnits', 'userSpaceOnUse');
    grid.append('path')
      .attr('d', `M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`)
      .attr('fill', 'none').attr('stroke', 'rgba(0,212,255,0.04)').attr('stroke-width', 0.5);
    this.svg.append('rect').attr('width', width).attr('height', height)
      .attr('fill', 'url(#grid)');

    // ── Zoom / pan ────────────────────────────────────────────────────
    const root = this.svg.append('g');
    this.svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.2, 4])
        .on('zoom', (event) => root.attr('transform', event.transform))
    );

    // ── Force simulation ──────────────────────────────────────────────
    this.sim = d3.forceSimulation<GraphNode>(nodes)
      .force('link',
        d3.forceLink<GraphNode, GraphEdge>(edges)
          .id((d) => d.id)
          .distance((e) => {
            const s = (e.source as GraphNode).type;
            const t = (e.target as GraphNode).type;
            if (s === 'ip' || t === 'ip') return Math.min(width, height) * 0.22;
            return Math.min(width, height) * 0.15;
          })
          .strength(0.5)
      )
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force('collide', d3.forceCollide<GraphNode>().radius((d) => (NODE_STYLES[d.type]?.r ?? 18) + 20))
      .force('x', d3.forceX(width  / 2).strength(0.04))
      .force('y', d3.forceY(height / 2).strength(0.04))
      .alphaDecay(0.025);

    // ── Edges ────────────────────────────────────────────────────────
    const link = root.append('g').attr('class', 'edges')
      .selectAll('line').data(edges).join('line')
      .attr('stroke',         (e) => EDGE_COLORS[e.label] ?? '#334')
      .attr('stroke-width',   1.5)
      .attr('stroke-opacity', 0.5)
      .attr('marker-end',     (e) => `url(#arrow-${e.label})`);

    const edgeLabel = root.append('g').attr('class', 'edge-labels')
      .selectAll('text').data(edges).join('text')
      .attr('font-size', 9)
      .attr('font-family', 'var(--font-mono)')
      .attr('fill', 'rgba(100,150,200,0.5)')
      .attr('text-anchor', 'middle')
      .text((e) => e.label);

    // ── Nodes ────────────────────────────────────────────────────────
    const node = root.append('g').attr('class', 'nodes')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes).join('g')
      .attr('class', 'graph-node')
      .style('cursor', 'pointer')
      .call(this.drag() as d3.DragBehavior<SVGGElement, GraphNode, unknown>)
      .on('click', (_event, d) => {
        this.zone.run(() => this.nodeSelected.emit(d));
        d3.selectAll('.graph-node circle:nth-child(2)').attr('stroke-width', 1.5);
        d3.select(_event.currentTarget as SVGGElement)
          .select('circle:nth-child(2)').attr('stroke-width', 3.5);
      });

    const getFill   = (d: GraphNode) => d.type === 'ip' && this.mitigated ? MITIGATED_IP_STYLE.fill   : (NODE_STYLES[d.type]?.fill   ?? '#111');
    const getStroke = (d: GraphNode) => d.type === 'ip' && this.mitigated ? MITIGATED_IP_STYLE.stroke : (NODE_STYLES[d.type]?.stroke ?? '#334');
    const getIcon   = (d: GraphNode) => d.type === 'ip' && this.mitigated ? '🔒' : (NODE_STYLES[d.type]?.icon ?? '?');

    // Outer glow ring
    node.append('circle')
      .attr('r',              (d) => (NODE_STYLES[d.type]?.r ?? 18) + 10)
      .attr('fill',           'none')
      .attr('stroke',         getStroke)
      .attr('stroke-width',   1)
      .attr('stroke-opacity', 0.2);

    // Main fill circle
    node.append('circle')
      .attr('r',            (d) => NODE_STYLES[d.type]?.r ?? 18)
      .attr('fill',         getFill)
      .attr('stroke',       getStroke)
      .attr('stroke-width', 1.5)
      .attr('filter',       (d) => d.type === 'ip' ? 'url(#ip-glow)' : null);

    // Icon
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', (d) => d.type === 'ip' ? 18 : 13)
      .attr('pointer-events', 'none')
      .text(getIcon);

    // Label below node
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => (NODE_STYLES[d.type]?.r ?? 18) + 16)
      .attr('font-size', (d) => d.type === 'ip' ? 13 : 10)
      .attr('font-family', 'var(--font-mono)')
      .attr('font-weight', (d) => d.type === 'ip' ? '700' : '400')
      .attr('fill', getStroke)
      .attr('pointer-events', 'none')
      .text((d) => d.label.length > 20 ? d.label.slice(0, 18) + '…' : d.label);

    // ── Tooltip ──────────────────────────────────────────────────────
    const tooltip = d3.select('body').select<HTMLDivElement>('.d3-tooltip');
    node
      .on('mouseenter', (_e, d) => {
        const details = Object.entries(d.data || {})
          .filter(([, v]) => v !== null && v !== undefined && v !== '')
          .slice(0, 5)
          .map(([k, v]) => `<div style="color:#7ba7cc;font-size:10px">${k}: <span style="color:#e2f0ff">${v}</span></div>`)
          .join('');
        tooltip.style('display', 'block')
          .html(`<div style="font-weight:700;color:var(--accent-cyan);margin-bottom:4px">${d.type.toUpperCase()}</div><div style="color:#e2f0ff;margin-bottom:4px">${d.label}</div>${details}`);
      })
      .on('mousemove', (event) => tooltip
        .style('left', (event.pageX + 16) + 'px')
        .style('top',  (event.pageY - 32) + 'px'))
      .on('mouseleave', () => tooltip.style('display', 'none'));

    // ── Simulation tick ───────────────────────────────────────────────
    this.sim.on('tick', () => {
      link
        .attr('x1', (e) => (e.source as GraphNode).x!)
        .attr('y1', (e) => (e.source as GraphNode).y!)
        .attr('x2', (e) => (e.target as GraphNode).x!)
        .attr('y2', (e) => (e.target as GraphNode).y!);
      edgeLabel
        .attr('x', (e) => ((e.source as GraphNode).x! + (e.target as GraphNode).x!) / 2)
        .attr('y', (e) => ((e.source as GraphNode).y! + (e.target as GraphNode).y!) / 2 - 5);
      node.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    if (this.mitigated) {
      setTimeout(() => this.applyMitigatedStyle(), 800);
    }
  }

  private drag() {
    return d3.drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) this.sim.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag',  (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end',   (event, d) => {
        if (!event.active) this.sim.alphaTarget(0);
        d.fx = null; d.fy = null;
      });
  }

  ngOnDestroy(): void {
    if (this.sim) this.sim.stop();
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }
}
