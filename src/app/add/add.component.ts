import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../Services/adminapi.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private api:AdminapiService , private router:Router){}

    /* variable to store the value from input box which have the same structure of employee model. */
    employee:employeeModel={}

    cancelEmp(){
      this.employee={}
    }



    addEmp(){
      console.log(this.employee);

      if(!this.employee.id || !this.employee.name || !this.employee.email || !this.employee.status){
        Swal.fire({
          title: "Please fill the full form",
          icon: "error"
        });
      }
      else{
        this.api.addEmployeeApi(this.employee).subscribe({
          next:(res:employeeModel)=>{
            console.log(res);
            Swal.fire({
              title: "Employee added Successfully",
              icon: "success"
            });
            this.employee={}
            this.router.navigateByUrl('employees')
            
          },
  
          error:(res:any)=>{
            console.log(res);
            Swal.fire({
              title: "Error..",
              icon: "error"
            });
            
          }
        })
      }
         


     
      
    }


     
}
