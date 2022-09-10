import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  getDoc,
  doc,
} from '@angular/fire/firestore';

import { InstructorData } from './../models/instructor-data.model';
import { VideoData, ChapterData } from '../models/course-data.model';

@Injectable({
  providedIn: 'root',
})
export class CourseDataService {
  constructor(private db: Firestore) {}

  async getCourseData(id: string): Promise<VideoData> {
    const docRef = doc(this.db, 'courses', id);
    const docSnap = await getDoc(docRef);
    const CourseExist = docSnap.exists();
    if (!CourseExist) {
      throw new Error("The Course doesn't exists");
    }
    const courseData = docSnap.data() as VideoData;
    return courseData;
  }

  async getInstructorData(id: string): Promise<InstructorData> {
    const docRef = doc(this.db, 'instructors', id);
    const docSnap = await getDoc(docRef);
    const instructorExist = docSnap.exists();
    if (!instructorExist) {
      throw new Error("The instructor doesn't exists");
    }
    const instructorData = docSnap.data() as InstructorData;
    return instructorData;
  }

  getChaptersData(courseId: string): Observable<ChapterData[]> {
    const collectionRef = collection(this.db, `courses/${courseId}/chapters`);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<
      ChapterData[]
    >;
  }
}
