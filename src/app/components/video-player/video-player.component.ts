import { ChapterData } from './../../models/course-data.model';
import { CourseDataService } from '../../services/course-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() ChapterData!: ChapterData | undefined;

  video!: HTMLVideoElement;
  videoPlaying: boolean = false;
  percentage: number = 0;
  @Output() percentageToParent = new EventEmitter<number>();

  constructor(private courseDataService: CourseDataService) {}

  ngOnInit(): void {
    this.video = document.getElementsByTagName('video')[0];
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

  onTimeUpdate(): void {
    this.percentage = (this.video.currentTime / this.video.duration) * 100;
    this.percentageToParent.emit(this.percentage);
    this.setCourseCompleted();
  }

  setCourseCompleted() {
    if (this.percentage === 100 && this.ChapterData) {
      this.courseDataService.updateChapterAdvance(
        '68H8A62KBJD5wxOuVeGv',
        this.ChapterData.id,
        true
      );
    }
  }
}
