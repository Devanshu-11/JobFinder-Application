INTRODUCTION:
-------------
        • Implemented secure login/register with bcryptjs for password hashing and elevated security using JSON web tokens.
        • Developed User and Jobs APIs for secure profile management, posting, updating, deleting, and data retrieval.
        • Enable users to filter jobs based on various criteria, such as location, industry, or job type, and implement sorting options to customize the display of results.

TECHNOLOGIES USED:
-------------------
        • JavaScript
        • NodeJs  
        • Express(framework)
        • Mongoose

To Run Project:
-------------------
        • npm run server


DEPENDENCIES INSTALLED:
------------------------
        • bcryptjs
        • colors
        • cors
        • dotenv
        • express
        • express-async-errors
        • express-mongo-sanitize
        • express-rate-limit
        • jsonwebtoken
        • mongoose
        • morgan
        • nodemon
        • validator


CONFIGURATION : 
---------------
        In this folder, I have given all the values that can change in the application when used on different environment and systems. The DataBase information is also given in this folder.

MODELS :
--------
        I have created 2 models here namely, 
                • Job Model
                • user Model


CONTROLLERS : 
-------------
        This is the place where all the functionalities are defined for all the models present in the application. All the functionalities are accessed by using APIs from the authenticated and authorized users.

        AUTH CONTROLLER:
        ----------------
                This the place where the user will be redirected when they want to sign up or sign in to the application. User who are signed in will be authenticated and be given with JSON WEB TOKENS, by using that tokens only the user can access the functionalities of the application.
    
        JOBS CONTROLLER:
        --------------------
                Refactored job controller with clear functions: create, delete, get, update, search, sort. Utilizes meaningful names, docstrings, error handling, and consistent formatting for improved readability and maintainability.

        TEST CONTROLLER:
        ------------------
                In this file, the User will abe to test his application, whether it is running properly or not and change accordingly.

        USER CONTROLLER:
        ----------------
                Enhanced user controller now empowers seamless user updates, ensuring personalized and efficient user management.

MIDDLEWARE:
-----------
        This is the folder where every API requests are validated, also every user is authenticated and authorized using json web tokens.

ROUTES:
-------
        This is the folder where every API call source is present, for each API call control is transferred to the correct controller file where all the functionalities are done. Before passing the control to the controllers, middlewares are called to check the authenticity and validation of the API call.
                • auth Routes
                • jobs Routes
                • test Routes
                • user Routes


All API:
-------------

**1.** TEST API
```terminal
Post method- (Body, raw,json)
http://localhost:8080/api/v1/test/test-post 
{"firstName":"Enter Your First Name"}
```


**2.** REGISTER API
```terminal
Post method- (Body, raw,json)
http://localhost:8080/api/v1/auth/register
{
    "firstName":"Enter Your First Name",
    "email":"Enter Your E-mail",
    "password":"Enter Your Password"
}
```



**3.** LOGIN API
```terminal
Post method- (Body, raw,json)
http://localhost:8080/api/v1/auth/login
{
    "email":"Enter Your E-mail",
    "password":"Enter Your Password"
}
```


**4.** UPDATE API
```terminal
Put method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/user/update-user
{
    "firstName":"Enter Your First Name",
    "email":"Enter your Email",
    "lastName":"Enter Your Last Name",
    "location":"Enter Your location"
}
```


**5.** CREATE JOBS API
```terminal
Post method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/jobs/create-job
{
    "company":"Your Company Name",
    "position":"Your Position Name"
}
```


**6.** GET JOBS API
```terminal
Get method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/job/get-job


**7.** UPDATE JOBS API
```terminal
Put method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/job/update-job/your_job_id
{
    "company":"Your Company Name",
    "position":"Your Position Name"
}
```


**8.** DELETE JOBS API
```terminal
delete method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/job/delete-job/your_job_id
```


**9.** STATS AND FILTERS JOBS API
```terminal
GET method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/job/job-stats
```


**10.** SEARCHING JOBS API
```terminal
Get method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/job/get-job?key=value


**11.** SORTING JOBS API
```terminal
Get method- (Body, raw,json) (headers-AUTHORIZATION)
http://localhost:8080/api/v1/job/get-job?sort=latest

DOTENV FILE:
-------------------
        • PORT=YOUR_PORT_CONNECTION
        • DEV_MODE=YOUR_DEVELOPMENT_MODE
        • MONGO_URL=YOUR_MONGO_CONNECTION
        • JWT_SECRET=YOUR_JWT_TOKEN
