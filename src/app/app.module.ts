import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from "./service/api.service";
@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
