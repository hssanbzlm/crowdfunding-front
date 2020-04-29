import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { VerifCodeComponent } from './verif-code/verif-code.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistreComponent } from './registre/registre.component';
import { ActivationComponent } from './activation/activation.component';
import { UserComponent } from './user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [  
    UpdatePasswordComponent,
    VerifCodeComponent,
    ForgotPasswordComponent,
    RegistreComponent,
    ActivationComponent,
    UserComponent,









  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
