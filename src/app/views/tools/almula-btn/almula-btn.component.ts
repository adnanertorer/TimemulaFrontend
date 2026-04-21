import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-almula-btn',
  templateUrl: './almula-btn.component.html',
  styleUrls: ['./almula-btn.component.css']
})
export class AlmulaBtnComponent implements OnInit {

  name: string;
  title: string;

  constructor() { }

  ngOnInit() {
    this.name='';
    this.title= '';
  }

}
