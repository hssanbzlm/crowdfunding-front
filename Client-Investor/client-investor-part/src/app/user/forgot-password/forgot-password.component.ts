import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service:UserServicesService,private fb:FormBuilder,private router:Router) { }
  emailForm:FormGroup;
  ngOnInit() { 
    
    this.emailForm=this.fb.group({
   email:["",[Validators.required,Validators.email]]

    })
   

  } 

  
  onClick()
{ 
  localStorage.setItem("emailofForgotPass",this.emailForm.get('email').value); 
  this.service.sendForgotPassLink().subscribe(data=>{ 
    this.router.navigateByUrl('user/verifCode');

  },error=>{})

}



}
