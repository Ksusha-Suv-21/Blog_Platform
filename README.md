# Blog Platform

Frontend application for reading, creating, and managing blog posts.

## Features
- User authentication
- Creating and editing posts
- Responsive layout
- Routing
- Form validation
- API integration
- State management
- Loading states
- Error handling
- Empty states

## Tech Stack
- React
- TypeScript
- Redux Toolkit
- React Router
- Axios
- SCSS Modules
- Vite

## Demo
Live Demo: https://blog-platform-psi-three.vercel.app/

## Screenshots

### Desktop
![Desktop screenshot](./screenshots/desktop.png)

## Installation

```bash
npm install
npm run dev
```

## Author
Kseniia Suvorova

## Important note

The backend API is currently returning HTTP 500 errors on articles endpoints.

To keep the application functional, temporary mock data is used instead of real API responses.

This affects:
- Articles list (mocked with 5 items)
- Single article page (mock fallback)

This is a temporary solution and will be removed once the API is restored.
