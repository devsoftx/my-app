import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MsalGuard} from "@azure/msal-angular";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
