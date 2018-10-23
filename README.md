# Writeup

This project is completed with the aim of learning AngularJS. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4. Writeup is a Medium clone where one can write and share articles with various functionalities. It is created using the [Realworld Project API](https://conduit.productionready.io/api) where people can create accounts, write articles, and comment on others' articles.

Check the demo of this project [here](https://writeup.netlify.com)

## Installation guide
```
Clone this repositiory.
Run 'npm install'
Run 'npm install ngx-infinite-scroll --save'
Run 'ng serve'

The app will be deployed at http://localhost:4200/
```

# Functionalities

## User Authentication
```
Signup
Login
(Browser's LocalStorage is used to save authentication token)
```

## Articles
```
Seeing all the feed of the articles (route: /articles)
Open and read a particular article (route: /articles/{article-name})
Write a new article.
Edit own older articles.
Delete own articles.
Favorite/Unfavorite articles.
Infinite Scrolling (Pagination)
```

## Comments
```
See comments under articles.
Write your own comment under an article.
```

## Users
```
Edit User details.
Follow/Unfollow any other user.
```
