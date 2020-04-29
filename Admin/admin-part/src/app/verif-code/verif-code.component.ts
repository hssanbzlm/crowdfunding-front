import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verif-code',
  templateUrl: './verif-code.component.html',
  styleUrls: ['./verif-code.component.css']
})
export class VerifCodeComponent implements OnInit {

  constructor(private service:AdminServiceService,private fb:FormBuilder,private router:Router) { }
  codeForm:FormGroup;
  code:string;

  ngOnInit() { 
    this.codeForm=this.fb.group({
  code:['',Validators.required]

    })
  } 


  verifCode()
  {  console.log(this.code);
      this.service.verifCode(this.code).subscribe(data=>{   
        console.log(data)
        if(data==true)
      this.router.navigateByUrl('/updatePass');
     

    },error=>{})
  }

}
