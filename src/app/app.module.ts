import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {PostifyService} from './Services/postify.service';
import {TokenService} from './Services/token.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthService} from './Services/auth.service';
import { HomeComponent } from './components/home/home.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { WeatherMapComponent } from './components/weather-map/weather-map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    WeatherMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [PostifyService, TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
