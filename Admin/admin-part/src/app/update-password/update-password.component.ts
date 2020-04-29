import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private service:AdminServiceService,private fb:FormBuilder,private router:Router) { } 
  updatePassForm:FormGroup;
  password:string;

    ngOnInit() {  
      this.updatePassForm=this.fb.group({
        password:["",Validators.required]
      })
  
  

  } 


  onSubmit()
  {   

    this.service.updatePass(this.password).subscribe(data=>{  
      this.router.navigateByUrl('home')
  

    },error=>{})



  }

}
