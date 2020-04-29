import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user';
import { Observable } from 'rxjs';
import { Project } from '../classes/project';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http:HttpClient) { } 
   
  
  login(role:string,user:User):Observable<any>
  { 
    
   var role=role; 
   var url="http://localhost:3000/auth/login/"+role;
   return this.http.post(url,user);

  }  

  sendForgotPassLink()
  {
  var bodyParams={email:localStorage.getItem("emailofForgotPass")}
  var url="http://localhost:3000/user/sendLinkForgotPass";
  return this.http.post(url,bodyParams);

  } 

  updatePass(e:string,pass:string) 
 {

   var user={email:e,password:pass}
   var url="http://localhost:3000/user/updatePass"; 
   return this.http.put(url,user);
 }  


 verifCode(code:string)
 { 
   var url="http://localhost:3000/user/verifCode"; 
   var codeObject={code:code,email:localStorage.getItem('emailofForgotPass')}
   return this.http.post(url,codeObject);
 } 

 activateUser(code:string):Observable<any>
 {  
   var url="http://localhost:3000/user/activation/"+code;
   return this.http.get(url);

 }

 getProjectById(idproject:string):Observable<Project>
 {       
   const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
   var url="http://localhost:3000/user/getProjectById/"+idproject;
   return this.http.get<Project>(url,{headers:header})

 }

}
