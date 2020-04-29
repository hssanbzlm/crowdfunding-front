import { Component, OnInit, Input } from '@angular/core';
import { ClientServicesService } from '../../services/client-services.service';
import { Project } from '../../classes/project';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  projects:Project[]=[];
  project: Project = new Project;
  @Input()page:number=1;
  @Input()pageSize:number=9;
  @Input()collectionSize:number; 
  img:SafeResourceUrl;

  constructor(private clientService:ClientServicesService , private router:Router,private sanitizer: DomSanitizer) { }

  ngOnInit() {   
    this.img=this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+localStorage.getItem('img'));
    this.myprojects();
  
    
 
  } 


  myprojects()
  { 
       var  p:Project=new Project;
    this.clientService.myProjects().pipe(
      map(  

       data=>{ 
       this.collectionSize=data.length;
         for(var i=0;i<data.length;i++)
         {     
           p.budget=data[i].budget;
           p.description=data[i].description;
           p.feedback=data[i].feedback;
           p.title=data[i].title;
           p.totalFund=data[i].totalFund;
           p._id=data[i]._id;
           this.projects.push(p);
           p=new Project;

         }



       },error=>{console.log(error);}

      )
      
      ).subscribe();


  } 
  redirectAddProject()
  {
     this.router.navigateByUrl('client/addProject');

  } 

  

  navigateToDetails(idProject:string)
  {
    this.router.navigate(['client/detailsProject',idProject]);
  } 

  

}
