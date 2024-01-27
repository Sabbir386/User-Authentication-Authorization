import { Model, Types } from 'mongoose';

export type TTag = {
  name: string;
  isDeleted: boolean;
};

export type TCourseDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';

  description: string;
};
export type TCourse = {
  title: string;
  instructor: string;
  categoryId: string;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TCourseDetails;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

//custom instance method
export interface CourseModel extends Model<TCourse> {
  isCourseExists(id: string): Promise<TCourse | null>;
}
// export type CourseModel = Model<TCourse, Record<string, never>, CourseMethod>;
