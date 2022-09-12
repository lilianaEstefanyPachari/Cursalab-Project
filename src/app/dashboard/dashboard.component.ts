import { Component, OnInit } from '@angular/core';

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

  constructor(private courseDataService: CourseDataService) {}

  ngOnInit(): void {
    this.getCurse('68H8A62KBJD5wxOuVeGv');
    this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
  }

  async getCurse(docId: string) {
    try {
      const courseData = await this.courseDataService.getCourseData(docId);
      // console.log(courseData);
      this.courseTitle = courseData.title;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
  //el objeto con data del current chapter
  getCurrentChapter(courseId: string, chapterNumber: number) {
    this.courseDataService.getAllChaptersData(courseId).subscribe({
      next: (totalChapters) => {
        // console.log('todos los capitulos: ', res);
        this.courseChapters = totalChapters;
        const data: ChapterData[] = totalChapters.filter(
          (e) => e.chapter === chapterNumber
        );
        this.currentChapterData = { ...data[0] };
        this.courseInfo = this.currentChapterData.notes;
        // console.log(this.currentChapter);
      },
      error: (error) => {
        throw new Error(error);
        // console.log('Error: ', error);
      },
    });
  }

  setNextChapter() {
    if (this.controlChapter < this.courseChapters.length) {
      this.controlChapter++;
    }
    this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
  }
  setBackChapter() {
    if (this.controlChapter > 1) {
      this.controlChapter--;
    }
    this.getCurrentChapter('68H8A62KBJD5wxOuVeGv', this.controlChapter);
  }

  // setCourseInfo(displayInfo: string) {
  //   switch (displayInfo) {
  //     case 'notes':
  //       this.courseInfo = this.currentChapterData.notes;
  //       break;
  //     case 'quiz':
  //       this.courseInfo = this.currentChapterData.quiz;
  //       break;
  //     case 'resources':
  //       this.courseInfo = this.currentChapterData.resources;
  //       break;
  //   }
  // }
}
