import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-datails-client',
  templateUrl: './datails-client.component.html',
  styleUrls: ['./datails-client.component.css']
})
export class DatailsClientComponent implements OnInit {
  id!: string ;
  client!: Client;
  showBalance : boolean = false ;

  constructor( private clientService : ClientService, private router : Router , private route : ActivatedRoute , private Fm : FlashMessagesService) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client =>{
       this.client = client;
       
    })
  }

  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.Fm.show('Balance updated' , {cssClass : 'alert-warning' , timeout : 4000})
  }

  deleteClient(id : string){
    if(confirm('are you sure to delete this client ??')){
      this.clientService.removeClient(id);
      this.Fm.show('client deleted' , {cssClass : 'alert-danger' , timeout : 4000})
      this.router.navigate(['/'])
    }else{
      this.Fm.show('client not deleted ' , { cssClass : 'alert-danger' , timeout : 4000})
    }
  }
}
