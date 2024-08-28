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
import { TranslocoService } from '@ngneat/transloco';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Assign the fonts to pdfMake
(pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

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

  constructor(private contactService : ContactService , public dialog: MatDialog , private authService : AuthService, private router : Router,private translocoService: TranslocoService) {}

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

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  exportPdf() {
    const documentDefinition = {
      content: [
        { text: 'Contact List', style: 'header' },
        this.buildTable(this.dataSource.data, this.displayedColumns),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
        },
        tableCell: {
          margin: [0, 5, 0, 5],
        },
      },
    };
    (pdfMake as any).createPdf(documentDefinition).download('ContactList.pdf');
  }

  buildTable(data: any[], columns: string[]) {
    const body = [];

    // Create the table header
    body.push(columns.map(column => ({
      text: this.translateColumnName(column),
      style: 'tableHeader',
      alignment: 'center'
    })));

    // Add rows to the table
    data.forEach(row => {
      const dataRow = columns.map(column => row[column] || '');
      body.push(dataRow);
    });

    return {
      table: {
        headerRows: 1,
        body: body,
      },
      layout: 'lightHorizontalLines', // Optional: add styling to the table
    };
  }

  translateColumnName(column: string) {
    // Implement translation or mapping for column headers if needed
    switch (column) {
      case 'id': return 'ID';
      case 'name': return 'Name';
      case 'email': return 'Email';
      case 'phone': return 'Phone';
      case 'action': return 'Action';
      default: return column;
    }
  }
}
