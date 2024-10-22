import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-student', component: RegistrationComponent },
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
