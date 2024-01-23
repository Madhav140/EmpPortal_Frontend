import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../Services/adminapi.service';
import { employeeModel } from '../employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  /* onInit is an interface to implement ngonInit */

  allemployee:employeeModel[]=[]
  SearchKey:string=""
  
  //for pagenation
  p:number=1

constructor(private api:AdminapiService){}


/* lifecycle hook - call just after the component is created and constructor is called (when the page is loaded) */
ngOnInit(): void {
  this.getAllEmployee()
}


   getAllEmployee(){
    this.api.getAllEmpApi().subscribe({
      next:(res:any)=>{
        this.allemployee=res
        console.log(this.allemployee);

        
      },
      error:(res:any)=>{
        console.log(res);
        
      }
    })
   }

   deleteemp(id:any){
      this.api.deleteEmployeeApi(id).subscribe({
        next:(res:any)=>{
          console.log(this.allemployee);
       this.getAllEmployee()
          
        },
        error:(res:any)=>{
          console.log(res);
          
        }
      })
   }


   sortId(){
    this.allemployee.sort((a:any,b:any)=>a.id-b.id)
   }

   sortName(){
    this.allemployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))

   }

   generatePdf(){
    //create an object for jspdf
    const pdf = new jsPDF()
    //refer jspdf site for syntax
    
    let head = [['Id','Employee Name','Email','Status']]
     
    let body:any = []

    this.allemployee.filter((item)=>item.id!=='1').forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.status==="1"?'Active':'Inactive'])
    })
    /* fonstsize */
    pdf.setFontSize(16)
    /* title and margins*/
    pdf.text('Employee Details',10,10)
    /* to convert it into table */
    autoTable(pdf,{head,body})
    /* to open in new tab */
     pdf.output('dataurlnewwindow')
    /* save and download */
   pdf.save('Employee.pdf')

   }



}
