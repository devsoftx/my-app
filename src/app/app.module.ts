import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule }    from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyRowComponent } from './my-row/my-row.component';
import { UploaderComponent } from './uploader/uploader.component';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

import { AuthService } from '../app/auth.service';
import { MsalModule } from "@azure/msal-angular";
import { MsalInterceptor } from "@azure/msal-angular";
import { LogLevel } from 'msal';

export function loggerCallback(logLevel, message, piiEnabled) {
    console.log("client logging" + message);
}
export const protectedResourceMap: [string, string[]][] = [
    ['https://graph.microsoft.com/v1.0/me', ['user.read', environment.consent_uri]],
    // ... other scopes
    
];

//3er
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AppComponent,
    MyRowComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularWebStorageModule,
    Ng2SmartTableModule,
    CommonModule,
    MsalModule.forRoot({
      clientID: environment.client_id,
      authority: environment.authServerUrl,
      validateAuthority: true,
      redirectUri: "http://localhost:4200/",
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: "http://localhost:4200/",
      navigateToLoginRequestUrl: false,
      popUp: false,
      consentScopes: ["user.read", environment.consent_uri],
      unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: "1234",
      level: LogLevel.Info,
      piiLoggingEnabled: true,
  })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
