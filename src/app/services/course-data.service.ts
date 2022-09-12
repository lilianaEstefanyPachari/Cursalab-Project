import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  getDoc,
  doc,
  orderBy,
} from '@angular/fire/firestore';

import { InstructorData } from './../models/instructor-data.model';
import { CourseData, ChapterData } from '../models/course-data.model';

@Injectable({
  providedIn: 'root',
})
export class CourseDataService {
  constructor(private db: Firestore) {}

  async getCourseData(id: string): Promise<CourseData> {
    const docRef = doc(this.db, 'courses', id);
    const docSnap = await getDoc(docRef);
    const CourseExist = docSnap.exists();
    if (!CourseExist) {
      throw new Error("The Course doesn't exists");
    }
    const courseData = docSnap.data() as CourseData;
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

  getAllChaptersData(courseId: string): Observable<ChapterData[]> {
    const collectionRef = collection(this.db, `courses/${courseId}/chapters`);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<
      ChapterData[]
    >;
  }

  async getChapterData(courseId: string, idDoc: string): Promise<ChapterData> {
    const docRef = doc(this.db, `courses/${courseId}/chapters`, idDoc);
    const docSnap = await getDoc(docRef);
    const ChapterExist = docSnap.exists();
    if (!ChapterExist) {
      throw new Error("The Chapter doesn't exists");
    }
    const chapterData = docSnap.data() as ChapterData;
    return chapterData;
  }

  // getCurrentChapter(
  //   courseId: string,
  //   chapterNumber: number
  // ) {
  //   return this.getAllChaptersData(courseId).subscribe({
  //     next:(res) => {
  //       console.log('todos los cursos: ', res);
  //       const currentChapter= res.filter((e) => e.chapter === chapterNumber);
  //       console.log(currentChapter);
  //       return currentChapter;
  //     },
  //     error:(msg) => {
  //       console.log('Error: ', msg);
  //     },
  //   });
  // }
}
