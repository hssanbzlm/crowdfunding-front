import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { HomeComponent } from './home/home.component';
import { DetailsProjectComponent } from './details-project/details-project.component';
import { ClientComponent } from './client.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdatePasswordComponent } from '../client/update-password/update-password.component'; 
import { AuthGuardService } from '../guards/auth-guard.service';
import { RoleGuardService } from '../guards/role-guard.service';



const routes: Routes = [ 
   
  {path:"",component:ClientComponent,data: {roles: ['client']},canActivate:[AuthGuardService,RoleGuardService],children:[
    
    {path:"home",component:HomeComponent},
    {path:"addProject",component:AddProjectComponent},
    {path:"updateProject/:idProject",component:UpdateProjectComponent},
    {path:"detailsProject/:idProject",component:DetailsProjectComponent},
    {path:"updateProfile/:idClient",component:UpdateProfileComponent},
    {path:"updatePassword",component:UpdatePasswordComponent},
    {path:"**",component:HomeComponent}
    

  ]}
   
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
