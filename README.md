# 100x Microblogging (twitter) platform Schema Design

> Module 10 - Assignment 1: Schema Design for 100x Microblogging Platform
> by Vijayabaskar
> Debian House

### entities

- User
- Post
- Followings
- comments

### Relationship

- post belongs to user (one-to-many)
- user can have many followers and follow many users (many-to-many)
- comments belongs to post (one-to-many)

### Schema

#### User

Description : Main entity of the app,

- we chose auto-increment id for our tables
- enforcing unique constrante on the username and email, a user should have unique user_name and only one account for one email

```
 * User Table
 *
 * id (primary_key): auto-int BigInt
 * username (15 character): unique, string
 * email: unique, string
 * email_verified_at: timestamp
 * display_name (50 character): string
 * bio (1000 character): text
 * website: url string
 * location: string
```

#### Post

- similar to user main entity of the app,
- difference between text & string : - strings have length limitation and text doesnot, string consume less storeage and text consume more storeagte that string
- string is user for one or two worlds and text is used for paragraphs text (collections of strings)
- enfourcing one-to-many relation through foreign-keys

```
 * Post Table
 *
 * id (primary key): BigInt, serial
 * posttext (280 character): text
 * postedAt: timestamps
 * user_id (foreign-key): BigInt
 * repost_id (foreign-key): BigInt
 * like (foreign-key) : BigInt
 * updated_at : timestamp
```

#### Following

- with unique constraint the enforce the rule of user can not follow themselves
- this table can be user for both follower's and following

```
 * FollowAction
 *
 * id (primary key): serials, BigInt
 * followed_at : timestamp,
 * user_id (foreign-key) : BigInt unique
 * followed_id (foreign-key) : BigInt unique
```

#### likes

- liked-by unique constrant enforce the rule of one user can like only once

```
 * likes table
 *
 * id (primary key): serial BigInt
 * post_id : BigInt
 * liked-by(user_id, foreign-key) : BigInt unique
 * liked-at : timestamp
```

#### Comments

- parent_command_id is referenceing the reply table itself to make the thread like conversatins
- post_id is unique to ensure that comments always belong to the post only and not the other commands

```
 * reply Table
 *
 * id (primary key): BigInt, serial
 * post_id (foreign_key): BigInt unique
 * user_Id (foreign-key): BigInt
 * reply_text : text
 * reply_at : timestamp
 * parent_command_id (foreign-key): BigInt Null
```
