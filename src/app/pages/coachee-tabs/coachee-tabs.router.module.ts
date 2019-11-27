import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoacheeTabsPage } from "./coachee-tabs.page";
import { UserType } from "../../model/userType";
const routes: Routes = [
  {
    path: '',
    component: CoacheeTabsPage,
    children: [
      {
        path: 'coachee-home',
        data: { allowUserType: [UserType.coachee] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/coachee-home/coachee-home.module#CoacheeHomePageModule',
          },
          {
            path: 'habitlist',
            loadChildren: '../coachee-tabs/habitlist/habitlist.module#HabitlistPageModule'

          },
          {
            path: 'habitlist/habit-list-items',
            loadChildren: '../coachee-tabs/habit-list-items/habit-list-items.module#HabitListItemsPageModule'
          },
          {
            path: 'activeChallenges/:challengeId',
            loadChildren: '../coachee-tabs/foodjournal-post/foodjournal-post.module#FoodjournalPostPageModule'
          },
          {
            path:'chat/:roomName',
             loadChildren: '../coachee-tabs/chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'dashboard',
        data: { allowUserType: [UserType.coachee] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/dashboard/dashboard.module#DashboardPageModule',
          },
          {
            path: 'indicator-records/:name',
            loadChildren: '../coachee-tabs/indicator-records/indicator-records.module#IndicatorRecordsPageModule'
          },

          {
            path: 'indicator-record-history/:name',
            loadChildren: '../coachee-tabs/indicator-record-history/indicator-record-history.module#IndicatorRecordHistoryPageModule'
          }

        ]
      },
      {
        path: 'menu',
        data: { allowUserType: [UserType.coachee] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/menu/menu.module#MenuPageModule',
          },
          {
            path: 'profile',
            loadChildren: '../coachee-tabs/profile/profile.module#ProfilePageModule',
          },
          {
            path: 'changePassword',
            loadChildren: '../coachee-tabs/change-password/change-password.module#ChangePasswordPageModule'
          }
        ]
      },
      {
        path: 'info',
        data: { allowUserType: [UserType.coachee] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/info/info.module#InfoPageModule'
          }

        ]

      },
      {
        path: 'challenges',
        data: { allowUserType: [UserType.coachee] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/challenges/challenges.module#ChallengesPageModule'
          },
          {
            path: 'activeChallenges/:challengeId',
            loadChildren: '../coachee-tabs/foodjournal-post/foodjournal-post.module#FoodjournalPostPageModule'
          },
          {
            path: 'challengeCategories/:challengeCategoryId',
            loadChildren: '../coachee-tabs/challenge-category-details/challenge-category-details.module#ChallengeCategoryDetailsPageModule'
          },
          {
            path: 'challengeCategories/:challengeCategoryId/histories',
            loadChildren: '../coachee-tabs/challenge-history/challenge-history.module#ChallengeHistoryPageModule'
          },
          {
            path: 'challengeCategories/:challengeCategoryId/histories/:challengeId',
            loadChildren: '../coachee-tabs/foodjournal-post/foodjournal-post.module#FoodjournalPostPageModule'
          },
        ]
      },
      {
        path: '',
        redirectTo: '/coachee/coachee-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/coachee/coachee-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoacheeTabsPageRoutingModule { }
