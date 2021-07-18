import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class AppFooterComponent implements OnInit {

  footerTitle: string = "@2021 Pet Store All Rights Reserved";


  constructor() { }

  ngOnInit() { }
}
