# JEB Incubator - Startup Ecosystem Platform

JEB Incubator is a platform designed to connect startups, founders, and investors. It provides a centralized hub for discovering innovative projects, finding investment opportunities, and networking with key players in the startup ecosystem.

## Key Features

- **User Authentication**: Secure sign-up and login functionality for all user types.
- **Project Catalog**: A comprehensive directory of startups, allowing users to browse, filter, and find detailed information about each project.
- **Profile Management**: Dedicated profiles for Founders and Investors to showcase their portfolios, interests, and background.
- **Interactive Dashboard**: A personalized dashboard for users to manage their connections, followed startups, and profile information.
- **News and Events**: Stay updated with the latest news and events within the startup community.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Neon](https://neon.tech/) (Postgres)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18.x or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/EPITECH-IT-2028/Survivor.git
    cd Survivor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables.

    Generate a secure JWT secret (minimum 32 characters):
    ```bash
    echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env.local
    ```

    You will need to provide values for the following:
    - `DATABASE_URL`: Your Neon database connection string.
    - `JWT_SECRET`: A secret key for signing JWTs (minimum 32 characters, automatically generated above).

    **⚠️ Important**: Never commit `.env*` files to version control as they contain sensitive information.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase using ESLint.

## Project Structure

- `app/`: Contains the core application logic, including pages, API routes, and layouts.
- `components/`: Reusable React components used throughout the application.
- `lib/`: Contains utility functions, database connection logic (`db.ts`), and authentication helpers (`auth-utils.ts`).
- `public/`: Static assets like images and fonts.
- `app/api/`: All backend API endpoints are defined here.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). Simply connect your Git repository to Vercel to enable automatic deployments on push.
