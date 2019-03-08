import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', pathMatch: 'full'
   },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule' 
  },
  { 
    path: 'login',
     loadChildren: './pages/login/login.module#LoginPageModule' 
    },
  { 
    path: 'register', 
    loadChildren: './pages/register/register.module#RegisterPageModule' 
  },
  { 
    path: 'slides', 
    loadChildren: './pages/slides/slides.module#SlidesPageModule' 
  },
  { 
    path: 'coachee-tabs', 
    loadChildren: './pages/coachee-tabs/coachee-tabs.module#CoacheeTabsPageModule' 
  },
  { 
    path: 'coach-tabs',
     loadChildren: './pages/coach-tabs/coach-tabs.module#CoachTabsPageModule' 
    },
  { 
    path: 'coach-admin-tabs', 
    loadChildren: './pages/coach-admin-tabs/coach-admin-tabs.module#CoachAdminTabsPageModule'
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
