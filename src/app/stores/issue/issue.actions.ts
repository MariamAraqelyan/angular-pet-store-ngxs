import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IIssue } from 'src/app/shared/models/general.model';

const CREATE_ISSUE_START: string = "[Issue Creator/API] Create new issue start";
const CREATE_ISSUE_SUCCESS: string = "[Issue Creator/API] Successfully created a new issue";
const CREATE_ISSUE_FAILURE: string = "[Issue Creator/API] Create new issue failed";

const CREATE_ISSUE_CLEANUP_SUCCESS: string = "[Issue Creator/API] Clean up and set loading to false success";
const CREATE_ISSUE_CLEANUP_FAILURE: string = "[Issue Creator/API] Clean up and set loading to false failed";

const LOAD_ALL_ISSUES_START: string = "[Issue Display/API] Load all issues start";
const LOAD_ALL_ISSUES_SUCCESS: string = "[Issue Display/API] Load all issues success";
const LOAD_ALL_ISSUES_FAILED: string = "[Issue Display/API] Load all issues failed";

const CLOSE_ISSUE_START: string = "[Issue Detail/API] Close a pet start";
const CLOSE_ISSUE_SUCCESS: string = "[Issue Detail/API] Successfully closed a pet";
const CLOSE_ISSUE_FAILED: string = "[Issue Detail/API] Close a pet faialed";

const OPEN_ISSUE_SUCCESS: string = "[Issue Detail/API] Successfully opened a pet";
const OPEN_ISSUE_FAILED: string = "[Issue Detail/API] Open a pet faialed";

const SELECT_ISSUE: string = "[Issue Detail/View Edit] Set selected issue ID";

const TOGGLE_ISSUE_EDIT: string = "[Issue Detail/Toggle Edit] Toggle issue edit mode";

const DELETE_ISSUE_START: string = "[Issue Detail/Delete] Delete an issue start";
const DELETE_ISSUE_SUCCESS: string = "[Issue Detail/Delete] Delete an issue success";
const DELETE_ISSUE_FAILED: string = "[Issue Detail/Delete] Delete an issue failed";

const UPDATE_ISSUE_START: string = "[Issue Detail/Edit] Edit issue start";
const UPDATE_ISSUE_SUCCESS: string = "[Issue Detail/Edit] Edit issue success";
const UPDATE_ISSUE_FAILURE: string = "[Issue Detail/Edit] Edit issue failed";

const RELOAD_ALL_ISSUES_REQUEST: string = "[Issue All/Refresh] Request Refresh All Issues";
const USER_CURRENT_SEARCH_TERM: string = "[Issue Search/Input] User entered search term";

export const createIssueStart = createAction(
  CREATE_ISSUE_START,
  props<{data: IIssue, url: string}>()
)

export const closeOneIssueStart = createAction(
  CLOSE_ISSUE_START,
  props<{data: IIssue}>()
)

export const createIssueSuccess = createAction(
  CREATE_ISSUE_SUCCESS,
  props<{data: Update<IIssue>, dateFinished: number, url: string}>()
)

export const createIssueFailed = createAction(
  CREATE_ISSUE_FAILURE,
  props<{data: IIssue, errMsg: string}>()
)

export const createIssueCleanupSuccess = createAction(
  CREATE_ISSUE_CLEANUP_SUCCESS
)

export const createIssueCleanupFailed = createAction(
  CREATE_ISSUE_CLEANUP_FAILURE,
  props<{errorMsg: string}>()
)

export const loadAllIssuesStart = createAction(
  LOAD_ALL_ISSUES_START,
  props<{url: string, searchTerm: string | null, showLoadMask: boolean}>()
)

export const loadAllIssuesSuccess = createAction(
  LOAD_ALL_ISSUES_SUCCESS,
  props<{data: IIssue[], updatedTime: number}>()
)

export const loadAllIssuesFailed = createAction(
  LOAD_ALL_ISSUES_FAILED,
  props<{errMsg: string}>()
)

export const closeOneIssueSuccess = createAction(
  CLOSE_ISSUE_SUCCESS,
  props<{data: IIssue}>()
)

export const closeOneIssueFailure = createAction(
  CLOSE_ISSUE_FAILED,
  props<{data: IIssue, errMsg: string}>()
)

export const openOneIssueSuccess = createAction(
  OPEN_ISSUE_SUCCESS,
  props<{data: IIssue}>()
)

export const openOneIssueFailure = createAction(
  OPEN_ISSUE_FAILED,
  props<{data: IIssue, errMsg: string}>()
)

export const setSelectedIssueId = createAction(
  SELECT_ISSUE,
  props<{issueId: string | null}>()
)

export const deleteIssueStart = createAction(
  DELETE_ISSUE_START,
  props<{issue: IIssue, url: string}>()
)

export const deleteIssueSuccess = createAction(
  DELETE_ISSUE_SUCCESS,
  props<{issue: IIssue}>()
)

export const deleteIssueFailed = createAction(
  DELETE_ISSUE_FAILED,
  props<{issue: IIssue, errMsg: string}>()
)

export const editIssueStart = createAction(
  UPDATE_ISSUE_START,
  props<{updates: Update<IIssue>, url: string, issue: IIssue}>()
)

export const editIssueSuccess = createAction(
  UPDATE_ISSUE_SUCCESS,
  props<{issue: Update<IIssue>}>()
)

export const editIssueFailed = createAction(
  UPDATE_ISSUE_FAILURE,
  props<{issue: IIssue, errMsg: string}>()
)

export const refreshAllIssues = createAction(
  RELOAD_ALL_ISSUES_REQUEST,
  props<{time: number}>()
)
