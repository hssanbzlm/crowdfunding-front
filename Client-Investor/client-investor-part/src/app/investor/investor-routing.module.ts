import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorHomeComponent } from './investor-home/investor-home.component';
import { InvestorComponent } from './investor.component';
import { DetailsProjectComponent } from './details-project/details-project.component';
import{UpdatepasswordComponent} from './updatepassword/updatepassword.component'
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { RoleGuardService } from '../guards/role-guard.service';

const routes: Routes = [  
  {path:"",component:InvestorComponent,data: {roles: ['investor']},canActivate:[AuthGuardService,RoleGuardService],children:[ 
    
    {path:"home",component:InvestorHomeComponent},
    {path:"detailsProject/:idProject",component:DetailsProjectComponent},
    {path:"updatePassword",component:UpdatepasswordComponent},
    {path:"updateProfile",component:UpdateProfileComponent},
    {path:'**',component:InvestorHomeComponent}

  ]}
   
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }
