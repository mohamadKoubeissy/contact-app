import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { contactComponent } from './contact/contact.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { contactDialogComponent } from './contact/contactDialog/contactDialog.component';
import { ContactDetailsComponent } from './contact/contactDetails/contactDetails.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Environment } from '../Environment/environment'; // Adjust the path if needed

@NgModule({
  declarations: [
    AppComponent,
    contactComponent,
    contactDialogComponent,
    ContactDetailsComponent,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    AngularFireModule.initializeApp(Environment.firebaseConfig),
    AngularFirestoreModule, // Firestore module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
