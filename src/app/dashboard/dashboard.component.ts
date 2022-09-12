import { Component, OnInit, Input } from '@angular/core';

import { CourseDataService } from './../services/course-data.service';
import { ChapterData } from './../models/course-data.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  courseTitle!: string;
  courseChapters!: ChapterData[];
  currentChapterData!: ChapterData;
  controlChapter: number = 1;
  courseInfo: string = '';
  percentageAdvance: number = 0;

  constructor(private courseDataService: CourseDataService) {}

  ngOnInit(): void {
    this.getCurse('68H8A62KBJD5wxOuVeGv');
    this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
  }

  async getCurse(docId: string) {
    try {
      const courseData = await this.courseDataService.getCourseData(docId);
      this.courseTitle = courseData.title;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  getCurrentChapter(courseId: string, chapterNumber: number) {
    this.courseDataService.getAllChaptersData(courseId).subscribe({
      next: (totalChapters) => {
        this.courseChapters = totalChapters.sort(
          (a, b) => a.chapter - b.chapter
        );
        const data: ChapterData[] = totalChapters.filter(
          (e) => e.chapter === chapterNumber
        );
        this.currentChapterData = { ...data[0] };
        this.courseInfo = this.currentChapterData.notes;
      },
      error: (error) => {
        throw new Error(error);
      },
    });
  }

  setNextChapter() {
    if (this.controlChapter < this.courseChapters.length) {
      if (this.currentChapterData.completed) {
        this.controlChapter++;
      }
    }
    this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
  }
  setBackChapter() {
    if (this.controlChapter > 1) {
      this.controlChapter--;
    }
    this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
  }

  getAdvance(percentage: number) {
    this.percentageAdvance = percentage;
  }

  setChapter(chapter: number) {
    if (chapter < 2) {
      this.controlChapter = 1;
      this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
    } else if (chapter >= 2 && this.courseChapters[chapter - 2].completed) {
      this.controlChapter = chapter;
      this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
    }
  }
}
