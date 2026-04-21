import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end-of-day-detail',
  templateUrl: './end-of-day-detail.component.html',
  styleUrls: ['./end-of-day-detail.component.css']
})
export class EndOfDayDetailComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
