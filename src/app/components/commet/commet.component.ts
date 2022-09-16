import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commet',
  templateUrl: './commet.component.html',
  styleUrls: ['./commet.component.css'],
})
export class CommetComponent implements OnInit {
  @Input() userName!: string;
  @Input() content!: string;

  constructor() {}

  ngOnInit(): void {}
}
