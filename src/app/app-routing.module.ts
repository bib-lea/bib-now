import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './core/layouts/login-page/login-page.component';
import { DashboardPageComponent } from './core/layouts/dashboard-page/dashboard-page.component';
import { TimetablePageComponent } from './core/layouts/timetable-page/timetable-page.component';
import { SettingsPageComponent } from './core/layouts/settings-page/settings-page.component';
import { ForumComponent } from './core/components/forum/forum.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'timetable',
    component: TimetablePageComponent
  },
  {
    path: 'settings',
    component: SettingsPageComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
