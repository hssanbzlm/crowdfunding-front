import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../classes/project';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/classes/chat';
import { Message } from 'src/app/classes/message';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InvestorServicesService } from 'src/app/services/investor-services.service';
import { Feedback } from 'src/app/classes/feedback';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.css']
})
export class DetailsProjectComponent implements OnInit {

  constructor(private userservice:UserServicesService,private activatedroute:ActivatedRoute,private router:Router,private chatService:ChatService,private sanitizer: DomSanitizer,private investorService:InvestorServicesService) { } 
  p:Project=new Project;
  message: string;
  idChat:string;
  chat:Chat=new Chat;
  idUser=localStorage.getItem('id'); 
  img:SafeResourceUrl;
  clientFirstNameLastName:string;
  feed:Feedback[]=[];




  ngOnInit() {  
    this.img=this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+localStorage.getItem('img'));
      this.clientFirstNameLastName=localStorage.getItem('firstName')+" "+localStorage.getItem('lastName');
    
     var idProject=this.activatedroute.snapshot.paramMap.get("idProject");
     this.getProjectById(idProject); 
     this.getFeedofProject(idProject);
     console.log(this.feed);
     if(localStorage.getItem('idClient'))
     this.existChatClient(idProject,localStorage.getItem('idClient')); 
     this.chatService.getMessages('message').subscribe( data=>{    
      this.chat.idMessages.push(data); 
      

     }


      );
   
  
  }


  getProjectById(idProject:string)
  { 
       this.userservice.getProjectById(idProject).subscribe(data=>{  
       this.p=data; 


     },error=>{

      console.log(error);
     })


  } 


  navigateToUpdate(idProject:string)
  { 
    this.router.navigate(['client/updateProject',idProject])

  }
  
  backHome()
  {
    this.router.navigate(['client/home']);
  } 

  sendMessage() {
      this.chatService.sendMessage(this.message,localStorage.getItem('id'),this.idChat).subscribe(data=>{ 
      var msg:Message=new Message;
      msg=data;
      

    },error=>{});
    this.message = ''; 
 
    
  } 

  existChatClient(idProject:string,idClient:string)
  {    
      this.chatService.existChatClient(idProject,idClient).subscribe(data=>{  
        if(data)
        {
      this.idChat=data._id; 
      this.chat=data;
      this.changeIdUser(this.chat);
        }
      

    },error=>{ 
    }) 
    

  }  

  getFeedofProject(idProject:string)
  {  
    this.investorService.getFeedOfProject(idProject).subscribe(data=>{this.feed=data; 
      for(let i=0;i<this.feed.length;i++)
      {
        this.investorService.getInvestorById(this.feed[i].idInvestor).subscribe(inv=>{this.feed[i].idInvestor=inv.enterprise})
      }
      
    
    
    },error=>{})
    
  } 

  changeIdUser(chat:Chat)
  {
    
   for(let i=0;i<chat.idMessages.length;i++)
   {       

     this.investorService.getInvestorDetailsByUserId(chat.idMessages[i].idUser).subscribe(data=>
       { 
         
           chat.idMessages[i].idUser=data.idInvestor.enterprise 
      },error=>{})
   }

  }

}
