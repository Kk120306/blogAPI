# blogAPI

A RESTful API backend for a blogging platform, designed to work seamlessly with a corresponding frontend. This API handles user authentication, blog post management, and more.

* **Frontend Repository**: Link to Frontend GitHub Repository *(https://github.com/Kk120306/blog-client)*
* **Database Hosting**: Utilizes PostgreSQL databases hosted on Neon and Railway.

## Features

* **User Authentication**: Register and login functionalities with secure password handling.
* **Blog Management**: Create, read, update, and delete blog posts.
* **Middleware**: Incorporates middleware for request validation and error handling.
* **Database Integration**: Employs Prisma ORM for database interactions.

## Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Hosting**: Neon, Railway

## Getting Started

### Prerequisites

* Node.js and npm installed on your machine.
* Access to Neon and/or Railway for database hosting.

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Kk120306/blogAPI.git
cd blogAPI
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:
   * Create a `.env` file in the root directory.
   * Add your database URL:

```env
DATABASE_URL="your_database_connection_url"
```

4. **Run database migrations**:

```bash
npx prisma migrate dev --name init
```

5. **Start the server**:

```bash
npm run dev
```

The server should now be running at `http://localhost:3000/`.
