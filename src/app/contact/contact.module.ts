import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contactComponent } from './components/contact.component';
import { contactDialogComponent } from './components/contactDialog/contactDialog.component';
import { ContactDetailsComponent } from './components/contactDetails/contactDetails.component';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { ContactRoutingModule } from './contact-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoRootModule } from '../transloco-root/transloco-root.module';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    TranslocoModule,
    TranslocoRootModule,
  ],
  declarations: [contactComponent , contactDialogComponent , ContactDetailsComponent]
})
export class ContactModule { }
