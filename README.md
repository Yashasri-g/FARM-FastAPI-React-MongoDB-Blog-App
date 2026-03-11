# FARM (FastAPI, React, MongoDB) Blog App

This is a full-stack blog application built using the FARM stack:

- FastAPI for the backend
- React for the frontend
- MongoDB as the database
- MongoDB Compass for database management

The application allows users to create, read, update, and delete (CRUD) blog posts, with a simple and responsive interface.

## Table of Contents

- [FARM (FastAPI, React, MongoDB) Blog App](#farm-fastapi-react-mongodb-blog-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Project Structure](#project-structure)
  - [Backend Setup (FastAPI)](#backend-setup-fastapi)
    - [1. Install Backend Dependencies](#1-install-backend-dependencies)
    - [2. Create MongoDB Connection (database.py)](#2-create-mongodb-connection-databasepy)
    - [3. Define Blog Models (models.py)](#3-define-blog-models-modelspy)
    - [4. Set Up FastAPI Routes (app.py)](#4-set-up-fastapi-routes-apppy)
  - [Frontend Setup (React)](#frontend-setup-react)
    - [1. Install Frontend Dependencies](#1-install-frontend-dependencies)
    - [2. Create Blog App Interface (App.js)](#2-create-blog-app-interface-appjs)
  - [MongoDB Setup (MongoDB Compass)](#mongodb-setup-mongodb-compass)
    - [1. Install MongoDB and MongoDB Compass](#1-install-mongodb-and-mongodb-compass)
    - [2. Create a Database and Collection](#2-create-a-database-and-collection)
  - [Running the Application](#running-the-application)
    - [1. Run the FastAPI Backend](#1-run-the-fastapi-backend)
    - [2. Run the React Frontend](#2-run-the-react-frontend)
  - [API Endpoints](#api-endpoints)

## Features

- Create, Read, Update, and Delete blog posts
- FastAPI backend with MongoDB as the database
- React frontend for interacting with the blog
- Simple form for creating and updating blog posts
- CORS support for communication between frontend and backend

## Prerequisites

Before running this project, ensure you have the following installed:

- Python 3.x
- Node.js and npm
- MongoDB and MongoDB Compass

## Project Structure

```plaintext
FARM-Blog-App/
├── backend/
│   ├── app.py              # FastAPI app with blog routes
│   ├── database.py         # MongoDB connection setup
│   ├── models.py           # Pydantic models for blog posts
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js          # React app for frontend
│   ├── package.json        # React dependencies
├── README.md               # Project documentation
```

## Backend Setup (FastAPI)

### 1. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 2. Create MongoDB Connection (database.py)

Inside `database.py`, set up a connection to MongoDB.

### 3. Define Blog Models (models.py)

Create `models.py` to define the BlogPost model for request validation.

### 4. Set Up FastAPI Routes (app.py)

Define CRUD routes in `app.py` to create, read, update, and delete blog posts.

## Frontend Setup (React)

### 1. Install Frontend Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 2. Create Blog App Interface (App.js)

The React frontend is set up in `src/App.js`.

## MongoDB Setup (MongoDB Compass)

### 1. Install MongoDB and MongoDB Compass

- Download and install MongoDB from the MongoDB website.
- Open MongoDB Compass and connect to the MongoDB instance.

### 2. Create a Database and Collection

- In MongoDB Compass, create a new database called `blog_db`.
- Add a collection named `posts`.

## Running the Application

### Docker Compose Environment

Create a `.env` file in the project root, next to `docker-compose.yml`. Use `.env.example` as the template.

```env
MONGO_DETAILS=mongodb://mongo:27017/blog_db
REACT_APP_API_URL=http://localhost:8000/posts/
```

Docker Hub username, password, or access token should not be stored in `docker-compose.yml`. Use `docker login` so Docker stores registry credentials in your local Docker configuration.

### 1. Run the FastAPI Backend

Start the FastAPI server:

```bash
cd backend
uvicorn app:app --reload
```

The FastAPI backend should now be running at `http://localhost:8000`.

### 2. Run the React Frontend

In a new terminal, navigate to the frontend directory and start the React app:

```bash
cd frontend
npm start
```

The React app should be accessible at `http://localhost:3000`.

## API Endpoints

- `POST /posts/`: Create a new blog post
- `GET /posts/`: Retrieve all blog posts
- `GET /posts/{post_id}`: Retrieve a specific blog post by ID
- `PUT /posts/{post_id}`: Update a blog post by ID
- `DELETE /posts/{post_id}`: Delete a blog post by ID
