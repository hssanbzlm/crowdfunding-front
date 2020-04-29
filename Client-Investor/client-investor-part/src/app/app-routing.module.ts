import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';



const routes: Routes = [  
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"user",loadChildren:"./user/user.module#UserModule"},
  {path:"client",loadChildren:"./client/client.module#ClientModule"},
  {path:"investor",loadChildren:"./investor/investor.module#InvestorModule"}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
