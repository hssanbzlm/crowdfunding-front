import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, Color } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  public email:string;
  public clients:number;
  public investors:number;
  public projects:number;
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColor:any = [
    {
        backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)'
        ]
    }
]
// 

public secondPieChartLabels: Label[] = [];
public secondPieChartData: SingleDataSet = [];
public secondPieChartType: ChartType = 'pie';
public secondPieChartColor:any = [
  {
      backgroundColor: ['rgba(247, 17, 17, 1)',
      'rgba(6,243,10,0.47)'
      ]
  }
] 

//  

public thirdPieChartLabels: Label[] = [];
public thirdPieChartData: SingleDataSet = [];
public thirdPieChartType: ChartType = 'pie';
public thirdPieChartColor:any = [
  {
      backgroundColor: ['rgba(167, 71, 218, 0.47)',
      'rgba(247,216,17,1)'
      ]
  }
] 


  

  constructor(private service:AdminServiceService,private router:Router) {
    

   }
  dash:any;

  ngOnInit() {  
    this.email=localStorage.getItem('email');
    console.log(this.email);
    this.service.getDash().subscribe(data=>{
      if(data){
        this.pieChartData.push(data.data.clients);
        this.pieChartData.push(data.data.investors);
        this.pieChartLabels.push('clients');
        this.pieChartLabels.push('investors');
        this.clients=data.data.clients;
        this.investors=data.data.investors;
        this.projects=data.data.projects;

        this.secondPieChartData.push(data.data.projects-data.data.projects+data.data.numberOfInvestment);
        this.secondPieChartData.push(data.data.projects-data.data.numberOfInvestment);
        this.secondPieChartLabels.push('projects get at least one investment');
        this.secondPieChartLabels.push('projects doesnt get at least one investment'); 

        this.thirdPieChartData.push(data.data.projectTotallyFund);
        this.thirdPieChartData.push(data.data.projects-data.data.projectTotallyFund);
        this.thirdPieChartLabels.push('projects totally fund');
        this.thirdPieChartLabels.push('projects still need investment'); 




      }
    })
    
  }  

  

logout()
{

  localStorage.clear();
  this.router.navigateByUrl('login')

}

redirectToUpdatePass()
{
  this.router.navigateByUrl('updatePass')
}


  

}
