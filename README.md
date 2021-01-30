# RealizDea - Create Online Platform API
This repository contains the Back-End (API) code for the product (RealizDea).

## Basic Information regarding the product
RealizDea is a product developed by students (Team C) from Glints Academy Batch 9 as their final project before graduation. This product was made to provide a win-win solution between business owners and creative designers.

## Database Information
The database were designed using SQL (MySQL) type. There are 6 main tables: User, Role, Contest, Status, Application and Payment. Kindly Check the migrations folder for detailed databases information

### API Information
The APIs are divided into 4 main routes:
1. User
2. Contest
3. Payment
4. Admin

The documentation of all the API can be found in [here] (https://documenter.getpostman.com/view/13706159/TVzUEwrf#af3d1ab8-c2f3-44e1-9ccf-788f7a36b282)

### Several Feature
- User Login and Register
- Profile Update
- Contest Searchbar
- Create Contest (Provider Only)
- Design Submission (Participant Only)
- Close Contest and Update Winner
- Payment (Admin and Provider)
- Payment Approval or Reject (Admin)
- Dashboard admin
- Automail reminder and notification (Integrated with the feature, for example payment reminder, create contest notification, etc)

### Language/framework involved in the product
- JavaScript, NodeJS, ExpressJS
- MVC (Model, View, Controller) Framework
- JWT Token Authentication, bcrypt
- express-validator, multer (image upload)
- node-cron , node mailer
- Unit testing using Mocha Chai and nyc
- AWS EC2, RDS

### Additional feature to be added in the future
- OAuth (Google, Facebook, and Twitter)
- Payment Gateway (Midtrans or Stripe)
- Web notification using npm-gcm and web-push
- Unit testing Jest
- More automated mail or job using node-cron





