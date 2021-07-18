import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { OnInitEffects } from "@ngrx/effects";
import { tap, concatMap, switchMap, map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { IIssue } from 'src/app/shared/models/general.model';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import * as fromIssueActions from './issue.actions';
import * as fromFirebaseUtils from '../../shared/services/firebase.utils';
import { Update } from '@ngrx/entity';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { FirebasePromiseError } from 'src/app/shared/models/firebase.model';
import * as firebase from 'firebase/app'
import { CoreService, ISSUES_PATH } from 'src/app/shared/services/core.service';
import { Action } from '@ngrx/store';


@Injectable()
export class IssueEffects implements OnInitEffects {

  constructor(public actions$: Actions, public ts: ToasterService,
    private cs: CrudService, private cos: CoreService) {
  }

  /**
   * Get all issues after this Effects is registered
   */
  ngrxOnInitEffects(): Action {
    return fromIssueActions.loadAllIssuesStart({url: ISSUES_PATH, searchTerm: null, showLoadMask: true});
  }

  onAddIssue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromIssueActions.createIssueStart),
      mergeMap((res) => {
        const issue: IIssue = res.data;
        const path: string = res.url;
        return this.cs.createDocument(issue, path).then(
          (res) => {
            const date = new Date().getTime();
            const successUpdate : Update<IIssue> = {
              id: issue.id,
              changes: {
                created: true,
                loading: false
              }
            };
            return fromIssueActions.createIssueSuccess({data: successUpdate, dateFinished: date, url: path});
          },
          (rej) => {
            console.log("err: ",rej);
            const authErrMsg = fromFirebaseUtils.getFirebaseErrorMsg(rej);
            return fromIssueActions.createIssueFailed({errMsg: authErrMsg, data: issue});
          }
        )
      })
    );
  });

  onSuccessfullyIssueAdded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromIssueActions.createIssueSuccess),
      mergeMap((res) => {
        return this.cs.updatePartialDocument<IIssue>(res.data, res.url).then(
          (res) => {
            return fromIssueActions.createIssueCleanupSuccess();
          },
          (rej) => {
            const authErrMsg = fromFirebaseUtils.getFirebaseErrorMsg(rej);
            return fromIssueActions.createIssueCleanupFailed({errorMsg: authErrMsg});
          }
        )
      })
    );
  });

  onSuccessfullyCleanup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromIssueActions.createIssueCleanupSuccess),
      map(() => {
        this.ts.getSnackbar("Pet created successfully");
        return fromIssueActions.loadAllIssuesStart({url: ISSUES_PATH, searchTerm: null, showLoadMask: false});
      })
    );
  });



  loadAllIssues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromIssueActions.loadAllIssuesStart),
      switchMap((res) => {
        const path = res.url;
        const searchTerm = res.searchTerm;
        return this.cs.readCollections<IIssue>(path, searchTerm).then(
          (res) => {
            let allIssues: IIssue[] = [];
            const currentTime: number = new Date().getTime();
            res.docs.forEach((d) => {
              allIssues.push(d.data());
            });
            return fromIssueActions.loadAllIssuesSuccess({data: allIssues, updatedTime: currentTime});
          },
          (rej) => {
            const authErrMsg = fromFirebaseUtils.getFirebaseErrorMsg(rej);
            return fromIssueActions.loadAllIssuesFailed({errMsg: authErrMsg});
          }
        )
      })
    );
  });

  openAIssueSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromIssueActions.openOneIssueSuccess),
      mergeMap((res) => {
        const d: IIssue = res.data;
        const update: Update<IIssue> = {
          id: d.id,
          changes: {
            loading: false
          }
        };
        return this.cs.updatePartialDocument<IIssue>(update, "pets/" + d.id).then(
          (res) => {
            this.ts.getSnackbar("Pet reopened successfully!");
          },
          (rej) => {
            const authErrMsg = fromFirebaseUtils.getFirebaseErrorMsg(rej);
            this.ts.getError("Error occured closing pet. " + authErrMsg);
          }
        )
      })
    );
  }, {dispatch: false});

  onFailedCleanup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromIssueActions.createIssueCleanupFailed),
      tap(() => {
        this.ts.getSnackbar("Error occured creating the pet");
      })
    );
  }, {dispatch: false});

}

export function removeLoadingOnFromUpdates(update: Update<IIssue>, id: string) {
  let updateWithOutLoadingOn: Update<IIssue> = {
    id: id,
    changes: {
      ...update.changes,
      loading: false
    }
  };
  return updateWithOutLoadingOn;
}


export const issuesEffects = [
  IssueEffects
]
