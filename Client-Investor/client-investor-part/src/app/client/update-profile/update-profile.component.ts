import { Component, OnInit } from '@angular/core';
import { ClientServicesService } from 'src/app/services/client-services.service';
import { Client } from 'src/app/classes/client';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private clientService:ClientServicesService,private router:Router,private fb:FormBuilder) { }
  

  cl:Client=new Client; 
  file:any;
 updateProfileForm:FormGroup;
  ngOnInit() {   
    this.updateProfileForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      birthDay:['',Validators.required],
      avatar:[]
    })


    this.getClient();
  }
    

getClient()
{  
  this.clientService.getClientDetails(localStorage.getItem('idClient')).subscribe(data=>{  
   this.cl=data; 
  

  },error=>{});

}
 
redirectToHome()
{ 
  this.router.navigateByUrl('client/home');
  
} 

onFileSelect(event){ 
  
  if (event.target.files.length > 0) {

     this.file = event.target.files[0];
     console.log(this.file);
  }
  
}

onClickUpdate()
{ 
  this.clientService.updateClient(this.cl).subscribe(data=>{   
  const formData = new FormData();
   formData.append('avatar',this.file);
   this.clientService.updateClientImage(this.cl._id,formData).subscribe(data=>{},error=>{})




 },error=>{})

}


}
