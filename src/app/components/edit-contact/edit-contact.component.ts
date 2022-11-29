import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/model/icontact';
import { IGroup } from 'src/app/model/igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
public loading:boolean =false;
public contact:IContact = {} as IContact;
public errorMessage:string |null = null;
public groups:IGroup[] = [] as IGroup[];
public contactId:string | null=null;

  constructor(private activatedRoute:ActivatedRoute, private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.contactId='';
    this.activatedRoute.paramMap.subscribe((param:ParamMap) =>{
      this.contactId=param.get('contactId')
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe((data:IContact) =>{
        this.contact=data;
        this.loading=false;
        this.contactService.getAllGroups().subscribe((data:IGroup[])=>{
          this.groups = data;
        })
        
      },(error)=>{
        this.errorMessage=error;
        this.loading=false;
      });
    }
  }
  public submitUpdate(){
    if(this.contactId){
      this.contactService.updateContact(this.contact,this.contactId).subscribe((data: IContact) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/$(this.contactId)`]).then();
      });
    }
  }
}
