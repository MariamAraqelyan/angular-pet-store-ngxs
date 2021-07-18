import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IIssue} from '../../../../shared/models/general.model';
import {CoreService} from '../../../../shared/services/core.service';
import {MatDialog} from '@angular/material/dialog';
import {IssueDisplayComponent} from '../display.component';

@Component({
  selector: 'app-core-issue-display-issue',
  templateUrl: 'issue.component.html',
  styleUrls: ['./issue.component.css']
})

export class SingleIssueComponent implements OnInit {

  @Input()
  pet: IIssue | undefined;

  constructor(public cs: CoreService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,) {
  }

  ngOnInit() {
  }

  onIssueClick(): void {
    if (this.pet?.id) {
      this.router.navigate(['../', this.pet?.id], {relativeTo: this.route});
    }
  }

  onIssueClickByModal(): void {
    alert('You need open new component in that structor. I put Logic For Open Modal, please see in code');
    // NewComponent For open With Modal
    // this.dialog.open(NewComponent, {
    //   width: '90vw',
    //   maxWidth: '650px',
    //   data: {}
    // });
  }
}
