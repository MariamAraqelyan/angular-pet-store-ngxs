import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { AllIssuesLandingComponent } from './all/all.component';
import { IssueDetailViewComponent } from './issue-detail/view/view.component';

export const routes: Routes = [
  { path: '', component: CoreComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllIssuesLandingComponent },
      { path: ':id', component: IssueDetailComponent,
          children: [
            { path: '', redirectTo: 'view', pathMatch: 'full' },
            { path: 'view', component: IssueDetailViewComponent }
          ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {}
