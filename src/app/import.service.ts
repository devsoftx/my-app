import { Injectable } from '@angular/core';
import { ResponseData } from '../app/ResponseData'
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from  'rxjs/operators';
import { TransactionLine } from './transactionLine';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { environment } from '../environments/environment';
import { AuthService } from '../app/auth.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  headers : HttpHeaders = new HttpHeaders();
  token : string;
  importUrl : string;
  responseData : ResponseData;
  lines : TransactionLine[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private session: SessionStorageService) { 
      this.importUrl = environment.serverUrl;
    }

    public upload(data) {
      
      this.headers.append('Authorization', 'Bearer ' + this.authService.getToken());

      let uploadURL = this.importUrl + 'api/files/upload';
      return this.http.post<any>(uploadURL, data, {
        headers : this.headers,
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
  
        switch (event.type) {
  
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
  
          case HttpEventType.Response:
            this.responseData = event.body;
            this.session.set('KEY', this.responseData.lines);
            return event.body;
          default:
            return 'Unhandled event: ${event.type}';
        }
      })
      );
    }
}
