import { LoginComponent } from './login/login.component';
import { JokesComponent } from './jokes/jokes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyJokesComponent } from './my-jokes/my-jokes.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';
import { JokeCardComponent } from './core/components/joke-card/joke-card.component';
import { AddJokeComponent } from './core/components/add-joke/add-joke.component';
import { RegisterComponent } from './register/register.component';

import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { PasswordModule } from 'primeng/password';

const PRIMENG_MODULES = [
  PasswordModule,
  SkeletonModule,
  DropdownModule,
  CardModule,
  ButtonModule,
  InputTextareaModule,
  InputTextModule,
  ConfirmDialogModule,
  ToastModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MyJokesComponent,
    JokesComponent,
    LoginComponent,
    JokeCardComponent,
    AddJokeComponent,
    RegisterComponent,
  ],
  imports: [
    PRIMENG_MODULES,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
