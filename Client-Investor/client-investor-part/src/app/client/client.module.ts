import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client.component';
import { DetailsProjectComponent } from './details-project/details-project.component';
import {MatMenuModule,MatPaginatorModule} from '@angular/material';
import { CKEditorModule } from 'ckeditor4-angular';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';



@NgModule({
  declarations: [
    HomeComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    ClientComponent,
    DetailsProjectComponent,
    UpdateProfileComponent,
    UpdatePasswordComponent
    


  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatPaginatorModule,
    CKEditorModule
  ]
})
export class ClientModule { }
