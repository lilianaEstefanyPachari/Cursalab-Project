import { VideoData } from '../../models/course-data.model';
import { CourseDataService } from '../../services/course-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  constructor(private courseDataService: CourseDataService) {}

  ngOnInit(): void {
    this.getVideo('68H8A62KBJD5wxOuVeGv');
  }

  async getVideo(docId: string) {
    try {
      const courseData = await this.courseDataService.getCourseData(docId);
      console.log(courseData);
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
