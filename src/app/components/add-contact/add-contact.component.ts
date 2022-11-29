import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/model/icontact';
import { IGroup } from 'src/app/model/igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];
  constructor(private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {

    this.contactService.getAllGroups().subscribe((dta:IGroup[]) =>{
      this.groups = dta;
    },(error) =>{
      this.errorMessage = error;
    });
  }
  public CreateSubmit(){
    this.contactService.CreateContact(this.contact).subscribe((data:IContact) =>{
      this.router.navigate (['/']).then();
    },(error) =>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    });
  }
}
