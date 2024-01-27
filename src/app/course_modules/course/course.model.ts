import { Schema, model } from 'mongoose';
import { TCourse, CourseModel } from './course.interface';
const courseSchema = new Schema<TCourse, CourseModel>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [
      {
        name: { type: String, required: true },
        isDeleted: { type: Boolean, required: true },
      },
    ],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },

    durationInWeeks: { type: Number, required: false },
    details: {
      level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
      },
      description: { type: String, required: true },
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

courseSchema.statics.isCourseExists = async function (_id: string) {
  const existCourse = Course.findOne({ _id });
  return existCourse;
};

export const Course = model<TCourse, CourseModel>('Course', courseSchema);
