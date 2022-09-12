import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { ChapterData } from './../../models/course-data.model';

@Component({
  selector: 'app-progress-control',
  templateUrl: './progress-control.component.html',
  styleUrls: ['./progress-control.component.css'],
})
export class ProgressControlComponent implements OnInit {
  mode: ProgressSpinnerMode = 'determinate';
  @Input() chapterNumber!: number;
  @Input() percentage!: number;
  @Input() totalChaptersData!: ChapterData[];
  @Input() ChapterData!: ChapterData;
  @Output() setChapter = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  goToChapter(chapter: number) {
    this.setChapter.emit(chapter);
  }
}
