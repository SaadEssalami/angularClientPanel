import { Injectable } from '@angular/core';
import { map } from 'rxjs';
//import firebase from 'firebase/compat/app'; 
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth} from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor( private afAuth : AngularFireAuth) { }

  login(email : string , password : string){
    return new Promise(( resolve , reject) => {
      this.afAuth.signInWithEmailAndPassword(email , password)
      .then((userData: unknown)=> resolve(userData) , (error: any) => reject(error))
    })
    }

    loginWithGoogle(){
      return new Promise(( resolve , reject) => {
        this.afAuth.signInWithPopup(new GoogleAuthProvider())
        .then((userData: {})=> resolve(userData) , (error: any) => reject(error))
      })
    }

    getAuth(){
      return this.afAuth.authState.pipe(map((auth: any) => auth))
    }
    
    logOut(){
      this.afAuth.signOut();
    }

    Regsiter( email :string , password : string ){
      return new Promise(( resolve , reject) => {
        this.afAuth.createUserWithEmailAndPassword( email , password )
        .then((userData: unknown)=> resolve(userData) , (error: any) => reject(error))
      })
    }
  
}
