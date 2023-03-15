

export type CoursePreview = {
  id: string;
  title: string;
  tags: string[];
  launchDate: Date;
  status: string; //"launched"
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: string[];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
};

export type Lesson = {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string; //"video"
  status: string; // "locked"/"unlocked"
  link: string;
  previewImageLink: string;
  meta: null; //???
};

export type CourseDetails = CoursePreview & {
  lessons: Lesson[];
  containsLockedLessons: boolean;
};
