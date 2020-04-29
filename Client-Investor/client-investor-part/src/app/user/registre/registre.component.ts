import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../classes/client';
import { Investor } from '../../classes/investor';
import { ClientServicesService } from '../../services/client-services.service';
import { InvestorServicesService } from '../../services/investor-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  constructor(private fb:FormBuilder,private clientservice:ClientServicesService,private investorservice:InvestorServicesService,private router:Router) { }
  registerForm:FormGroup; 
  client:Client=new Client();
  investor:Investor=new Investor();
  submitted:boolean=false;
  msg:string='';

  ngOnInit() {  
   

    this.registerForm=this.fb.group({  
      lastName:["",[Validators.required,Validators.pattern('[a-z A-Z]*')]],
      firstName:["",[Validators.required,Validators.pattern('[a-z A-Z]*')]],
      enterprise:["",[Validators.required,Validators.pattern('[a-z A-Z]*')]],
      address:["",Validators.required],
      birthday:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required],
      user:[,Validators.required]

    }) 

   
  } 

  onSubmit()
  {   

    this.submitted=true;
    
    if(this.registerForm.get('user').errors||this.registerForm.get('email').errors||this.registerForm.get('password').errors)
    {return;}

    if(this.registerForm.get('user').value=="client")
       { 
          if(this.registerForm.get('birthday').errors||this.registerForm.get('firstName').errors||this.registerForm.get('lastName').errors)
       {return ;}
          this.client.email=this.registerForm.get("email").value;
          this.client.password=this.registerForm.get("password").value;
          this.client.birthday=this.registerForm.get('birthday').value;
          this.client.firstName=this.registerForm.get('firstName').value;
          this.client.lastName=this.registerForm.get('lastName').value;
          this.clientservice.registreClient(this.client).subscribe(data=>{
           this.msg="an email has been sent to "+this.client.email+" "+"please activate your account";
           

          },error=>{});
       } 
       if(this.registerForm.get('user').value=="investor")
       {   if(this.registerForm.get('address').errors||this.registerForm.get('enterprise').errors)
       {return ;}
         this.investor.email=this.registerForm.get("email").value;
         this.investor.password=this.registerForm.get("password").value;
         this.investor.address=this.registerForm.get('address').value;
         this.investor.enterprise=this.registerForm.get('enterprise').value;
         this.investorservice.registreInvestor(this.investor).subscribe(data=>{
          this.msg="an email has been sent to "+this.investor.email+" "+"please activate your account";

         },error=>{}); 

       }



  }

  change() //after the submit if a user made changes , the msg dissapear
  { if(this.submitted)
    
    this.msg='';

    this.submitted=false;
  }

}
