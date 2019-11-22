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
        path: 'home',
        data: { allowUserType: [UserType.coach] },
        children: [
          {
            path: '',
            loadChildren: '../coach-tabs/coach-home/coach-home.module#CoachHomePageModule',
          },
          {
            path: ':coacheeId',
            children: [
              {
                path: '',
                loadChildren: '../coach-tabs/coachee-detail/coachee-detail.module#CoacheeDetailPageModule'
              },
              {
                path: 'notes',
                loadChildren: '../coach-tabs/note/note.module#NotePageModule'
              },
              {
                path: 'indicators/:name',
                loadChildren: '../coachee-tabs/indicator-records/indicator-records.module#IndicatorRecordsPageModule'
              },
              {
                path: 'indicators/history/:name',
                loadChildren: '../coachee-tabs/indicator-record-history/indicator-record-history.module#IndicatorRecordHistoryPageModule'
              },
              {
                path: 'challenges/foodJournal/:challengeId',
                loadChildren: '../coachee-tabs/foodjournal-post/foodjournal-post.module#FoodjournalPostPageModule'
              },
              
            ]
          },


          {
            path: 'chat/:coacheeId',
            loadChildren: '../coach-tabs/chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'profile',
        data: { allowUserType: [UserType.coach] },
        children: [
          {
            path: '',
            loadChildren: '../coach-tabs/coach-profile/coach-profile.module#CoachProfilePageModule',
          },
          {
            path: 'changePassword',
            loadChildren: '../coachee-tabs/change-password/change-password.module#ChangePasswordPageModule'
          },

        ]

      },
      {
        path: '',
        redirectTo: '/coach/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/coach/home',
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
