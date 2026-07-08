import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, share } from 'rxjs';
import { io, Socket }         from 'socket.io-client';
import {
  ThreatEvent, ThreatHistoryPayload, OsintResult, ThreatMitigatedEvent,
} from '../models/threat-event.model';

/**
 * SocketService
 * ─────────────
 * Wraps the Socket.io client in RxJS Observables so Angular components can
 * subscribe declaratively without managing raw event listeners.
 *
 * Usage:
 *   socketService.onLiveThreat()  → Observable<ThreatEvent>
 *   socketService.onHistory()     → Observable<ThreatHistoryPayload>
 *   socketService.onOsintResult() → Observable<OsintResult>
 *   socketService.connected$      → Observable<boolean>
 */
@Injectable({ providedIn: 'root' })
export class SocketService implements OnDestroy {

  private socket!: Socket;

  /** Emits true when the socket connects, false when it disconnects. */
  readonly connected$ = new Subject<boolean>();

  constructor() {
    this.connect();
  }

  // ── Connection ─────────────────────────────────────────────────────────

  private connect(): void {
    this.socket = io('/', {          // hits the proxy → localhost:5000
      transports:       ['websocket', 'polling'],
      reconnection:     true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 10,
    });

    this.socket.on('connect', () => {
      console.log('[SocketService] Connected  → id:', this.socket.id);
      this.connected$.next(true);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('[SocketService] Disconnected:', reason);
      this.connected$.next(false);
    });

    this.socket.on('connect_error', (err) => {
      console.error('[SocketService] Connection error:', err.message);
    });
  }

  // ── Event streams ──────────────────────────────────────────────────────

  /**
   * Stream of live attack events broadcast by the backend worker every 800 ms.
   * Multicasted with share() so multiple component subscriptions don't open
   * duplicate listeners on the underlying socket.
   */
  onLiveThreat(): Observable<ThreatEvent> {
    return new Observable<ThreatEvent>((observer) => {
      const handler = (data: ThreatEvent) => observer.next(data);
      this.socket.on('live-threat', handler);
      return () => this.socket.off('live-threat', handler);
    }).pipe(share());
  }

  /**
   * Last 50 events sent by the server immediately after connecting.
   * Completes after the first emission.
   */
  onHistory(): Observable<ThreatHistoryPayload> {
    return new Observable<ThreatHistoryPayload>((observer) => {
      const handler = (data: ThreatHistoryPayload) => {
        observer.next(data);
        observer.complete();
      };
      this.socket.on('history', handler);
      return () => this.socket.off('history', handler);
    });
  }

  /**
   * OSINT enrichment results emitted when the backend finishes enriching a
   * High or Critical severity IP address.
   */
  onOsintResult(): Observable<OsintResult> {
    return new Observable<OsintResult>((observer) => {
      const handler = (data: OsintResult) => observer.next(data);
      this.socket.on('osint-result', handler);
      return () => this.socket.off('osint-result', handler);
    }).pipe(share());
  }

  // ── Outbound events ────────────────────────────────────────────────────

  /** Ask the server for a filtered event set. */
  filterThreats(criteria: { severity?: string; attack_type?: string }): void {
    this.socket.emit('filter-threats', criteria);
  }

  /** Mark a threat as acknowledged by an analyst. */
  acknowledgeThreat(threatId: string): void {
    this.socket.emit('acknowledge-threat', { threatId });
  }

  /**
   * Stream of 'threat-mitigated' events broadcast by the SOAR Block-IP playbook.
   * Payload: { ip, mitigated_ids[], mitigated_count, playbook, executed_at }
   */
  onThreatMitigated(): Observable<ThreatMitigatedEvent> {
    return new Observable<ThreatMitigatedEvent>((observer) => {
      const handler = (data: ThreatMitigatedEvent) => observer.next(data);
      this.socket.on('threat-mitigated', handler);
      return () => this.socket.off('threat-mitigated', handler);
    }).pipe(share());
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────

  ngOnDestroy(): void {
    this.socket.disconnect();
    this.connected$.complete();
  }
}
