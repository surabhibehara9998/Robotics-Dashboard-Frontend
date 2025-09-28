# Robotics-Dashboard-Frontend

A secure, responsive, and real-time web dashboard for monitoring and configuring a fleet of autonomous mobile robots. Built with a modern React stack, this frontend provides a rich, data-driven user interface that is performant, reliable, and ready for a scalable cloud deployment.

-----

## \#\# Key Features

  * **Secure JWT Authentication Flow:** A complete, secure authentication system with a dedicated login page, protected routes, and automated token handling for all API requests.
  * **Real-Time Fleet Visualization:** A dynamic dashboard that connects to a secure WebSocket to display live telemetry data (location, status, battery) with seamless updates.
  * **Interactive & Performant UI:** A responsive grid of robot cards built with Material-UI. Component rendering is optimized with **`React.memo`** to prevent unnecessary re-renders from the high-frequency data stream.
  * **Professional UX & Theming:** A polished user experience featuring a dark theme, a custom thematic background, a modern header with a logo, a profile dropdown menu, and non-blocking toast notifications for user feedback.
  * **Reliability Assured via Testing:** The application includes a comprehensive testing suite, with unit tests for individual components and end-to-end tests for critical user flows like login.
  * **Containerized & Deployment-Ready:** The entire application is containerized with **Docker**, ensuring consistent, portable, and scalable deployments.

-----

## \#\# Tech Stack

  * **Core:** React 18, Vite
  * **UI Framework:** Material-UI (MUI) v5
  * **State Management:** Zustand
  * **API & Sockets:** Axios, Socket.IO Client
  * **Routing:** React Router v6
  * **Testing:** Vitest, React Testing Library, Cypress (End-to-End)
  * **Deployment:** Docker, Nginx

-----

## \#\# Project Structure

```
src/
├── api/             # Axios instance and global interceptors
├── components/      # Reusable UI components (RobotCard, ConfigurationModal)
├── pages/           # Page-level components (LoginPage, DashboardPage)
├── store/           # Zustand global state stores (authStore)
└── App.jsx          # Main application component with routing
```

-----

## \#\# Getting Started

### \#\#\# Local Development

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd robotics-dashboard-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`. Ensure the backend server is running.

-----

## \#\# Running with Docker

The application is fully containerized for easy and consistent deployment.

1.  **Build the Docker image:**
    ```bash
    docker build -t robotics-dashboard-frontend .
    ```
2.  **Run the Docker container:**
    ```bash
    docker run -p 8080:80 robotics-dashboard-frontend
    ```

The application will be accessible at `http://localhost:8080`.

-----

## \#\# Automated Testing

The project includes a robust testing strategy to ensure reliability and maintainability.

  * **Unit & Component Tests:** Written with **Vitest** and **React Testing Library**. They verify that individual components render correctly and functions behave as expected.
    ```bash
    npm test
    ```
  * **End-to-End (E2E) Tests:** Written with **Cypress**. These tests simulate real user interactions to verify critical user flows from end to end.
    ```bash
    # To open the Cypress test runner:
    npm run cypress:open
    ```

-----

## \#\# Authentication Strategy

The application implements an end-to-end JWT-based authentication strategy that secures both REST APIs and WebSocket communication:

1.  **Token Acquisition:** The user submits credentials on the `LoginPage`, which are sent to the `POST /api/auth/login` endpoint. Upon success, the backend returns a JWT.
2.  **Token Persistence:** The JWT is stored in the browser's **`localStorage`** using Zustand's `persist` middleware. This keeps the user logged in across page refreshes.
3.  **Securing REST APIs:** A global **Axios interceptor** is configured to automatically attach the `Authorization: Bearer <token>` header to every outgoing HTTP request.
4.  **Securing WebSockets:** The JWT is passed in the `auth` object during the initial Socket.IO handshake. The backend verifies this token before upgrading the connection, ensuring that only authenticated users can receive real-time telemetry data.
5.  **Handling Unauthorized Access:** A global Axios response interceptor automatically detects `401 Unauthorized` responses. If a token expires or is invalid, the user's state is cleared, and they are immediately redirected to the login page.

-----

## \#\# Cloud Deployment (Conceptual)

The containerized frontend can be deployed globally with high performance and low latency using AWS S3 and CloudFront.

1.  **Build the Application:** Run `npm run build` to generate a production-ready `dist` folder containing optimized, static assets.
2.  **Host on AWS S3:** An S3 bucket is created and configured for **static website hosting**. The contents of the `dist` folder are uploaded to the S3 bucket.
3.  **Serve via AWS CloudFront:**
      * An AWS CloudFront distribution is created to act as a **Content Delivery Network (CDN)**, using the S3 bucket as its origin.
      * **Security:** An **Origin Access Identity (OAI)** is used to restrict direct S3 bucket access, forcing all traffic through CloudFront.
      * **Performance:** CloudFront caches the assets at edge locations worldwide, drastically reducing latency for global users.
      * **HTTPS:** An SSL/TLS certificate from AWS Certificate Manager (ACM) is attached to the CloudFront distribution.
4.  **Handling Client-Side Routing:** To support the Single Page Application (SPA) routes, CloudFront's **Error Pages** are configured to redirect all `404 (Not Found)` errors back to `/index.html` with a `200 OK` response. This allows React Router to handle all client-side navigation correctly.

------
