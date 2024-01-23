import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from '../employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }

     server_URL = 'http://localhost:3000'

  authorization(){
   return  this.http.get(`${this.server_URL}/employee/1`)
  }


  addEmployeeApi(employee:employeeModel){
   return this.http.post(`${this.server_URL}/employee`,employee)
  }

  getAllEmpApi(){
    return this.http.get(`${this.server_URL}/employee`)
  }

  deleteEmployeeApi(id:any){
   return this.http.delete(`${this.server_URL}/employee/${id}`)
  }

   viewEmployeeApi(id:string){
    return this.http.get(`${this.server_URL}/employee/${id}`)
   }

  UpdateEmpApi(id:any,employee:any){
   return this.http.put(`${this.server_URL}/employee/${id}`,employee)
  }

  UpdateAdminApi(admin:any){
    return this.http.put(`${this.server_URL}/employee/1`,admin)
   }

   public SharedData = new BehaviorSubject(false)

   UpdateData(data:any){
    this.SharedData.next(data)
   }

   


}
