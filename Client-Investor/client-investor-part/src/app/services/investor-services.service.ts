import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investor } from '../classes/investor';
import { Project } from '../classes/project';
import { Feedback } from '../classes/feedback';
import { UserServicesService } from './user-services.service';

@Injectable({
  providedIn: 'root'
})
export class InvestorServicesService {

  constructor(private http:HttpClient,private userservice:UserServicesService) { } 


  registreInvestor(investor:Investor):Observable<any>
  {  
    var url="http://localhost:3000/investor/registre"; 
    return this.http.post(url,investor);

  } 

  allProject():Observable<Project[]>
  {   
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/investor/allProjects";
    return this.http.get<Project[]>(url,{headers:header});

  } 

  getFeedOfProject(idProject:string):Observable<Feedback[]>
  {
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/feed/feedback/"+idProject;
    return this.http.get<Feedback[]>(url,{headers:header});

  }
   
  addFeedback(idProject:string,feed:Feedback)
  {   
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
     var url="http://localhost:3000/feed/addFeedback/"+idProject;
     return this.http.post(url,feed,{headers:header});
  } 

  invest(idInvestor:string,project:Project,investment:number)
  {   
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
      project.totalFund=project.totalFund+investment ; 
      var url="http://localhost:3000/investor/invest/"+idInvestor+"/"+project._id;
      return this.http.post(url,project,{headers:header});

  } 

  verifInvestor(idInvestor:string,idProject:string):Observable<Investor>
  {   
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/investor/verifInvest/"+idInvestor+"/"+idProject;
    return this.http.get<Investor>(url,{headers:header});


  } 

  getInvestorDetailsByUserId(idUser:string):Observable<any>
{   
  const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 

  var url="http://localhost:3000/investor/getInvestorByIdUser/"+idUser;
  return this.http.get<any>(url,{headers:header});

} 

getInvestorById(idInvestor:string):Observable<Investor>
{  
  const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
  var url="http://localhost:3000/investor/getInvestorById/"+idInvestor;
  return this.http.get<Investor>(url,{headers:header});

} 

updateInvestor(investor:Investor,idInvestor:string)
{  
  const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
  var url="http://localhost:3000/investor/updateInvestor/"+idInvestor;
  return this.http.put(url,investor,{headers:header});

}



}
