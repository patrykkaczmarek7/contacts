import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { ContactModel } from './contacts-dashboard.model';

@Component({
  selector: 'app-contacts-dashboard',
  templateUrl: './contacts-dashboard.component.html',
  styleUrls: ['./contacts-dashboard.component.scss']
})
export class ContactsDashboardComponent implements OnInit {

  formValue!: FormGroup;
  contactModelObj: ContactModel = new ContactModel();
  contactsData!: any;
  showAdd2!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nick: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      telefon:  [''],
      gender: ['']
    })
    this.getAllContacts();
  }

  clickAddContact() {
    this.formValue.reset();
    this.showAdd2 = true;
    this.showUpdate = false;
  }

  postContactDetails() {
    this.contactModelObj.nick = this.formValue.value.nick;
    this.contactModelObj.firstName = this.formValue.value.firstName;
    this.contactModelObj.lastName = this.formValue.value.lastName;
    this.contactModelObj.email = this.formValue.value.email;
    this.contactModelObj.telefon = this.formValue.value.telefon;
    this.contactModelObj.gender = this.formValue.value.gender;


    this.api.postContact(this.contactModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Kontakt dodany");
      //Okno zamyka się po dodaniu kontaktu
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllContacts();
    },
    err => {
      alert('Coś poszło nie tak');
    })
  }

  getAllContacts() {
    this.api.getContact()
    .subscribe((res => {
      this.contactsData = res;
    }))
  }

  deleteContact(row: any) {
    this.api.deleteContact(row.id)
    .subscribe(res => {
      alert("Kontakt usunięty");
      this.getAllContacts();
    })
  }

  onEdit(row: any) {
    this.showAdd2 = false;
    this.showUpdate = true;
    this.contactModelObj.id = row.id;
    this.formValue.controls['nick'].setValue(row.nick);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['telefon'].setValue(row.telefon);
    this.formValue.controls['gender'].setValue(row.gender);
    this.showAdd2 = false;
    this.showUpdate = true;
  }

  updateContactDetails() {
    this.contactModelObj.nick = this.formValue.value.nick;
    this.contactModelObj.firstName = this.formValue.value.firstName;
    this.contactModelObj.lastName = this.formValue.value.lastName;
    this.contactModelObj.email = this.formValue.value.email;
    this.contactModelObj.telefon = this.formValue.value.telefon;
    this.contactModelObj.gender = this.formValue.value.gender;
    // Robi update w API. Nadpisuje dane
    this.api.updateContact(this.contactModelObj, this.contactModelObj.id)
    .subscribe((res => {
      alert("Zaktualizowano kontakt");
      //Okno zamyka się po dodaniu kontaktu
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllContacts();
    }))

  }
}
