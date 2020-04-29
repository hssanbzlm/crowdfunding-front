import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {

  constructor(private router:Router) { }
 email:string;
  ngOnInit() { 
    
    this.email=localStorage.getItem('email');


  }  

  redirectToUpdatePass(){
  
    this.router.navigateByUrl('investor/updatePassword');

  } 

  redirectToProfile()
{
  this.router.navigateByUrl('investor/updateProfile')
}
  logout()
  {
    localStorage.clear();
    this.router.navigateByUrl('login');
    
  }
  

}
