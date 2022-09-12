import { ChapterData } from './../../models/course-data.model';
import { CourseData } from '../../models/course-data.model';
import { CourseDataService } from '../../services/course-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  public videoUrl: string = '';
  @Input() ChapterData!: ChapterData;

  video!: HTMLVideoElement;
  videoPlaying: boolean = false;
  percentage: number = 0;

  constructor(private courseDataService: CourseDataService) {}

  ngOnInit(): void {
    this.video = document.getElementsByTagName('video')[0];
    // this.videoUrl = this.ChapterData.url;
    // console.log(this.ChapterData.url);
  }

  togglevideo() {
    if (!this.videoPlaying) {
      this.video.play();
      this.videoPlaying = true;
    } else {
      this.video.pause();
      this.videoPlaying = false;
    }
  }

  onTimeUpdate() {
    this.percentage = (this.video.currentTime / this.video.duration) * 100;
  }
}
