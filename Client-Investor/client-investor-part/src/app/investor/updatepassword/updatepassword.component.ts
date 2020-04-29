import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  constructor(private userService:UserServicesService,private fb:FormBuilder,private router:Router) { }
  updatePassForm:FormGroup;

  ngOnInit() { 

    this.updatePassForm=this.fb.group({ 
      oldPassword:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]]

    })
  } 

  
  updatePassword()
   {   
  
    this.userService.updatePass(localStorage.getItem('email'),this.updatePassForm.get('password').value).subscribe(data=>{  
       this.router.navigateByUrl('investor/home')
       
     },error=>{})
      


   }

}
