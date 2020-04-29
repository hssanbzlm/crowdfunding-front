import { Component, OnInit, Input } from '@angular/core';
import { InvestorServicesService } from '../../services/investor-services.service';
import { Project } from '../../classes/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investor-home',
  templateUrl: './investor-home.component.html',
  styleUrls: ['./investor-home.component.css']
})
export class InvestorHomeComponent implements OnInit {

  constructor(private serviceInvestor:InvestorServicesService,private router:Router) { }
  projects:Project[]; 

  @Input()page:number=1;
  @Input()pageSize:number=9;
  @Input()collectionSize:number;
  ngOnInit() {  
    this.allProjects();


  } 


  allProjects()
  { 
       this.serviceInvestor.allProject().subscribe(data=>{ 
         this.projects=data;
         this.collectionSize=data.length;

       },error=>{console.log(error);})

  } 

  navigateToDetails(idProject:string)
  { 
    this.router.navigate(['investor/detailsProject',idProject]);

  }

}
