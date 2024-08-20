import { Injectable } from '@angular/core';
import { ContactModel } from '../models/contactModel';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { randFullName, randEmail, randPhoneNumber } from '@ngneat/falso';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  /* contact1 : ContactModel = {
    id : 1 ,
    name : 'name1' ,
    email : 'email1@gmail.com',
    phone : '76601510'
  }

  contact2 : ContactModel = {
    id : 2 ,
    name : 'name2' ,
    email : 'email2@gmail.com',
    phone : '76601510'
  }

  contact3 : ContactModel = {
    id : 3 ,
    name : 'name3' ,
    email : 'email3@gmail.com',
    phone : '76601510'
  }

  contacts : ContactModel[] = [this.contact1 , this.contact2 , this.contact3] ;
  private contactsSubject = new BehaviorSubject<ContactModel[]>(this.contacts);

  constructor(private firestore: AngularFirestore) { }

  getContacts() {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: ContactModel) {
    contact.id = this.contacts.length + 1;
    this.contacts.push(contact);
    this.contactsSubject.next(this.contacts);
  }

  updateContact(contact: ContactModel) {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
      this.contactsSubject.next(this.contacts);
    }
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.contactsSubject.next(this.contacts);
  }

  searchContact(name: string): Observable<ContactModel[]> {
    return this.contactsSubject.asObservable().pipe(
      map(contacts => contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase())))
    );
  } */

  private contactsCollection: AngularFirestoreCollection<ContactModel>;

  constructor(private firestore: AngularFirestore) {
    this.contactsCollection = this.firestore.collection<ContactModel>('contacts');
  }

  generateRandomContact(){

    for(let i = 0 ; i < 5 ; i++ ){
      let contactTemp : ContactModel = {
        id : this.firestore.createId(),
        name : randFullName(),
        email : randEmail(),
        phone : randPhoneNumber()
      };
      const id = this.firestore.createId();
      contactTemp.id = id;
      this.contactsCollection.doc(id).set(contactTemp);
    }


  }

  getContacts(): Observable<ContactModel[]> {
    return this.contactsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ContactModel;
        const ID = a.payload.doc.id;
        return { ID, ...data };
      }))
    );
  }

  addContact(contact: ContactModel): void {
    const id = this.firestore.createId();
    contact.id = id;
    this.contactsCollection.doc(id).set(contact);
  }

  updateContact(contact: ContactModel): void {
    if (contact.id) {
      this.contactsCollection.doc(contact.id).update(contact);
    }
  }

  deleteContact(id: string): void {
    this.contactsCollection.doc(id).delete();
  }

  searchContact(name: string): Observable<ContactModel[]> {
    return this.getContacts().pipe(
      map(contacts => contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase())))
    );
  }
}
