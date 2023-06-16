# Microservice Web Application for Test Management: StudyTracker, by SynapseSolutions

This repository contains a microservice architecture web application designed to facilitate test creation and evaluation for teachers, and test taking for students. The application is built using the MERN stack, with MongoDB being replaced by MySQL as the database.
## Features

    **Test Creation**: Teachers can create and manage tests using an intuitive interface. They can define questions, set answer options, and specify evaluation criteria for each question.

    **Test Taking**: Students can access and take tests assigned to them. They will be presented with the questions and answer options, and upon submission, their responses will be evaluated according to the predefined evaluation criteria.

    **Test Evaluation**: The system automatically evaluates student responses based on the predetermined evaluation criteria set by teachers. Teachers can review the results and analyze the performance of individual students or the entire class. Schools head masters can evaluate their entire school and hypothetical city officials can evaluate their entire city statistics.

## Architecture

The application follows a microservice architecture to ensure scalability, modularity, and ease of deployment. The services are containerized using Docker, allowing for separate deployments and efficient resource utilization.

The microservices included are:

    **Test Service**: Responsible for creating, updating, and managing tests. It provides an API for test creation and retrieval.

    **Result Service**: Handles the evaluation of student responses based on predefined evaluation criteria. It interacts with the database to retrieve test data and perform evaluations.

    **User Service**: Manages user authentication and authorization. It provides user registration, login, and access control functionality.

    **Frontend Service**: Implements the user interface for teachers and students. It communicates with the backend services to fetch and submit data.

## Technologies Used

    **Frontend**: The frontend is built using React.js, utilizing modern web development practices and UI libraries to provide an interactive and user-friendly experience.

    **Backend**: The backend services are developed using Node.js and Express.js. The services communicate with each other through RESTful APIs, ensuring loose coupling and interoperability.

    **Database**: MySQL is used as the database management system to store and retrieve test data, student responses, and evaluation criteria.

    **Containerization**: Docker is employed to containerize each microservice, enabling easy deployment, scalability, and isolation.
