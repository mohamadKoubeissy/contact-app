import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Environment } from 'src/Environment/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { ContactModule } from './contact/contact.module';
import { TranslocoRootModule } from './transloco-root/transloco-root.module';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ContactModule,
    TranslocoModule,
    TranslocoRootModule,
    AngularFireModule.initializeApp(Environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
