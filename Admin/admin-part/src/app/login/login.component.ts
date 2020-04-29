import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { AdminServiceService } from '../services/admin-service.service';
import { Observable } from 'rxjs';
import { Admin } from '../class/admin';
import { Router } from '@angular/router';
import { decode } from 'punycode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted:boolean=false;
  admin:Admin=new Admin;
  email:string;
  password:string;
  constructor(private formBuilder:FormBuilder,private adminService:AdminServiceService,private router:Router) { }

  ngOnInit() {  

    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  } 


  login()
  { 
    this.submitted=true;
    if(this.loginForm.invalid)
    return ; 
    this.admin.email=this.email;
    this.admin.password=this.password;
    
    this.adminService.loginAdmin(this.admin).subscribe(data=>{ 
             var decodedToken=jwt_decode(data.token)
             localStorage.setItem('email',decodedToken['email'])
             localStorage.setItem('role',"admin");
             localStorage.setItem("id",decodedToken["_id"]);
             localStorage.setItem("token",data.token);
             this.router.navigate(['/home']);
            

    },error=>{
      console.log("error");
    })




  }

}
