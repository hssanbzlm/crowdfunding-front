import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/classes/project';
import { Feedback } from 'src/app/classes/feedback';
import { InvestorServicesService } from 'src/app/services/investor-services.service';
import { Chat } from 'src/app/classes/chat';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/classes/message';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'; 
import *  as $ from 'jquery'
import { ClientServicesService } from 'src/app/services/client-services.service';


@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.css']
})
export class DetailsProjectComponent implements OnInit {

  constructor(private userservice:UserServicesService,private investorService:InvestorServicesService,private clientService:ClientServicesService,private activatedroute:ActivatedRoute,private router:Router,private chatService:ChatService,private fb:FormBuilder) { }
  p:Project=new Project;
  feed:Feedback[]=[];
  data:string="";
  idProject:string;
  idChat:string;
  chat:Chat=new Chat;
  message: string;
  idUser=localStorage.getItem('id'); 
  investment:number; 
  verif:boolean=false;
  needInvest:boolean=true;
  maxInvest:number;
  investmentForm:FormGroup;
  submit:boolean=false;




  ngOnInit() { 
    this.submit=false;
    this.idProject=this.activatedroute.snapshot.paramMap.get("idProject");
    this.getProjectById(this.idProject);

    this.getFeedofProject(this.idProject);  
    this.verifInvestor();
     if(localStorage.getItem('idInvestor')) 
      this.existChatInvestor(this.idProject,localStorage.getItem('idInvestor'));
     this.chatService.getMessages('message').subscribe( data=>{  
      this.investorService.getInvestorDetailsByUserId(data.idUser).subscribe(inv=>{ 
        if(inv.idInvestor)
           data.detailsInvestor=inv.idInvestor.enterprise
           else  
           {
            this.clientService.getClientDetailsByIdProject(this.chat.idProject).subscribe(cl=>{  
              if(cl)
              {
                data.detailsClient=cl.firstName+" "+cl.lastName;
              }


              })


           }

        this.chat.idMessages.push(data);

       })
 
      
     }


      ); 
      

        this.investmentForm=this.fb.group({
          investment:[,[Validators.required]]


        }) 
        
  } 
  static max(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      
      const value = parseFloat(control.value);
      return !isNaN(value) && value > max ? {'max': {'max': max, 'actual': control.value}} : null;
    };
  }
 

  invest()
{  
  this.submit=true;
  if(this.investmentForm.invalid)
  return ;
  
  var idInvestor=localStorage.getItem('idInvestor'); 
  this.investorService.invest(idInvestor,this.p,this.investmentForm.get('investment').value).subscribe(data=>{},error=>{})

} 



  
   getProjectById(idProject:string)
  { 
     this.userservice.getProjectById(idProject).subscribe(data=>{  
       this.p=data; 
       if(this.p.budget==this.p.totalFund || this.p.budget<this.p.totalFund )
       this.needInvest=false; 
        else {  
          this.maxInvest=this.p.budget-this.p.totalFund;
          this.investmentForm.get('investment').setValidators(Validators.max(this.maxInvest))


        }



     },error=>{

     }) 
  } 

  backHome()
  { 
    this.router.navigateByUrl('investor/home');
    
  }  

  getFeedofProject(idProject:string)
  {   

    this.investorService.getFeedOfProject(idProject).subscribe(data=>{  
      if(data)
      { 
        this.feed=data;
      for(let i=0;i<this.feed.length;i++)
      {
        this.investorService.getInvestorById(this.feed[i].idInvestor).subscribe(inv=>{this.feed[i].idInvestor=inv.enterprise})
      }}
   
      },error=>{}) 

      
    
  } 

  onSubmit()
  { 
   var f:Feedback=new Feedback;
   f.content=this.data;
   f.idInvestor=localStorage.getItem('idInvestor');
   f.date=(Date.now()).toString(); 
     
   this.investorService.addFeedback(this.idProject,f).subscribe(data=>{},error=>{}) 
   this.investorService.getInvestorById(f.idInvestor).subscribe(inv=>{f.idInvestor=inv.enterprise})//to change idinvestor to enterprise
   this.feed.push(f);
   


  } 

  sendMessage() {
    this.chatService.sendMessage(this.message,localStorage.getItem('id'),this.idChat).subscribe(data=>{ 
    var msg:Message=new Message;
    msg=data;
    

  },error=>{});
  this.message = ''; 

  
} 

existChatInvestor(idProject:string,idInvestor:string)
{    
    this.chatService.existChatInvestor(idProject,idInvestor).subscribe(data=>{   
      if(data[0])
      {  
    this.idChat=data[0]._id; 
    this.chat=data[0];  
    this.changeIdUserInvestor(this.chat);
    this.changeIdUserClient(this.chat)

      }

     

  },error=>{ 
  }) 

}

verifInvestor()
{
    var idInvestor=localStorage.getItem('idInvestor');
    this.investorService.verifInvestor(idInvestor,this.idProject).subscribe(data=>{ 
      if(data)
      { 
    this.verif=true;
      }
    },error=>{

    })

} 


changeIdUserInvestor(chat:Chat)
{
 for(let i=0;i<chat.idMessages.length;i++)
 {       
   this.investorService.getInvestorDetailsByUserId(chat.idMessages[i].idUser).subscribe(data=>{
    if(data.idInvestor)
    {   console.log(data.idInvestor.enterprise)
         { 
            chat.idMessages[i].detailsInvestor=data.idInvestor.enterprise 
         }
    }
   })   
 }
} 

changeIdUserClient(chat:Chat)
{    
    this.clientService.getClientDetailsByIdProject(chat.idProject).subscribe(data=>{  
      for(let i=0;i<chat.idMessages.length;i++) 
      { 
        this.investorService.getInvestorDetailsByUserId(chat.idMessages[i].idUser).subscribe(inv=>{ 
          if(!inv.idInvestor)
          {  
            chat.idMessages[i].detailsClient=data.firstName+""+data.lastName;
          }
        },error=>{})

      }





      
    })  
    

 

}

}
