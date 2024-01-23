import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { AdminapiService } from '../Services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  email:string=""
  pswd:string=""

  constructor(private api:AdminapiService , private  route:Router ){}

  login(){
    if(!this.email || !this.pswd){
      alert('please fill the form completely')
    }
    else{
 
      this.api.authorization().subscribe({
        next:(res:any)=>{
              const {email,password} = res
              if(email === this.email && password === this.pswd){
                Swal.fire({
                  title: "Login Successfull",
                  icon: "success"
                });
                localStorage.setItem("name",res.name)
                localStorage.setItem("pswd",res.password)
                this.route.navigateByUrl('dashboard')

                this.api.UpdateData({d:true})

              }
              else{
                Swal.fire({
                  title: "Invalid email or password",
                  icon: "error"
                });
              }
        },
        error:(res:any)=>{
            console.log(res);
            
        }
      })


    }
  }



}
