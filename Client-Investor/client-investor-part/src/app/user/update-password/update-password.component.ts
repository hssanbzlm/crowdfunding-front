import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private service:UserServicesService,private fb:FormBuilder,private router:Router) { }
  updatePassForm:FormGroup;

  ngOnInit() { 
   
    this.updatePassForm=this.fb.group({
    password:["",Validators.required]

    })

  } 


  onSubmit()
  {   

    this.service.updatePass(localStorage.getItem('emailofForgotPass'),this.updatePassForm.get('password').value).subscribe(data=>{ 
      this.router.navigateByUrl('/login');

      

    },error=>{})



  }

}
