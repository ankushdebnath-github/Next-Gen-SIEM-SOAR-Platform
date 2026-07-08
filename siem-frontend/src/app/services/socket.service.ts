import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject }   from 'rxjs';
import { io, Socket }            from 'socket.io-client';
import {
  ThreatEvent, ThreatHistoryPayload, OsintResult, ThreatMitigatedEvent,
} from '../models/threat-event.model';

/**
 * SocketService
 * ─────────────
 * Wraps the Socket.io client in RxJS Subjects so every subscriber shares the
 * same underlying socket listener — no duplicate listeners, no new Observable
 * allocation per subscription.
 *
 * Usage:
 *   socketService.liveThreat$      → Observable<ThreatEvent>
 *   socketService.history$         → Observable<ThreatHistoryPayload>
 *   socketService.osintResult$     → Observable<OsintResult>
 *   socketService.threatMitigated$ → Observable<ThreatMitigatedEvent>
 *   socketService.connected$       → Observable<boolean>
 *
 * Legacy wrapper methods (onLiveThreat, onHistory, etc.) are kept for
 * backwards compatibility with existing components.
 */
@Injectable({ providedIn: 'root' })
export class SocketService implements OnDestroy {

  private socket!: Socket;

  // ── Shared hot Subjects — one listener per event type ─────────────────
  readonly connected$       = new Subject<boolean>();
  readonly liveThreat$      = new Subject<ThreatEvent>();
  readonly history$         = new Subject<ThreatHistoryPayload>();
  readonly osintResult$     = new Subject<OsintResult>();
  readonly threatMitigated$ = new Subject<ThreatMitigatedEvent>();

  constructor() {
    this.connect();
  }

  // ── Connection ─────────────────────────────────────────────────────────

  private connect(): void {
    this.socket = io('/', {
      transports:           ['websocket', 'polling'],
      reconnection:         true,
      reconnectionDelay:    2000,
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

    // Register exactly ONE listener per event type — all subscribers share it
    this.socket.on('live-threat',      (d: ThreatEvent)             => this.liveThreat$.next(d));
    this.socket.on('history',          (d: ThreatHistoryPayload)     => this.history$.next(d));
    this.socket.on('osint-result',     (d: OsintResult)              => this.osintResult$.next(d));
    this.socket.on('threat-mitigated', (d: ThreatMitigatedEvent)     => this.threatMitigated$.next(d));
  }

  // ── Event streams (backwards-compatible wrappers) ──────────────────────

  /** Stream of live attack events broadcast by the backend worker. */
  onLiveThreat(): Observable<ThreatEvent> {
    return this.liveThreat$.asObservable();
  }

  /** Last N events sent immediately after connecting. */
  onHistory(): Observable<ThreatHistoryPayload> {
    return this.history$.asObservable();
  }

  /** OSINT enrichment results. */
  onOsintResult(): Observable<OsintResult> {
    return this.osintResult$.asObservable();
  }

  /** Broadcast when a SOAR playbook mitigates one or more threats. */
  onThreatMitigated(): Observable<ThreatMitigatedEvent> {
    return this.threatMitigated$.asObservable();
  }

  // ── Outbound events ────────────────────────────────────────────────────

  filterThreats(criteria: { severity?: string; attack_type?: string }): void {
    this.socket.emit('filter-threats', criteria);
  }

  acknowledgeThreat(threatId: string): void {
    this.socket.emit('acknowledge-threat', { threatId });
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────

  ngOnDestroy(): void {
    this.socket.disconnect();
    this.connected$.complete();
    this.liveThreat$.complete();
    this.history$.complete();
    this.osintResult$.complete();
    this.threatMitigated$.complete();
  }
}
