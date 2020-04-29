import { Component, OnInit } from '@angular/core';
import { ClientServicesService } from '../../services/client-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../../services/user-services.service';
import { Project } from '../../classes/project';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  constructor(private clientService:ClientServicesService,private userService:UserServicesService,private fb:FormBuilder,private activatedRoute:ActivatedRoute ,private route:Router) { }
  updateProject:FormGroup;
  p:Project=new Project;

  ngOnInit() {  
    var idProject=this.activatedRoute.snapshot.paramMap.get('idProject');
    this.getProjectById(idProject);
   
   this.updateProject=this.fb.group({
   title:["",Validators.required],
   description:["",Validators.required],
   budget:["",Validators.required]

    })

  } 

  getProjectById(idProject:string)
  {   
    this.userService.getProjectById(idProject).subscribe(data=>{this.p=data;},error=>{console.log(error)})
    

  }

  onClickUpdate(){
   
    this.clientService.updateProject(this.p).subscribe(data=>{this.route.navigateByUrl('client/home')},error=>{});

  } 

  backToDetails(idProject:string)
  { 
    this.route.navigate(["client/detailsProject",idProject]);

  }

}
