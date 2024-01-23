import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  //!! to return boolean
   islogged(){
    return  !!localStorage.getItem("name")
   }



}
