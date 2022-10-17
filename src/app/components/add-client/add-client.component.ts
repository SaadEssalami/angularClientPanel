import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client : Client ={
    firstName : "",
    lastName : "",
    email : "",
    phone : 0,
    balance: 0,
    user : ""
  };

  constructor(private cls : ClientService ,  private route : Router , private fm : FlashMessagesService , private authSvc : AuthClientService) { }

  ngOnInit(): void {
    this.authSvc.getAuth().subscribe( auth => {
      this.client.user = auth.uid;
    })
  }


  onSubmit(){
    this.cls.newClient(this.client);
    this.fm.show('client added successfully' , {cssClass : 'alert-success' , timeout : 5000});
    return this.route.navigate(['/']);
  }
}
