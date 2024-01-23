import { Component, OnInit } from '@angular/core';
import { employeeModel } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../Services/adminapi.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
     
   employee:employeeModel={}


   constructor(private route:ActivatedRoute, private api:AdminapiService, private router:Router){}

   ngOnInit(): void {
     this.route.params.subscribe((res:any)=>{
       const {id} = res
       this.ViewEmployee(id)     
     })
   }

   ViewEmployee(id:any){
          this.api.viewEmployeeApi(id).subscribe({
            next:(res:any)=>{
              console.log(res);
              this.employee=res
             
            },
            error:(res:any)=>{
              console.log(res);
              
            }
          })
   }


   editEmployee(id:any){
       this.api.UpdateEmpApi(id,this.employee).subscribe({
        next:(res:any)=>{
          console.log(res);
          Swal.fire({
            title: "Employee Updated Successfully",
            icon: "success"
          });
          this.router.navigateByUrl('employees')
          
        },
        error:(res:any)=>{
          console.log(res);
          Swal.fire({
            title: "Error",
            icon: "error"
          });
          
        }
       })
   }

   CancelButton(id:any){
    this.ViewEmployee(id)
   }

   
    
}
