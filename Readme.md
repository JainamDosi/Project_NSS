# JEE Test Platform

## Table of Contents
- [Project Overview](#project-overview)
- [Project Highlights](#project-highlights)
    -[Student Tools](#student-tools)
    -[Admin Tools](#admin-tools)
- [Why Participate?](#why-participate)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Features](#features)
  - [Realistic Test Interface](#realistic-test-interface)
  - [Detailed Performance Analysis](#detailed-performance-analysis)
  - [Test History & Bookmarks](#test-history--bookmarks)
  - [Upcoming Tests Calendar](#upcoming-tests-calendar)
  - [Admin Tools](#admin-tools)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview
<!-- The **JEE Test Platform** is a full-stack web application designed to simulate a real exam environment for JEE/NEET aspirants. It provides an engaging and interactive platform where students can attempt mock tests, track their performance, and get detailed insights into their strengths and weaknesses. The platform also offers tools for test administrators to manage tests and provide personalized feedback. -->
The **JEE Test Platform** is a comprehensive web application built to create an immersive and realistic test-taking experience for JEE/NEET aspirants. Designed with students in mind, it replicates the actual exam environment, helping them get comfortable with the pressure and pace of competitive exams.

The platform allows users to attempt mock tests, track their progress over time, and gain in-depth insights into their performance, identifying both strengths and areas that need improvement. With a focus on making learning more intuitive and data-driven, it uses visual charts and detailed analytics to guide students in refining their preparation strategy.

Additionally, the platform offers tools for test administrators to easily manage question uploads, evaluate results, and provide personalized feedback to help students grow. Whether you're a student looking to master your exams or an educator aiming to streamline the assessment process, this platform brings a seamless experience for all.

<!-- ## Project Highlights -->

<!-- 1. **Realistic Test Interface**:
   - Color-coded question status to indicate:
     - Attempted
     - Not Visited
     - Not Attempted
     - Marked for Review
   - Timer synchronized with the test.

2. **Detailed Performance Analysis**:
   - Subject-wise marks breakdown.
   - Insights into time spent per question.
   - Visual graphs and charts for easy comprehension and analysis.

3. **Test History & Bookmarks**:
   - Access to previously attempted tests and answer keys.

4. **Upcoming Tests Calendar**:
   - View upcoming test dates and syllabus reminders.
   - Schedule integrated with test management.

5. **Admin Tools**:
   - Upload questions and manage test content.
   - Manage test results and provide personalized feedback.
   - Track overall platform performance and user engagement. -->


## Project Highlights

### Student Tools:
1. **Realistic Test Interface**:
   - **Color-coded question status** to indicate:
     - Attempted
     - Not Visited
     - Not Attempted
     - Marked for Review
   - **Timer** synchronized with the test for time management.
   - **Flexible question switching** during tests, allowing students to navigate between different questions easily.

2. **Detailed Performance Analysis**:
   - **Subject-wise marks breakdown** for an in-depth understanding of performance.
   - **Time per question** analysis to help students manage time better.

3. **Test History & Bookmarks**:
   - Access **past tests**, including answer keys.
   <!-- - Ability to **bookmark important past-year questions (PYQs)** for review later. -->

4. **Dashboard Overview**:
   - A well-defined dashboard where students can view **upcoming**, **completed**, and **ongoing tests** separately, providing a clear and organized view of their test schedule and progress.

### Admin Tools:
1. **Question Management**:
   - **Upload questions** via a simple interface.
   - Organize questions by subject and difficulty level for efficient test creation.

2. **Results Management**:
   - View **overall test results** for all students, with detailed breakdowns.

3. **Test Management**:
   - **Schedule upcoming tests**, managing test dates for students.

These tools provide both students and administrators with a well-rounded experience that simplifies test preparation and management, while offering data-driven insights to enhance performance and learning outcomes.


<!-- ## Tech Stack

### Frontend:
- **React.js** 
- **Tailwind CSS** for styling
<!-- - **Chart.js** for performance analysis graphs -->
<!-- 
### Backend:
- **Node.js** with **Express.js**
- **MongoDB** (NoSQL)
- **JWT** for authentication -->

## Tech Stack

### Backend:
- **Express.js**: Fast, minimalist web framework for building the server-side of the application.
- **Mongoose**: Used for interacting with MongoDB, enabling flexible schema-based data modeling.
- **JWT (jsonwebtoken)**: For user authentication and authorization using JSON Web Tokens.
- **bcrypt & bcryptjs**: For hashing passwords securely.
- **Passport.js**: Authentication middleware, including Google OAuth 2.0 for social login functionality.
- **cookie-parser**: To handle cookies and session management.
- **dotenv**: For environment variable management.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing issues.
- **Nodemon**: For automatically restarting the server during development when changes are made.

### Frontend:
- **React.js**: A powerful JavaScript library for building dynamic user interfaces.
- **Ant Design (antd)**: A UI framework providing pre-built components for a polished and professional interface.
- **Material UI (MUI)**: A comprehensive set of UI components with customization options for the frontend.
- **Axios**: For making HTTP requests to interact with the backend API.
- **React-Redux**: State management for React applications, enabling predictable data flow.
- **React Router**: For navigation and routing within the React application.
- **Tailwind CSS**: Utility-first CSS framework for quickly styling the user interface.
- **Simple React Validator**: For form validation and input handling.

These technologies combine to create a robust, scalable, and user-friendly platform. The backend ensures secure user authentication and data handling, while the frontend focuses on a responsive and interactive user experience.

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jee-test-platform.git
   cd jee-test-platform
   ```

2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   npm install
   ```

3. Setup environment variables:
   - Create a `.env` file in the backend directory with the following values:
     ```
     DATABASE_URL=<your-database-url>
     JWT_SECRET=<your-secret-key>
     ```

4. Start the application:
   ```bash
   # Frontend
   cd frontend
   npm run dev

   # Backend
   cd backend
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.


## Usage

1. **Register and Log In**:
   - New users can register using their email.
   - Log in with your credentials to access the platform.

2. **Take a Test**:
   - Choose any ongoing and start the test.
   - The interface shows color-coded statuses for questions (Attempted, Not Attempted, Marked for Review and Not Visited).
   - The timer will track the test duration, and users can switch between questions.

3. **View Results and Analytics**:
   - After completing a test, view detailed performance analysis.
   - Use charts to understand your strengths and weaknesses based on subjects.

4. **Track Test History**:
   - Access previous tests, answer keys, and bookmarked questions under the "Test History" section.

5. **Upcoming Tests**:
   - Keep track of upcoming test dates using the integrated dashboard.

6. **Admin Tools**:
   - Admin users can create new tests and edit or delete previous tests, upload or edit questions and manage test results.


## Features

### Realistic Test Interface
- Color-coded question status:
  - **Green** for answered questions.
  - **Red** for not answered questions.
  - **Grey** for not visited questions.
  - **Violet** for answered and marked for review questions.
  - **Orange** for not answered and marked for review questions.
- Timer tracking the entire test duration.
- Ability to switch between questions during the test.

### Detailed Performance Analysis
- Graphs for subject-wise marks.
- Insights into time spent per question.
- Visual graphs for easy identification of strengths and weaknesses.

<!-- ### Test History & Bookmarks
- Access to all previously attempted tests.
- Detailed answer keys and explanations.
- Ability to bookmark important past-year questions. -->

### Upcoming Tests Calendar
- View and schedule upcoming test dates.
- Syllabus reminders integrated into the calendar.

### Admin Tools
- Admins can upload new questions via CSV or manual entry.
- Result management for all users.
- Personalize feedback based on test results.


## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Test Management
- `GET /api/tests` - Get a list of available tests
- `POST /api/tests` - Admins create a new test

### Performance Analysis
- `GET /api/performance/{userId}` - Get performance analysis for a user

### Question Management
- `POST /api/questions` - Admins upload questions
- `GET /api/questions/{testId}` - Retrieve questions for a particular test


## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Added feature-name"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


## Contact

For any queries, feel free to contact us at **nss@iitr.ac.in** or open an issue in the GitHub repository.
