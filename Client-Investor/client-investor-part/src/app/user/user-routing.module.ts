import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { VerifCodeComponent } from './verif-code/verif-code.component';
import { RegistreComponent } from './registre/registre.component';
import { ActivationComponent } from './activation/activation.component';
import { UserComponent } from './user.component';


const routes: Routes = [  
  {path:"",component:UserComponent,children:[

    {path:"forgotPass",component:ForgotPasswordComponent},
    {path:"updatePass",component:UpdatePasswordComponent},
    {path:"verifCode",component:VerifCodeComponent},
    {path:"registre",component:RegistreComponent},
    {path:"activation/:code",component:ActivationComponent},
    
  
  

  ]},  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
