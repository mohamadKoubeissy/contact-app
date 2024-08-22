import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ContactService } from '../services/contactService.service';
import { ContactModel } from '../../models/contactModel';

import { contactDialogComponent } from './contactDialog/contactDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/authentication/services/authService.service';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class contactComponent implements OnInit {

  contacts : ContactModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone' , 'action'];
  dataSource = new MatTableDataSource<ContactModel>();
  searchValue = '';

  viewContactDetails !: ContactModel ;

  showContactDetails !: boolean ;

  currentUser$ !: Observable<User | null>;

  constructor(private contactService : ContactService , public dialog: MatDialog , private authService : AuthService, private router : Router) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(data => {
      this.dataSource.data = data;
    });

    this.currentUser$ = this.authService.getCurrentUser();
  }

  openDialog(isEdit: boolean, contact?: ContactModel) {

    const dialogRef = this.dialog.open(contactDialogComponent, {
      width: '30%',
      data: { isEdit, contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Opening dialog', result);
      if (result && typeof result === 'object') { // Check if result is an object
        if (isEdit) {
          this.contactService.updateContact(result);
        } else {
          result.id = this.contacts.length + 1;
          this.contactService.addContact(result);
        }
      }
    });
  }

  deleteContact(contact: ContactModel) {
    this.contactService.deleteContact(contact.id);
  }

  searchContacts(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const name = inputElement.value;
    this.contactService.searchContact(name).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  viewDetails(contact: ContactModel){
    this.showContactDetails = true ;
    this.viewContactDetails = contact;
  }

  hideDetails(){
    this.showContactDetails = false ;
  }

  generateContacts(){
    this.contactService.generateRandomContact();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['authentication/login']);
  }


}
