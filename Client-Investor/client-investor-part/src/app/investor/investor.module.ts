import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorRoutingModule } from './investor-routing.module';
import { InvestorHomeComponent } from './investor-home/investor-home.component';
import { InvestorComponent } from './investor.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsProjectComponent } from './details-project/details-project.component';
import {MatMenuModule,MatPaginatorModule} from '@angular/material';
import { CKEditorModule } from 'ckeditor4-angular';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


@NgModule({
  declarations: [
    InvestorHomeComponent,
    InvestorComponent,
    DetailsProjectComponent,
    UpdatepasswordComponent,
    UpdateProfileComponent,
  ],
  imports: [
    CommonModule,
    InvestorRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatPaginatorModule,
    CKEditorModule
  ]
})
export class InvestorModule { }
