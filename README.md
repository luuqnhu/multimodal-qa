# 🖼️ DocOwl2 Visual QA Frontend

This is the frontend part of a demo application that allows users to upload document images and ask questions about them using the DocOwl2 model. The UI is built with **ReactJS**, **TailwindCSS**, and **Radix UI**, providing a smooth and responsive chat interface.

---

## 🧠 Overview

The application enables users to:
- Upload one or multiple images of documents
- Ask natural language questions about the content of those images
- Receive AI-generated answers powered by the **DocOwl2** model
- View chat history, including uploaded images and past questions/answers

The frontend communicates with a Python-based backend.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js (v16+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## ⚙️ Setup Instructions

1. Open your terminal
2. Navigate to the folder containing the frontend source code

```bash
cd path/to/frontend
```

3.	Install dependencies

```
npm install
```

4.	Start the development server

```
npm run dev
```

The application will run at http://localhost:5173

## 🔗 Backend Integration

Make sure the backend server (Flask API with DocOwl2) is running locally on the expected port (usually http://localhost:5000)

## 📂 Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── App.tsx
├── package.json
└── tailwind.config.js
```

## 💬 Features

•	Image upload (single & multi-page)
•	Real-time Q&A interaction
•	Clean chat interface with history tracking
•	Displays uploaded images with each query

## 📝 License

This project is for academic/research demonstration purposes only.
