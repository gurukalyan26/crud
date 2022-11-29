import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


import { IContact } from '../model/icontact';
import { IGroup } from '../model/igroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
IContact:any='';
  private static serverUrl: string = `http://localhost:9000`;

  constructor(private httpclient:HttpClient) { }

public getAllContacts():Observable<IContact[]>{
  let dataURL: string = `${ContactService.serverUrl}/contacts`;
return this.httpclient.get <IContact[]>(dataURL).pipe(catchError(this.handleError));
}

  public getContact(contactId:string): Observable<IContact> {
    let dataURL: string = `${ContactService.serverUrl}/contacts/${contactId}`;
    return this.httpclient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  public CreateContact(contact:IContact): Observable<IContact> {
    let dataURL: string = `${ContactService.serverUrl}/contacts`;
    return this.httpclient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));
  }


  public updateContact(contact: IContact , contactId:string): Observable<IContact> {
    let dataURL: string = `${ContactService.serverUrl}/contacts/${contactId}`;
    return this.httpclient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }


  public DeleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${ContactService.serverUrl}/contacts/${contactId}`;
    return this.httpclient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${ContactService.serverUrl}/groups`;
    return this.httpclient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }

  public getGroup(contact: IContact): Observable<IGroup> {
    let dataURL: string = `${ContactService.serverUrl}/groups/${contact.groupId}`;
    return this.httpclient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
   
      console.error('An error occurred:', error.error);
    } else {
    
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
  
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
