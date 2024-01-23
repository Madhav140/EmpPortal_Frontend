import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../Services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  activeNo:number=0
  inactiveNo:number=0
  adminName:any=""
  AdminDetails:any={}


  constructor(private api:AdminapiService){ 
     this.chartOptions={   
      chart: {
        type: 'pie'
    },
    title: {
        text: 'Employee Status'
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },  
    credits:{
      enabled:false
    },
    series: [
        {
            name: 'Employees',
            colorByPoint: true,
            data: [
                {
                    name: 'Active',
                    y:8
                    
                },
                {
                    name: 'Inactive',
                    y: 4
                }
            ]
        }
    ]
 
  
      }
      HC_exporting(Highcharts);     
  }
  
  
  

  ngOnInit():void {
    this.getAllEmployees() 
    if(localStorage.getItem("name")){
      this.adminName=localStorage.getItem("name")
    }

    this.api.authorization().subscribe((res:any)=>{
      this.AdminDetails=res

      if(res.picture){
        this.profileImage = res.picture
      }
    })


    
  }


  empLength:number=0
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};
  selected: Date | null = new Date()
  profileImage:string="./assets/images/Personicon.png"
  editAdminStatus:boolean=false
 
  employees:any=[]

    showSidebar:boolean=true

    menuBar(){
      this.showSidebar=!this.showSidebar
    }

    getAllEmployees(){ 
      this.api.getAllEmpApi().subscribe({
      next:(res:any)=>{
       this.empLength=res.length
     this.employees=res
     this.activeNo = res.filter((item:any)=>item.status==='1').length 
      
     this.inactiveNo = res.filter((item:any)=>item.status==='0').length 

      },
      error:(res:any)=>{
        console.log(res);
        
      }
    })
  }

  
     edit(){
      this.editAdminStatus=true
     }

     editt(){
      this.api.authorization().subscribe((res:any)=>{
        this.AdminDetails=res
  
        if(res.picture){
          this.profileImage = res.picture
        }
      })

      this.editAdminStatus=false
     }

    getFile(event:any){
        let imgdetails = event.target.files[0]
        console.log(imgdetails);
        let fr = new FileReader()
        fr.readAsDataURL(imgdetails)
        fr.onload=(event:any)=>{
          console.log(event.target.result);
          this.profileImage=event.target.result
          this.AdminDetails.picture = this.profileImage
        } 
    }

    UpdateAdmin(){
      this.api.UpdateAdminApi(this.AdminDetails).subscribe({

        next:(res:any)=>{
          console.log(res);
          Swal.fire({
            title: "Admin Updated Successfully",
            icon: "success"
          });
          localStorage.setItem("name",res.name)
          localStorage.setItem("pswd",res.password)
          this.adminName=localStorage.getItem("name")  
        },

        error:(err:any)=>{
         console.log(err);
         Swal.fire({
          title: "Error....",
          icon: "error"
        }); 
        }
      })
    }


    

}
