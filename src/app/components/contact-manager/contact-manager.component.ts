import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/model/icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
public loading:boolean=false;
public contacts:IContact[]=[];
public errorMessage:string|null=null;


  constructor(private contactservices : ContactService) { }

  ngOnInit(): void {
    this.getAllContactsfromtheServer();
  }

   public getAllContactsfromtheServer(){
    this.loading = true;
    this.contactservices.getAllContacts().subscribe((data: IContact[]) => {
    this.contacts = data;
    this.loading = false;
  
  }, (error) => {
    this.errorMessage = error;
    this.loading = false;
  });
}
  public ClickDeleteContact(contactId: string | undefined){
    if(contactId){
      this.contactservices.DeleteContact(contactId).subscribe((data:{})=>{
       this.getAllContactsfromtheServer();
      },(error)=>{
        this.errorMessage = error;
      });
    }
  }
}


