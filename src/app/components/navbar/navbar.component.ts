import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLogin : boolean =false;
  username! : string ;

  constructor(private authservice : AuthClientService ,  private flashMesssage : FlashMessagesService , private route : Router) { }

  ngOnInit(): void {
    this.authservice.getAuth().subscribe((auth: any) => {
      if(auth){
        this.isLogin = true;
        this.username = auth.email;
        //this.route.navigate(['/']);
      }else {
        this.isLogin = false;
      }
    })
  }

  onLogOut(){
    this.authservice.logOut();
    //this.flashMesssage.show('');
   return this.route.navigate(['/login'])
  }

}
