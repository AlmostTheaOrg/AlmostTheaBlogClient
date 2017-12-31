import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public shouldBeVisible = false;

  constructor() { }

  ngOnInit() {
  }

  public response () {
    this.shouldBeVisible = !this.shouldBeVisible;
  }
}
