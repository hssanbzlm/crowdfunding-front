import { Component, OnInit } from '@angular/core';
import { InvestorServicesService } from 'src/app/services/investor-services.service';
import { Investor } from 'src/app/classes/investor';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private investorService:InvestorServicesService,private router:Router,private fb:FormBuilder) { }
 inv:Investor; 
 updateProfileForm:FormGroup;
  ngOnInit() {  
    this.getInvestorDetails(localStorage.getItem('idInvestor'))
    this.updateProfileForm=this.fb.group({
      enterprise:[,Validators.required],
      address:[,Validators.required]

    })
  } 

  getInvestorDetails(idInvestor:string)
  {  
    this.investorService.getInvestorById(localStorage.getItem('idInvestor')).subscribe(data=>{
     
      this.inv=data;

    })

  } 

  onClickUpdate()
  {  
    this.investorService.updateInvestor(this.inv,localStorage.getItem('idInvestor')).subscribe(data=>{
     if(data)
     {  
       this.router.navigateByUrl('investor/home')
       
     }
     

    },error=>{})

  } 


  redirectToHome()
  {
   this.router.navigateByUrl('investor/home')

  }

}
