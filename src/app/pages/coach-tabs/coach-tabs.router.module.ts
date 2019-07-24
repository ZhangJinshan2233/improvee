import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachTabsPage } from './coach-tabs.page';
import { UserType } from "../../model/userType";
const routes: Routes = [
  {
    path: '',
    component: CoachTabsPage,
    children: [
      {
        path: 'coach-home',
        data: { allowUserType: [UserType.coach] },
        children: [
          {
            path: '',
            loadChildren: '../coach-tabs/coach-home/coach-home.module#CoachHomePageModule',
          },
          {
            path: ':coacheeId',
            loadChildren: '../coach-tabs/coachee-detail/coachee-detail.module#CoacheeDetailPageModule'
          },
          {
            path: ':coacheeId/notes',
            loadChildren: '../coach-tabs/note/note.module#NotePageModule'
          },
          {
            path: ':coacheeId/indicators/:indicatorName',
            loadChildren: '../coachee-tabs/indicator-details/indicator-details.module#IndicatorDetailsPageModule'
          },
        ]
      },
      {
        path: 'profile',
        data: { allowUserType: [UserType.coach] },
        children:[
          {
            path:'',
            loadChildren: '../coach-tabs/coach-profile/coach-profile.module#CoachProfilePageModule',
          },
          {
            path:'changePassword',
            loadChildren: '../coachee-tabs/change-password/change-password.module#ChangePasswordPageModule'
          },
          
        ]
       
      },
      {
        path: '',
        redirectTo: '/coach/coach-home',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: '/coach/coach-home',
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoachTabsPageRoutingModule {
}
