import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  email! : string;
  password! : string;
  

  constructor(private authservice : AuthClientService , private route : Router , private Fm : FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.authservice.Regsiter(this.email  ,this.password)
    .then(register => {
     
        this.Fm.show('Registred successufully' , 
        {
          cssClass : 'alert-success' , 
          timeOut : 2000
        })
        this.route.navigate(['/login'])
    })
    .catch(error => {
      this.Fm.show('sorry youre registred not successufully try again ' , { cssClass : 'alert-danger' , timeout : 3000})
    })
  }

}
