import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contactDialog',
  templateUrl: './contactDialog.component.html',
  styleUrls: ['./contactDialog.component.css']
})
export class contactDialogComponent implements OnInit {

  contactForm !: FormGroup ;
  constructor(private fb: FormBuilder ,private dialogRef: MatDialogRef<contactDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.contactForm = this.fb.group({
      id: [data.contact ? data.contact.id : null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
   }

  ngOnInit() {
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  save() {
    if (this.contactForm.valid) {
      this.dialogRef.close(this.contactForm.value); // Ensure the form value is returned
    }
  }

  close() {
    this.dialogRef.close(false); // Return false if dialog is closed without saving
  }

}
