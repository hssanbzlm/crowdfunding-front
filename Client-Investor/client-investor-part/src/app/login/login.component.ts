import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../classes/user';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ClientServicesService } from '../services/client-services.service';
import { decode } from 'punycode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:UserServicesService,private fb:FormBuilder,private router:Router,private clientService:ClientServicesService) { }
    loginForm:FormGroup;
    user:User=new User();
    submitted:boolean=false;

  ngOnInit() { 

    this.loginForm=this.fb.group({
   email:["",[Validators.required,Validators.email]],
   password:["",Validators.required],
   user:["",Validators.required]
   

    })
  } 

  login()
  {    
    this.submitted=true;
    if(this.loginForm.invalid)
    {return;}
    this.user.email=this.loginForm.get('email').value;
    this.user.password=this.loginForm.get('password').value;
    this.service.login(this.loginForm.get('user').value,this.user).subscribe(data=>{ 
      var decodedToken=jwt_decode(data.token)
      console.log(decodedToken);
      localStorage.setItem('role',this.loginForm.get('user').value);
      localStorage.setItem("id",decodedToken["_id"]);
      localStorage.setItem("token",data.token);
      localStorage.setItem('email',decodedToken['email']);
      if(this.loginForm.get('user').value=="client")
      {            

      localStorage.setItem('idClient',decodedToken.idClient) 
      this.clientService.getClientDetails(decodedToken.idClient).subscribe(data=>{   
        localStorage.setItem('firstName',data.firstName);
        localStorage.setItem('lastName',data.lastName); 
        this.clientService.getClientImg(decodedToken.idClient).subscribe(data=>{  
          if(data.img)
          localStorage.setItem('img',data.img); 
          this.router.navigateByUrl('client/home'); 

        
        },error=>{console.log('error')})


       

      },errors=>{});
      
      }
      if(this.loginForm.get('user').value=="investor")
      {  
      localStorage.setItem('idInvestor',decodedToken.idInvestor);
      this.router.navigateByUrl('investor/home')
      }
    
    },error=>{})

  } 

  redirectToForgotPass()
  {
this.router.navigateByUrl('user/forgotPass');

  } 
  redirectToRegistre()
  {
    this.router.navigateByUrl('user/registre');
  }

}
