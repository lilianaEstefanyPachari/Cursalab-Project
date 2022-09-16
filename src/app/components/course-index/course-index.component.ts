import { Component, OnInit, Input } from '@angular/core';

import { CourseDataService } from './../../services/course-data.service';
import { ChapterData } from './../../models/course-data.model';

@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.css'],
})
export class CourseIndexComponent implements OnInit {
  @Input() percentage!: number;
  @Input() chapterNum!: number;
  @Input() chapterData!: ChapterData;
  @Input() totalChaptersData!: ChapterData[];
  chaptersCompleted: number = 0;

  constructor(private courseDataService: CourseDataService) {}

  ngOnInit(): void {
    this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.chapterNum);
  }

  getCurrentChapter(courseId: string, chapterNumber: number) {
    this.courseDataService.getAllChaptersData(courseId).subscribe({
      next: (totalChapters) => {
        const data: ChapterData[] = totalChapters.filter(
          (e) => e.completed === true
        );
        this.chaptersCompleted = data.length;
      },
      error: (error) => {
        throw new Error(error);
      },
    });
  }
}
