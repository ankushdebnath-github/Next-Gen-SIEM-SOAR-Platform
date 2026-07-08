import { Injectable }                       from '@angular/core';
import { HttpClient, HttpErrorResponse }    from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap }                  from 'rxjs/operators';
import { OsintResponse }                    from '../models/osint.model';

/**
 * OsintService
 * ────────────
 * Calls GET /api/v1/osint/:ip and exposes the result as BehaviorSubjects
 * so the WorkbenchDrawer can bind directly with the async pipe.
 */
@Injectable({ providedIn: 'root' })
export class OsintService {

  private readonly BASE = '/api/v1/osint';

  readonly data$    = new BehaviorSubject<OsintResponse | null>(null);
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$   = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  fetchForIp(ip: string): Observable<OsintResponse> {
    this.loading$.next(true);
    this.error$.next(null);

    return this.http.get<OsintResponse>(`${this.BASE}/${encodeURIComponent(ip)}`).pipe(
      tap((res) => {
        this.data$.next(res);
        this.loading$.next(false);
      }),
      catchError((err: HttpErrorResponse) => {
        const msg = err.error?.message ?? err.message ?? 'Failed to load OSINT data';
        this.error$.next(msg);
        this.loading$.next(false);
        return throwError(() => new Error(msg));
      })
    );
  }

  clear(): void {
    this.data$.next(null);
    this.error$.next(null);
  }
}
