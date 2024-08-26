Server >> Storing certain book data >> User Register >> Subscriber

This is a book record management API Server/ Backend for the library system or management of records or manuals or books.

Fine System:
User: 27/07/2024 - 27/10/2024
28/07/2024 => Rs 50 per day if delayed the return of book.

# subscription types

3 months (Basic)
6 months (Standard)
12 months (Premium)

If the subscription type is standard and if the subscription date is 27/07/2024
Then subscription is valid till 27/10/2024

Within subscription date >> if we miss renewal >> Fine Rs 50
per day
subsccription date has been missed the renewal >> Fine Rs 100
subsccription date has also been missed the renewal >> Fine Rs 100 + (50 per day).

## Routes and EndPoints

### /users

POST: Creating a new user.
GET: Gets all the user info here.

### /users/{id}

GET: Get a user by id.
PUT: Update a user by id.
DELETE: Delete a user by id (Check if he/she still has an issued book and is there any fine to be paid).

### /user/subscription-details/{id}

GET: Get user subscription details >> Date of Subscription >> Valid till >> Is there any fine

### /books

GET: Get all the books
POST: Add a new book

### /books/{id}

GET: Get a book by id
PUT: Update a book by id

### /books/issued

GET: Get all issued books

### /books/issued/withFine

GET: Get all issued books with fine.

## npm init

## npm i nodemon --save-dev

## npm i express

## npm i mongoose

## npm run dev
