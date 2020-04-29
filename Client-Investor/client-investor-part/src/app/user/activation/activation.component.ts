import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor(private service:UserServicesService,private activateroute:ActivatedRoute,private router:Router) { }

  ngOnInit() { 
     
    this.service.activateUser(this.activateroute.snapshot.paramMap.get('code')).subscribe
    (data=>{  
      console.log(data.deletedCount)
      this.router.navigateByUrl('login');
    },error=>{
      
    })
 
  }

}
