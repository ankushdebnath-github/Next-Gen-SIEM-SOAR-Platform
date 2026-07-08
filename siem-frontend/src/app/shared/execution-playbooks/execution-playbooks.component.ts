import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { CommonModule }     from '@angular/common';
import { Subscription }     from 'rxjs';
import { PlaybookService }  from '../../services/playbook.service';

export interface PlaybookExecutedEvent {
  playbook:  string;
  ip:        string;
  count:     number;
  timestamp: string;
}

/**
 * ExecutionPlaybooksComponent
 * ───────────────────────────
 * The SOAR action panel rendered inside the WorkbenchDrawer.
 * Presents available playbooks for the analyst to trigger, shows real-time
 * execution feedback, and emits when a playbook completes so the parent
 * can update its local state (graph recolor, drawer badge, etc.).
 */
@Component({
  selector:        'app-execution-playbooks',
  standalone:      true,
  imports:         [CommonModule],
  templateUrl:     './execution-playbooks.component.html',
  styleUrls:       ['./execution-playbooks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionPlaybooksComponent implements OnInit, OnDestroy {

  /** The IP currently under investigation — passed in from WorkbenchDrawer. */
  @Input() ip!: string;

  /** Emitted after a playbook executes successfully. */
  @Output() playbookExecuted = new EventEmitter<PlaybookExecutedEvent>();

  readonly blocking$ = this.playbookService.blocking$;
  readonly error$    = this.playbookService.blockError$;

  /** Execution log rows shown in the audit trail section. */
  log: Array<{ time: string; message: string; type: 'success' | 'error' | 'info' }> = [];

  /** True after Block IP succeeds — locks the button and shows mitigated state. */
  isMitigated = false;

  private sub = new Subscription();

  constructor(
    private playbookService: PlaybookService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Listen for real-time mitigated events (could come from another tab)
    this.sub.add(
      this.playbookService.mitigated$.subscribe((evt) => {
        if (evt.ip === this.ip) {
          this.isMitigated = true;
          this.addLog(
            `✔ Block-IP playbook confirmed via Socket.io — ${evt.mitigated_count} event(s) mitigated`,
            'success'
          );
          this.cdr.markForCheck();
        }
      })
    );
  }

  // ── Playbook execution ─────────────────────────────────────────────────

  executeBlockIp(): void {
    if (!this.ip || this.isMitigated) return;

    this.addLog(`▶ Initiating Block-IP playbook for ${this.ip}…`, 'info');

    this.sub.add(
      this.playbookService.blockIp(this.ip).subscribe({
        next: (res) => {
          this.isMitigated = true;
          this.addLog(
            `✔ IP ${res.ip} blocked — ${res.mitigated_count} threat event(s) mitigated`,
            'success'
          );
          this.playbookExecuted.emit({
            playbook:  res.playbook,
            ip:        res.ip,
            count:     res.mitigated_count,
            timestamp: res.executed_at,
          });
          this.cdr.markForCheck();
        },
        error: (err: Error) => {
          this.addLog(`✖ Playbook failed: ${err.message}`, 'error');
          this.cdr.markForCheck();
        },
      })
    );
  }

  // ── Helpers ────────────────────────────────────────────────────────────

  private addLog(message: string, type: 'success' | 'error' | 'info'): void {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    // Prepend newest at top; cap at 20 lines
    this.log = [{ time, message, type }, ...this.log].slice(0, 20);
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
