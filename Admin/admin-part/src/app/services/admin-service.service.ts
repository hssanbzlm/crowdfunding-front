import { Injectable } from '@angular/core';
import  {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Admin} from '../class/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { } 

 loginAdmin(admin:Admin):Observable<any>
 { var user="admin"; 
   var url="http://localhost:3000/auth/login/"+user;
   return this.http.post(url,admin);
 } 

 homeAdmin()
 {
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/admin/home";
    return this.http.get(url,{headers:header});
 } 

 sendForgotPassLink()
 { 
  var bodyParams={email:localStorage.getItem("emailofForgotPass")}
  var url="http://localhost:3000/user/sendLinkForgotPass";
  return this.http.post(url,bodyParams);

 } 


 updatePass(pass:string)
 {  var e:string; 
   if(localStorage.getItem('emailofForgotPass'))
   e=localStorage.getItem('emailofForgotPass')
   else 
   e=localStorage.getItem('email');
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

 getDash():Observable<any>
 {  
  const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
  var url="http://localhost:3000/admin/dashboard";
  return this.http.get(url,{headers:header});
 }
  



}
