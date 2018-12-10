import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-loader',
  templateUrl: './text-loader.component.html',
  styleUrls: ['./text-loader.component.css']
})

export class TextLoaderComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  constructor() { }

  ngOnInit() {
  }

}
