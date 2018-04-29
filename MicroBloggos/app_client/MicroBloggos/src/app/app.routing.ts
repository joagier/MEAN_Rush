import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core/src/metadata/ng_module";
import { RegisterComponent } from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import {MembersComponent} from "./members/members.component";

export const AppRoutes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'members', component: MembersComponent }

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot((AppRoutes));
