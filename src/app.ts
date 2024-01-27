import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CourseRoutes } from './app/course_modules/course/course.routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { CategoryRoutes } from './app/course_modules/category/category.route';
import { ReviewRoutes } from './app/course_modules/review/review.routes';
import { UserRoutes } from './app/course_modules/user/user.route';
import { AuthRoutes } from './app/course_modules/auth/auth.route';
const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());

app.use('/api/', CourseRoutes);
app.use('/api/', CategoryRoutes);
app.use('/api/', ReviewRoutes);
app.use('/api/', UserRoutes);
app.use('/api/', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('App is Running!');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
