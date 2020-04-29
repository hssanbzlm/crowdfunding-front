import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { VerifCodeComponent } from './verif-code/verif-code.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { RoleGuardService } from './guard/role-guard.service';


const routes: Routes = [
  {path:"",component:LoginComponent}, 
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,data:{roles:["admin"]},canActivate:[AuthGuardService,RoleGuardService]},
  {path:"forgotPass",component:ForgotPasswordComponent,data:{roles:["admin"]},canActivate:[AuthGuardService,RoleGuardService]},
  {path:"updatePass",component:UpdatePasswordComponent,data:{roles:["admin"]},canActivate:[AuthGuardService,RoleGuardService]},
  {path:"verifCode",component:VerifCodeComponent,data:{roles:["admin"]},canActivate:[AuthGuardService,RoleGuardService]},
  {path:"**",component:LoginComponent},

];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
