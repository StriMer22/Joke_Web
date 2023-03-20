import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyJokesComponent } from './my-jokes/my-jokes.component';
import { JokesComponent } from './jokes/jokes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'jokes', pathMatch: 'full' },
  { path: 'jokes', component: JokesComponent },
  { path: 'my-jokes', component: MyJokesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
