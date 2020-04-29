import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../classes/client';
import { Observable } from 'rxjs';
import { Project } from '../classes/project';

@Injectable({
  providedIn: 'root'
})
export class ClientServicesService {

  constructor(private http:HttpClient) { }


  registreClient(client:Client):Observable<any>
  {  
    console.log(client.birthday);
    var url="http://localhost:3000/client/registre"; 
    return this.http.post(url,client);

  } 


  myProjects():Observable<Project[]>
  {       
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/client/myprojects/"+localStorage.getItem('id');
    return this.http.get<Project[]>(url,{headers:header});
  } 

  addProject(p:Project)
  { 
    
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/client/addProject/"+localStorage.getItem('id');
    return this.http.post(url,p,{headers:header});

  }  


  

  updateProject(p:Project)
  { 
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/client/updateProject/"+p._id;
    return this.http.put(url,p,{headers:header});
  } 
   
  deleteProject(idProject:string)
  {
      var url="http://localhost:3000/client/deleteProject"+localStorage.getItem('id')+"/"+idProject;
      this.http.delete(url);


  }

  getClientDetails(idClient:string):Observable<Client>
  {      
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/client/details/"+idClient;
    return this.http.get<Client>(url,{headers:header});

  } 

  updateClient(cl:Client)
  {  
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/client/update/"+cl._id;
    return this.http.post(url,cl,{headers:header});

  } 

  updateClientImage(idClient:string,formData:FormData)
  {  
    console.log(formData.get('avatar'));
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/client/uploadImg/"+idClient; 
    return this.http.post(url,formData,{headers:header});
  } 

  getClientImg(idClient:string):Observable<Client>
  {   
     const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
     var url="http://localhost:3000/client/clientImg/"+idClient;
     return this.http.get<Client>(url,{headers:header});

  }  

  getClientDetailsByIdProject(idProject:string):Observable<Client>
  {  
    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/client/getClientByIdProject/"+idProject;
    return this.http.get<Client>(url,{headers:header})


  }
 


}
