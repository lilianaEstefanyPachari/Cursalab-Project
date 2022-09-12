export interface CourseData {
  title: string;
  instructor: string;
}

export interface ChapterData {
  id?: string;
  chapter: number;
  title: string;
  url: string;
  notes: string;
  quiz: string;
  resources: string;
}
