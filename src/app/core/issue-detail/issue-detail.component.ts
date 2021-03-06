import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IIssue } from 'src/app/shared/models/general.model';
import { CoreService, ISSUES_PATH } from 'src/app/shared/services/core.service';
import { AppState } from 'src/app/stores/global/app.reducer';
import * as fromRouterSelectors from '../../stores/router/router.selectors';
import * as fromUtils from '../../shared/general.utils';
import { Update } from '@ngrx/entity';
import { CrudService } from 'src/app/shared/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-core-issue-display-detail',
  templateUrl: 'issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  issue: IIssue | undefined = undefined;

  constructor(private router: Router, private route: ActivatedRoute, public cs: CoreService,
    private store: Store<AppState>, private crs: CrudService, public dialog: MatDialog) {

  }

  ngOnInit() {
    fromUtils.scrollToElementById("action-row");

    this.cs.getIssueBySelectedId$.pipe(
      takeUntil(this.compDest$)
    ).subscribe((res) => {
      this.issue = res;
    });

    this.route.paramMap.pipe(
      takeUntil(this.compDest$)
    ).subscribe((res) => {
      this.cs.setSelectedIssueId(res.get("id"));
    });

  }

  goBackToAll() {
    this.router.navigate(['/', 'pets'], {relativeTo: this.route});
  }

  openConfirmDialog(txt: string) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      minWidth: '300px',
      data: {actionName: (txt + " this pet ?")}
    });

    return dialogRef.afterClosed().pipe(
      takeUntil(this.compDest$)
    );
  }

  deleteIssue() {
    this.openConfirmDialog("delete").subscribe(
      (res) => {
        if (res && this.issue) {
          this.cs.deleteIssue(this.issue, ISSUES_PATH);
        }
      }
    )
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
