import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlayComponent } from './play/play.component';

const appRoutes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'play/:n',      component: PlayComponent },
  { path: '**', component: MenuComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
