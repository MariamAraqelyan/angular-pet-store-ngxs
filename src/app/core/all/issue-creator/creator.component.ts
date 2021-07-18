import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IIssue} from 'src/app/shared/models/general.model';
import { CoreService } from 'src/app/shared/services/core.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import * as gUtils from '../../../shared/general.utils';
import * as fromValidators from '../../../shared/form-validators/general-form.validator';
import { Update } from '@ngrx/entity';

const ISSUE_PATH: string = "issues";

@Component({
  selector: 'app-core-issue-creator',
  templateUrl: 'creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class IssueCreatorComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.changesSaved) {
      return true;
    }
    return false;
  }

  @Input()
  issueData: IIssue | undefined = undefined;

  @ViewChild("titleInput")
  titleInput?: ElementRef;

  issueFg: FormGroup | undefined;

  get titleValue(): FormControl | undefined {
    if (this.issueFg && this.issueFg.get('title')) {
      return <FormControl>this.issueFg.get("title");
    }
    return undefined;
  }

  get changesSaved(): boolean | undefined {
    return this.issueFg?.pristine;
  }

  constructor(private fb: FormBuilder, private cs: CrudService, private router: Router,
    private route: ActivatedRoute, public cos: CoreService) {
      this.issueFg = undefined;
      this.createInitIssueFg();
  }

  ngOnChanges() {
    this.createIssueFg(this.issueData);
  }

  ngOnInit() {
    alert('For Get(or Create) Any Data, I used my api, which I have. And In that api I dont have image key.');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.titleInput?.nativeElement.focus();
    },300);
  }

  createIssueFg(value?: IIssue) {
    if (value) {
      this.issueFg!.patchValue({
        ...value
      });
    }
  }

  onFormReset() {
    if (this.issueData) {
      this.createIssueFg(this.issueData);
    }
  }

  onSubmit() {
    let issueVal: IIssue = this.issueFg?.value;

    if (this.issueFg?.valid) {
        const data = this.createFullIssueObject(issueVal);
        const docPath: string = ISSUE_PATH + "/" + data.id;
        this.cs.addNewIssue(data, docPath);
        this.onIssueCancel();
    }
    this.issueFg?.markAsPristine();
  }

  createFullIssueObject(i: IIssue): IIssue {
    return {
      ...i,
      dateCreated: new Date().getTime(),
      id: this.cs.createDocId(),
      open: true,
      author: "Tester",
      reactions: 0,

      created: false,
      loading: true,
      issueNumber: this.cos.currentIssueCounter
    };
  }

  onIssueCancel() {
    this.router.navigate(['./']);
  }

  createInitIssueFg() {
    this.issueFg = this.fb.group({
      title: gUtils.createFormControl2(null, false, [fromValidators.customRequiredValidator, fromValidators.custom256CountValidator]),
      description: gUtils.createFormControl2(null, false, [fromValidators.customRequiredValidator]),
    });
  }

  ngOnDestroy() {
  }
}
