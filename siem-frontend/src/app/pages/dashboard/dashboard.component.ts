import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule }          from '@angular/common';
import { Subscription }          from 'rxjs';

import { SocketService }            from '../../services/socket.service';
import { LiveMapComponent }         from '../../shared/live-map/live-map.component';
import { TriageQueueComponent }     from '../../shared/triage-queue/triage-queue.component';
import { WorkbenchDrawerComponent } from '../../shared/workbench-drawer/workbench-drawer.component';
import { ThreatEvent }              from '../../models/threat-event.model';

@Component({
  selector:        'app-dashboard',
  standalone:      true,
  imports:         [
    CommonModule,
    LiveMapComponent,
    TriageQueueComponent,
    WorkbenchDrawerComponent,
  ],
  templateUrl:     './dashboard.component.html',
  styleUrls:       ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {

  isConnected = false;
  clock       = '';

  /**
   * The source_ip of the threat row the analyst clicked.
   * null  → drawer is closed.
   * non-null → drawer is open and WorkbenchDrawer fetches OSINT for this IP.
   */
  workbenchIp: string | null = null;

  /**
   * The full ThreatEvent the analyst clicked — passed into the drawer
   * so it can display attack path, metadata, and context.
   */
  workbenchEvent: ThreatEvent | null = null;

  /**
   * IP currently focused on the live map (arcs dimmed for all others,
   * sparkline shown). Set when any row is clicked; cleared when drawer closes.
   */
  selectedIp: string | null = null;

  private sub        = new Subscription();
  private clockTimer!: ReturnType<typeof setInterval>;

  constructor(
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.socketService.connected$.subscribe((state) => {
        this.isConnected = state;
        this.cdr.markForCheck();
      })
    );

    this.updateClock();
    this.clockTimer = setInterval(() => {
      this.updateClock();
      this.cdr.markForCheck();
    }, 1000);
  }

  private updateClock(): void {
    this.clock = new Date().toLocaleTimeString('en-GB', {
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
    }) + ' UTC';
  }

  /** Called when analyst clicks a row in TriageQueueComponent. */
  openWorkbench(evt: ThreatEvent): void {
    this.workbenchIp    = evt.source_ip;
    this.workbenchEvent = evt;
    this.selectedIp     = evt.source_ip;   // ← focus map on this IP
    this.cdr.markForCheck();
  }

  /** Called when the drawer emits (drawerClosed). */
  closeWorkbench(): void {
    this.workbenchIp    = null;
    this.workbenchEvent = null;
    this.selectedIp     = null;            // ← restore all arcs
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearInterval(this.clockTimer);
  }
}
