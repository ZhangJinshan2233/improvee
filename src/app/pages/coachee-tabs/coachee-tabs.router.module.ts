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
        data: { allowUserType: [UserType.free, UserType.premium] },
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
            path: 'activeChallenges/food journal',
            loadChildren: '../coachee-tabs/timeline/timeline.module#TimelinePageModule',
          },
          // {
          //   path: 'chat',
          //   loadChildren: '../coachee-tabs/chat/chat.module#ChatPageModule',
          // }

        ]
      },
      {
        path: 'dashboard',
        data: { allowUserType: [UserType.free, UserType.premium] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/dashboard/dashboard.module#DashboardPageModule',
          },
          {
            path: 'indicator-details/:indicatorName',
            loadChildren: '../coachee-tabs/indicator-details/indicator-details.module#IndicatorDetailsPageModule'
          },
          {
            path: 'indicator-details/indicator-history/:indicatorName',
            loadChildren: '../coachee-tabs/indicator-history/indicator-history.module#IndicatorHistoryPageModule'
          },

        ]
      },
      {
        path: 'menu',
        data: { allowUserType: [UserType.free, UserType.premium] },
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
            path: 'profile/changePassword',
            loadChildren: '../coachee-tabs/change-password/change-password.module#ChangePasswordPageModule'
          }
        ]
      },
      {
        path: 'info',
        data: { allowUserType: [UserType.free, UserType.premium] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/info/info.module#InfoPageModule'
          }

        ]

      },
      {
        path: 'challenges',
        data: { allowUserType: [UserType.free, UserType.premium] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/challenges/challenges.module#ChallengesPageModule'
          },
          {
            path: ':challengeId',
            loadChildren: '../coachee-tabs/challenge-details/challenge-details.module#ChallengeDetailsPageModule'
          },
          {
            path: 'activeChallenges/food journal',
            loadChildren: '../coachee-tabs/timeline/timeline.module#TimelinePageModule',
          }
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
