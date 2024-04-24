import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleChartsConfigService {private configSubject = new ReplaySubject<any>(1);
  readonly config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadLazyConfigValues(): void {
    this.http.post('https://special.config.api.com/getchartsconfig', {})
      .pipe(take(1))
      .subscribe(config => this.configSubject.next(config));
  }
}

// Factory function that provides the config$ observable from your GoogleChartsConfigService
export function googleChartsConfigFactory(configService: GoogleChartsConfigService): Observable<any> {
  return configService.config$;
}