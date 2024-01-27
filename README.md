## Live Link :https://assignment-4-ten-phi.vercel.app/

### Technology :

TypeScript,node.js,express.js

### Database:

mongoDb

### Libray:

mongoose

## Api Documentaion link : https://documenter.getpostman.com/view/31266783/2s9YsDkEq9

## Api Endpoint :

# User Registration

```
https://assignment-4-ten-phi.vercel.app/api/auth/register

{
  "username": "sabbir ahmedUser",
  "email": "john.sabbir@examples.com",
  "password": "password123"
}

```

# Login admin

```
https://assignment-4-ten-phi.vercel.app/api/auth/login

{
    "username":"sabbir",
    "password":"password123"
}

```

# Login user

```
https://assignment-4-ten-phi.vercel.app/api/auth/login

{
    "username":"rony",
    "password":"password123"
}

```

# Change Password

```
https://assignment-4-ten-phi.vercel.app/api/auth/change-password

{
    "oldPassword":"securepassword123456",
    "newPassword":"securepassword123456999"
}

```

# create course

```
https://assignment-4-ten-phi.vercel.app/api/courses (Only Admin)
{
    "title":"c++",
    "instructor": "Jane Doe",
    "categoryId": "123456789012345678901234",
    "price": 49.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": false
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-01-15",
    "endDate":"2023-03-14",
    "language": "English",
    "provider": "Tech Academy",
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

# get Paginated and Filtered Courses

```
https://assignment-4-ten-phi.vercel.app/api/courses


```

# update a course

```
https://assignment-4-ten-phi.vercel.app/api/courses/6583fb1141f0eb6ba1514ce0 (only admin update)

sample data:
{
    "price": 59.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false},
        {"name": "JavaScript", "isDeleted": false}
    ],
    "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
    }
}

```

# get course with reviews

```
https://assignment-4-ten-phi.vercel.app/api/courses/6589751a14393505f44ae34b/reviews

```

# get best course on average rating

```
https://assignment-4-ten-phi.vercel.app/api/course/best


```

# create a review

```
https://assignment-4-ten-phi.vercel.app/api/reviews (user can do reviews)

{
    "courseId": "6589751a14393505f44ae34b",
    "rating": 4,
    "review": " awesome very course!"
}

```

# create a categories

```
https://assignment-4-ten-phi.vercel.app/api/categories (Only Admin can do this)
{
    "name": "web phython"
}

```

# get categories

```
https://assignment-4-ten-phi.vercel.app/api/categories

```
