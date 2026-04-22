# Vue 3 Drag & Drop Dashboard Builder

![Vue.js](https://img.shields.io/badge/Vue%203-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

This project is a Vue application that allows users to practically test how the **drag-and-drop** method works and analyze the code.

Users can export the layout they create on the dashboard in **JSON** format to set up the architecture on the backend side, or test it by outputting JSON data using the **Live Viewer** engine.

## Features

- **Smooth Drag-and-Drop Interface:** Grab widgets from the toolbar and drop them into the grid system.
- **Dynamic Widgets:** Live components that perform mathematical operations (Counter, Adder, Subtractor, Multiplier).
- **Customizable Color Boxes:** A dynamic form that enables users to create widgets with their own colors and names.
- **JSON Export & Import:** Copy your design in seconds or send it to the Live Preview page via LocalStorage.
- **Live Preview Engine:** A special `DashboardViewer.vue` component that draws static/readable dashboards by simply reading JSON data.

## Tech Stack

- **[Vue 3](https://vuejs.org/)** (Composition API & `<script setup>`)
- **[Vite](https://vitejs.dev/)** (Fast build and development environment)
- **[Tailwind CSS v4](https://tailwindcss.com/)** (Modern and utility-first CSS framework)
- **[Vue Router 4](https://router.vuejs.org/)** (SPA routing between pages)

## Project Structure

```
src/
├── assets/             # Static files
├── components/         # Common components
│   ├── DashboardViewer.vue  # The engine that reads JSON and draws it on the screen
│   └── Sidebar.vue          # Drag-and-drop menu
├── math/               # Dynamic Widgets
│   ├── Adder.vue
│   ├── Counter.vue
│   ├── Multiplier.vue
│   └── Subtractor.vue
├── router/             # Vue Router settings
│   └── index.js
├── views/              # Home Pages
│   ├── Dashboard.vue        # Builder Page
│   └── LiveViewer.vue       # Live Viewer Page
├── App.vue             # Main Container 
└── main.js             # Application starting point
```

## Installation and Operation

To run the project on your own computer, follow these steps:
- Node.js is required

1. **Clone The Project:**

   ```bash
   git clone [https://github.com/Burak-Orhan/modular-widget-app.git]

2. **Go to the project directory:**

   ```bash
   cd modular-widget-app

3. **Install Dependencies**

   ```bash
   npm install

4. **Build the Project**

   ```bash
   npm run build

5. **Run the Project**

   ```bash
   npm run dev