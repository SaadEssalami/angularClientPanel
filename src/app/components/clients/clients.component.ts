import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  total : number = 0;
  searchClient! : Client[];
  constructor( private Cls : ClientService , private Fm : FlashMessagesService , private router : Router , private as : AuthClientService) { }

  ngOnInit(): void {
    this.as.getAuth().subscribe(auth => {
      this.Cls.getClients(auth.uid).subscribe(client => {
       this.searchClient =this.clients = client;
        this.total = this.getTotal();
      })
    })
    
  }

  getTotal(){
   return this.clients.reduce((total ,clients)=>{
      return total + parseFloat(clients.balance.toString()) ;
    },0)
  }

  deleteClient(id : any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this client!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Cls.removeClient(id);
        this.Fm.show('client deleted' , {cssClass : 'alert-danger' , timeout : 4000})
        this.router.navigate(['/'])
        Swal.fire(
          { title: 'deleted',
          text: "this client is deleted",
          icon: 'success',
          timer : 3000
        }
        )
      }
    })
  }

  search(query : string){
    this.searchClient = (query) ? this.clients.filter(client => client.firstName?.toLowerCase().includes(query.toLowerCase()) || 
     client.lastName?.toLowerCase().includes(query.toLowerCase())) : this.clients ;
  }

}
