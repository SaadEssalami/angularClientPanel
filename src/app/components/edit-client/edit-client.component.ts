import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  
  client: Client = {
    firstName: "",
    lastName :"",
    email : " ",
    phone : 0,
    balance: 0
  };
  id!: string ;
  
  constructor( private clientService : ClientService , private router : Router , private route : ActivatedRoute  , private Fm : FlashMessagesService  ) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client =>{
       this.client = client;
    })
  }

  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.Fm.show('client Updated' , {cssClass : 'alert-info' , timeout : 4000});
    this.router.navigate(['/']);
  }

}
