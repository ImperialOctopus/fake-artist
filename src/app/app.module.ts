import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlayComponent } from './play/play.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const appRoutes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'play', component: PlayComponent },
  { path: '**', component: MenuComponent }
];

@NgModule({
  declarations: [AppComponent, MenuComponent, PlayComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ServiceWorkerModule.register('ngsw-worker.js',
    { enabled: environment.production }), BrowserAnimationsModule, FormsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule.enablePersistence(),
    MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
