import { Types } from 'mongoose';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { JwtPayload } from 'jsonwebtoken';

const createCourseIntoDb = async (
  userdata: JwtPayload,
  courseData: TCourse,
) => {
  const newCourse = new Course(courseData);
  // Calculate duration in weeks
  const startDate = new Date(newCourse.startDate);
  const endDate = new Date(newCourse.endDate);
  const durationInWeeks = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );
  newCourse.durationInWeeks = durationInWeeks;
  if (userdata && userdata.userId) {
    newCourse.createdBy = userdata.userId;
  }
  newCourse.createdBy = userdata._id.toString();

  // Save course into database
  const savedCourse = await newCourse.save();
  //  OR
  // const result = await Course.create(savedCourse);
  return savedCourse;
};

interface CourseQueryParams {
  page?: number;
  limit?: number;
  sortBy?:
    | 'title'
    | 'price'
    | 'startDate'
    | 'endDate'
    | 'language'
    | 'durationInWeeks';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  startDate?: string;
  endDate?: string;
  language?: string;
  provider?: string;
  durationInWeeks?: number;
  level?: string;
}

const getCousresFromDb = async (
  queryParams: CourseQueryParams,
): Promise<any> => {
  try {
    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;

    const query: any = {};
    if (
      queryParams.minPrice !== undefined ||
      queryParams.maxPrice !== undefined
    ) {
      query.price = {};
      if (queryParams.minPrice !== undefined)
        query.price.$gte = queryParams.minPrice;
      if (queryParams.maxPrice !== undefined)
        query.price.$lte = queryParams.maxPrice;
    }

    if (queryParams.tags && queryParams.tags.length > 0) {
      query['tags.name'] = { $in: queryParams.tags };
    }

    if (queryParams.startDate !== undefined)
      query.startDate = { $gte: queryParams.startDate };
    if (queryParams.endDate !== undefined)
      query.endDate = { $lte: queryParams.endDate };
    if (queryParams.language !== undefined)
      query.language = queryParams.language;
    if (queryParams.provider !== undefined)
      query.provider = queryParams.provider;
    if (queryParams.durationInWeeks !== undefined)
      query.durationInWeeks = queryParams.durationInWeeks;
    if (queryParams.level !== undefined)
      query['details.level'] = queryParams.level;

    const total = await Course.countDocuments(query);

    const courses = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(
        queryParams.sortBy
          ? { [queryParams.sortBy]: queryParams.sortOrder === 'desc' ? -1 : 1 }
          : {},
      )
      .populate('createdBy');

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: courses,
    };
  } catch (error) {
    throw new Error('Invalid query parameters');
  }
};

const updatedCourseIntoDb = async (
  userdata: JwtPayload,
  courseId: string,
  data: TCourse,
) => {
  try {
    // Find the course by ID
    data.createdBy = userdata._id.toString();
    const course = await Course.findByIdAndUpdate({ _id: courseId }, data, {
      new: true,
    });

    if (!course) {
      // console.log(course);
      throw new Error('Course not found');
    }

    for (const [key, value] of Object.entries(data)) {
      if (key === 'tags') {
        // Handle tags separately to prevent mutation of non-primitive data
        if (course[key] instanceof Array && value instanceof Array) {
          course[key] = value.map(
            (tag: { name: string; isDeleted: boolean }) => ({ ...tag }),
          );
        }
      } else {
        (course as any)[key] = value;
      }
    }

    // Save the updated course
    const updatedCourse = (await course.save()).populate('createdBy');

    return updatedCourse;
  } catch (error) {
    throw new Error('Course not found');
  }
};

const getCourseWithReviewsFromDb = async (courseId: string) => {
  try {
    // Find the course by ID
    const course = await Course.aggregate([
      {
        $match: { _id: new Types.ObjectId(courseId) },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'courseId',
          as: 'reviews',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
    ]);

    if (!course || course.length === 0) {
      throw new Error('Course not found');
    }

    return { data: course };
  } catch (error) {
    throw new Error('Course not found');
  }
};
const getBestCourseOnAverageReview = async () => {
  try {
    const bestCourse = await Course.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'courseId',
          as: 'reviews',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          reviewCount: { $size: '$reviews' },
        },
      },
      {
        $sort: { averageRating: -1, reviewCount: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    if (!bestCourse || bestCourse.length === 0) {
      throw new Error('Course not found');
    }

    const [bestCourseData] = bestCourse;

    return {
      data: {
        course: bestCourseData,
      },
    };
  } catch (error) {
    throw new Error('Course not found');
  }
};
export const CourseServices = {
  createCourseIntoDb,
  getCousresFromDb,
  updatedCourseIntoDb,
  getCourseWithReviewsFromDb,
  getBestCourseOnAverageReview,
};
