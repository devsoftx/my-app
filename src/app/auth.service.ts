import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpEvent, HttpHandler, HttpErrorResponse, HttpEventType, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Token } from '../app/Token'
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { CacheResult } from 'msal/lib-commonjs/UserAgentApplication';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{
  
  cache: CacheResult;
  token: string;
  url : string;
  constructor(private http: HttpClient, private auth: MsalService) { 
    this.url = environment.authServerUrl;
    this.token  = localStorage.getItem('msal.idtoken');
  }

  public getToken() : any
  {
    return this.cache.token;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }

        return next.handle(request);
  }


}
