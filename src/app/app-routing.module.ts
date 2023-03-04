import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-employee' },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'edit-user', component: UserEditComponent },
  { path: 'user-list', component: UserListComponent }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
