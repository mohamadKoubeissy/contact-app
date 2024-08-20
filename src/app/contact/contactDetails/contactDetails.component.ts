import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactModel } from 'src/app/models/contactModel';

@Component({
  selector: 'app-contactDetails',
  templateUrl: './contactDetails.component.html',
  styleUrls: ['./contactDetails.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input()
  contact !: ContactModel;

  @Output() hideContactDetails = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }

  close() {
    this.hideContactDetails.emit();
  }

}
