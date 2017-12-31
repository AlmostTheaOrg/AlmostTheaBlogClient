import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private shouldBeVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public response () {
    this.shouldBeVisible = !this.shouldBeVisible;
  }
}
