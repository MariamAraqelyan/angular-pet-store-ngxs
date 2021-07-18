import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IIssue } from '../../../../shared/models/general.model';
import { CoreService } from '../../../../shared/services/core.service';

@Component({
  selector: 'app-core-issue-display-issue',
  templateUrl: 'issue.component.html',
  styleUrls: ['./issue.component.css']
})

export class SingleIssueComponent implements OnInit {

  @Input()
  pet: IIssue | undefined;

  constructor(public cs: CoreService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onIssueClick() {
    if (this.pet?.id) {
      this.router.navigate(['../', this.pet?.id], {relativeTo: this.route});
    }
  }
}
