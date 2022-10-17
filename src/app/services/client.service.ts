import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection ,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Client } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsColl: AngularFirestoreCollection<Client> ;
  clientsDoc! : AngularFirestoreDocument <Client>;

  constructor( private afs : AngularFirestore) {
    this.clientsColl = this.afs.collection('clients');
   }

   getClients(uid : string) : Observable<Client[]>{
    return this.afs.collection('clients', ref =>ref.where('user' , '==' , uid)).snapshotChanges().pipe(map(action => {
       return action.map(a => {
         const data = a.payload.doc.data() as Client;
         const id = a.payload.doc.id;
         return { id, ...data };
       });
     }));
       
   }

   newClient(client : Client){
    this.clientsColl.add(client);
   }

   getClient(id :string) : Observable<Client | any> {
    return this.clientsColl.doc(id).valueChanges() ;
   }

   updateClient(client : Client){
      this.clientsDoc = this.clientsColl.doc(client.id);
      this.clientsDoc.update(client);
   }

   removeClient(id :string){
    this.clientsDoc = this.clientsColl.doc(id);
    this.clientsDoc.delete()
   }
}
