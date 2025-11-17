# 🎯 Tic-Tac-Toe Frontend

A modern React frontend for a full-stack Tic-Tac-Toe game with complete user authentication and profile management.

## ✨ Features

- **🎮 Interactive Tic-Tac-Toe Game** - Complete game logic with win detection and move history
- **🔐 User Authentication** - JWT-based login/register with secure token storage
- **🛡️ Protected Routes** - Game and profile pages require authentication
- **👤 User Profiles** - Update username and upload profile pictures
- **🔒 Password Management** - Secure password change functionality
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI** - Clean, intuitive interface with smooth animations
- **⚡ Real-time Game State** - Live game updates and move tracking
- **🔄 Game History** - Review and replay all moves during gameplay
- **📤 File Upload** - Profile picture upload with validation
- **🚀 Error Handling** - Comprehensive error messages and loading states

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run for test 
npm run dev
```

## 🔧 Environment Setup

Create a `.env` file:
```env
REACT_APP_API_BASE_URL=http://{backend_url:port}/api
REACT_APP_UPLOADS_URL=http://{backend_url:port}
```

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - API communication
- **Context API** - State management
- **CSS3** - Styling with modern features

The frontend connects to a Node.js/Express backend with MongoDB for complete full-stack functionality.
