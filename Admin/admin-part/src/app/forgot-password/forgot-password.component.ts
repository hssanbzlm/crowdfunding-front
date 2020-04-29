import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service:AdminServiceService ,private fb:FormBuilder,private router:Router) { }
  emailForm:FormGroup;
  email:string;
  ngOnInit() { 

   this.emailForm=this.fb.group({
      
   email:["",[Validators.required,Validators.email]]

   })

  }

onClick()
{ 
  localStorage.setItem("emailofForgotPass",this.email); 
  this.service.sendForgotPassLink().subscribe(data=>{ 
    this.router.navigateByUrl('/verifCode');

  },error=>{})

}

}
