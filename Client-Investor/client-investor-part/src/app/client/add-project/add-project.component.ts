import { Component, OnInit } from '@angular/core';
import { ClientServicesService } from '../../services/client-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../classes/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(private service:ClientServicesService,private fb:FormBuilder,private router:Router) { } 
  addProject:FormGroup;

  ngOnInit() {  
    this.addProject=this.fb.group({
    
      title:["",Validators.required],
      description:["",Validators.required],
      budget:["",Validators.required],

    })

    
  } 


  onSubmit()
  {     
    var p:Project=new Project;
    p.title=this.addProject.get('title').value;
    p.description=this.addProject.get('description').value;
    p.budget=this.addProject.get('budget').value;

    this.service.addProject(p).subscribe(data=>{this.router.navigateByUrl('client/home')},
    error=>{console.log("error")})

  } 

  redirectToHome()
  {
   
     this.router.navigateByUrl('client/home');


  }

}
