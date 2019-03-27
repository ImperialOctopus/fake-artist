import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { PlayComponent } from "./play/play.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: "", component: MenuComponent },
  { path: "play/:n", component: PlayComponent },
  { path: "**", component: MenuComponent }
];

@NgModule({
  declarations: [AppComponent, MenuComponent, PlayComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
