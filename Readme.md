# Marvel Movie Search Project

Welcome to the Marvel Movie Search Project! This project aims to provide a convenient and user-friendly way to search for information about Marvel movies.

## Introduction

This project utilizes the Marvel API to fetch data about Marvel movies. Users can search for movies by name and character

## Features

- **Search by Name:** Users can search for movies by entering the name of the movie.
- **Search by Character:** Users can search for movies by entering the name of a character featured in the movie
- **Authentication and Authorization:** Implementing authentication and authorization mechanisms to secure the API endpoints and restrict access to unauthenticated users.

## Technologies Used

- [NodeJS](https://nodejs.org/) 
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Marvel API](https://developer.marvel.com/) 

## API Documentation
   Here you can check api documentation: [marvel-movie-api-docs](https://documenter.getpostman.com/view/11206877/2s9Yyy9e3F)


## Setup

To run this project locally, follow these steps:
 
1. Create a **.env** file in parent directory, refer attached **sample.env** file for environments variables.

2. Clone the repository:

   ```bash
      git clone https://github.com/pradhyumvyas/MarvelMovie
   ```
3. Navigate to the project directory:

   ```bash
      cd marvel-movie-search
   ```
4. Install dependencies:   
   ```bash
      npm install
   ```
5. Start the server:
   ```bash
      npm run dev
   ```