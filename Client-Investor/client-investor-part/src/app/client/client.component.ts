import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit { 

  private img:SafeResourceUrl="";
  private firstName:string="";
  private lastName:string="";
  constructor(private router:Router, private sanitizer: DomSanitizer  ) {  
    
  }
  

  ngOnInit() {  
    console.log("init");  
    this.getClientDetails();
    this.img=this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+localStorage.getItem('img'));


  
  }  
 
  

  logout()
  {
    localStorage.clear();
    this.router.navigateByUrl('login');
    
  } 

  getClientDetails()
  {  console.log(localStorage.getItem('firstName'));
    this.firstName=localStorage.getItem('firstName');
    this.lastName=localStorage.getItem('lastName');
    console.log(this.firstName+" "+this.lastName);
    
  } 

  redirectToProfile()
  {
   
    this.router.navigateByUrl('client/updateProfile/ '+localStorage.getItem('idClient'));

  } 

  redirectToUpdatePass(){
  
    this.router.navigateByUrl('client/updatePassword');

  }



}
