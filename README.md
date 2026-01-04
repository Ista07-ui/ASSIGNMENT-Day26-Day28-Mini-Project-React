# React Fundamentals Assignment - Reqres API Integration

This project is a React-based frontend application that integrates with the [Reqres API](https://reqres.in/). It demonstrates fundamental React concepts including component styling, API integration, authentication, and routing.

## Features

### Milestone 1: API Integration
- **Authentication**:
    - Login (Successful & Unsuccessful scenarios managed)
    - Register (Successful & Unsuccessful scenarios managed)
- **User Management**:
    - List Users (with pagination)
    - Single User Detail view

### Milestone 2: React Application
- **Frontend Framework**: Built with React.js (Next.js).
- **Styling**: Responsive design using Tailwind CSS.
- **Routing**:
    - Public pages: Login, Register, Home (User List).
    - **Protected Routes**: User Detail page (`/users/[id]`) requires authentication.
- **Micro-interactions**: Hover effects, loading states, and smooth transitions.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: Material Symbols via Google Fonts
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/pages`: Application routes.
- `src/components`: Reusable UI components (`UserList`, `Navbar`, etc.).
- `src/utils/api.ts`: API service configuration and endpoints.
- `src/components/withAuth.tsx`: HOC for protected route logic.

## Protected Routes
The User Detail page is protected. If you try to access a user's profile without being logged in, you will be redirected to the Login page.

## Credits
Assignment for **React Fundamentals: Building Interactive User Interfaces**.
API provided by [Reqres](https://reqres.in/).
