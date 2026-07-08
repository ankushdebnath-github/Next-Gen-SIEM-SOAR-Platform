import { Injectable }                       from '@angular/core';
import { HttpClient, HttpErrorResponse }    from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap }                  from 'rxjs/operators';
import { SocketService }                    from './socket.service';
import { ThreatMitigatedEvent }             from '../models/threat-event.model';

export interface BlockIpRequest {
  ip:               string;
  threat_event_id?: string;
}

export interface BlockIpResponse {
  success:         boolean;
  ip:              string;
  playbook:        string;
  mitigated_count: number;
  mitigated_ids:   string[];
  executed_at:     string;
}

/**
 * PlaybookService
 * ───────────────
 * Encapsulates all SOAR playbook operations.
 *
 * Currently supported playbooks:
 *   • Block IP — POST /api/v1/playbooks/block
 *
 * Also exposes the real-time 'threat-mitigated' Socket.io stream so any
 * component that needs to react (TriageQueue, OsintGraph) can subscribe
 * from the same singleton stream without opening duplicate socket listeners.
 */
@Injectable({ providedIn: 'root' })
export class PlaybookService {

  private readonly BASE = '/api/v1/playbooks';

  /** True while the block-IP request is in-flight. */
  readonly blocking$ = new BehaviorSubject<boolean>(false);

  /** Last error message from a failed playbook execution. */
  readonly blockError$ = new BehaviorSubject<string | null>(null);

  /** Real-time stream of 'threat-mitigated' Socket.io events. */
  readonly mitigated$ = this.socketService.onThreatMitigated();

  constructor(
    private http:          HttpClient,
    private socketService: SocketService,
  ) {}

  /**
   * Executes the Block-IP playbook.
   * Sends POST /api/v1/playbooks/block with the attacker IP.
   * The backend will update MongoDB and broadcast 'threat-mitigated' via
   * Socket.io — that event will flow through mitigated$ automatically.
   */
  blockIp(ip: string, threat_event_id?: string): Observable<BlockIpResponse> {
    this.blocking$.next(true);
    this.blockError$.next(null);

    const body: BlockIpRequest = { ip, ...(threat_event_id ? { threat_event_id } : {}) };

    return this.http.post<BlockIpResponse>(`${this.BASE}/block`, body).pipe(
      tap(() => this.blocking$.next(false)),
      catchError((err: HttpErrorResponse) => {
        const msg = err.error?.error ?? err.message ?? 'Playbook execution failed';
        this.blockError$.next(msg);
        this.blocking$.next(false);
        return throwError(() => new Error(msg));
      })
    );
  }
}
