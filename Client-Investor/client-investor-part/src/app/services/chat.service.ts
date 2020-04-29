import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, Subscriber } from 'rxjs';
import { Message } from '../classes/message';
import { Chat } from '../classes/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService { 
     url = 'http://localhost:3000';
     socket:SocketIOClient.Socket;   

  constructor(private http:HttpClient) { 
    this.socket = io(this.url);

   }  
   public existChatClient(idProject:string,idClient:string):Observable<Chat>
   { 
      const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
      var url="http://localhost:3000/chat/existChatClient/"+idProject+"/"+idClient;
      return this.http.get<Chat>(url,{headers:header});
   } 
   public existChatInvestor(idProject:string,idInvestor:string):Observable<any>
   { 

    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var url="http://localhost:3000/chat/existChatInvestor/"+idProject+"/"+idInvestor;
    return this.http.get(url,{headers:header});
    
   }

   public sendMessage(message,idUser,idChat):Observable<Message> {  

    const header= new HttpHeaders().set('Authorization',  "Bearer "+localStorage.getItem("token")); 
    var msg:Message=new Message;
    msg.message=message;
    msg.idUser=idUser;
    this.socket.emit('message', msg);  
    var url="http://localhost:3000/chat/addMessage/"+idChat;
    return this.http.post<Message>(url,msg,{headers:header})

} 

public getMessages(eventName:string):Observable<Message>{ 

     return new Observable((subscriber)=>{
        
      this.socket.on(eventName,(data)=>{

        subscriber.next(data);
      })
     })
  
} 




}
