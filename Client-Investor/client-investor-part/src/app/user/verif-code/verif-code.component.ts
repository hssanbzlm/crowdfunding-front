import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verif-code',
  templateUrl: './verif-code.component.html',
  styleUrls: ['./verif-code.component.css']
})
export class VerifCodeComponent implements OnInit {

  constructor(private service:UserServicesService,private fb:FormBuilder,private router:Router) { }
  
  codeForm:FormGroup;  


  ngOnInit() { 

    this.codeForm=this.fb.group({
      code:['',Validators.required]
    
        })
  } 


  verifCode()
  {  
      this.service.verifCode(this.codeForm.get('code').value).subscribe(data=>{   
        if(data==true)
       this.router.navigateByUrl('user/updatePass');
     

    },error=>{})
  }


}
