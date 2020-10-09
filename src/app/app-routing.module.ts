import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from './common/services/user.service';
import { UserComponent } from './components/user/user.component'

const routes: Routes = [
  {
    path: 'usuarios',
    component: UserComponent
  },

  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    UserService
  ]
})
export class AppRoutingModule { }
