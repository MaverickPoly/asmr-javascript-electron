# ASMR JavaScript Electron

25 Beginner Electron js project for novices to get started.

## Projects
1. **Hello World App**
   A simple "Hello, World!" Electron app to get started with the basics of Electron.    
2. **Simple Counter**
   Create a simple Counter app, where you can increment and decrement counter.
3. **Notes app**
   Develop a basic Notes app where users can implement CRUD operations on notes.
4. **Simple Calculator**
   A desktop calculator that performs basic arithmetic operations like addition, subtraction, multiplication, and division.
5. **Weather App**
   A weather app that fetches weather data using an API and displays it to the user.
6. **Currency Converter**
   An app that converts one currency to another, using an API for up-to-date exchange rates.
7. **Markdown Editor**
   A text editor that supports Markdown formatting and previews the result in real-time.
8. **Image Viewer**
   An app that lets you open and view images stored on your computer, with basic navigation (zoom, next, previous).
9. **File Explorer**
   A simple file explorer that allows users to browse and open files from their computer.
10. **Pomodoro Timer**
    A timer app that implements the Pomodoro technique, with customizable time intervals for work and breaks.
11. **Simple Text Editor**
    A text editor with basic features like open, save, and edit text files, along with undo and redo functionalities.
12. **Task Manager**
    An app that displays running processes and allows users to close or manage processes on their machine.
13. **Clipboard Manager**
    An app that stores your copied text snippets and allows you to quickly paste them again.
14. **Random Joke Generator**
    A simple app that fetches a random joke from an API and displays it each time the user clicks a button.
15. **Digital Clock**
    A desktop clock that displays the current time and can be customized with different themes.
16. **Simple Contact Manager**
    An app to add, update, and delete contact information such as names, phone numbers, and email addresses.
17. **Alarm App**
    A simple alarm clock where users can set alarms to ring at specific times.
18. **Unit Converter**
    A basic app to convert various units like length, weight, temperature, etc.
19. **Basic Music Player**
    A music player that plays local audio files with basic controls like play, pause, and volume.
20. **Todo List**
    A to-do list app with `sqlite` local database.
21. **Quotes App**
    An app that fetches inspirational quotes from an API and displays a new quote every time the user clicks a button.
22. **Simple PDF Reader**
    A PDF reader that can open and display PDF files locally on the system.
23. **Simple Chat Application**
    A local chat application where users can send messages to each other within the same computer.
24. **Simple Web Browser**
    A basic web browser with navigation features like back, forward, and refresh.
25. **QR Code Generator**
    An app that generates QR codes based on the text input provided by the user.
26. **Recipe Finder**
    An app that fetches recipes from an API based on ingredients inputted by the user.

---

# Electron Guide with JavaScript Frameworks

## React

Here's a complete guide to set up an Electron application with React for the UI and Tailwind CSS for styling.

### 1. Initialize the Project

```bash
# Create project directory
mkdir electron-react-tailwind
cd electron-react-tailwind

# Initialize package.json
npm init -y
```

### 2. Install Electron

```bash
npm install --save-dev electron
```

### 3. Set Up React with Vite (Recommended)

```bash
# Create React app with Vite
npm create vite@latest renderer --template react

# Move into the renderer directory
cd renderer

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Return to project root
cd ..
```

### 4. Configure Tailwind CSS

#### Update `renderer/tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Add Tailwind directives to `renderer/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Set Up Electron Main Process

#### Create `main.js` in project root
```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // Load Vite dev server in development or static files in production
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, 'renderer/dist/index.html.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
```

#### Create `preload.js` in project root
```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
    // Whitelist channels
    const validChannels = ['toMain']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    const validChannels = ['fromMain']
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  }
})
```

### 6. Update package.json

```json
{
  "name": "electron-react-tailwind",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dev": "concurrently \"vite --host\" \"wait-on http://localhost:5173 && electron .\"",
    "build": "cd renderer && npm run build",
    "package": "npm run build && electron-builder"
  },
  "devDependencies": {
    "concurrently": "^8.2.1",
    "electron": "^25.3.0",
    "electron-builder": "^24.4.0",
    "wait-on": "^7.0.1"
  }
}
```

### 7. Install Additional Dev Dependencies

```bash
npm install --save-dev concurrently wait-on electron-builder
```

### 8. Create a Sample React Component

#### Create `renderer/src/App.jsx`
```jsx
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Example of IPC communication
    window.electronAPI.receive('fromMain', (data) => {
      console.log('Received from main process:', data)
    })
  }, [])

  const sendToMain = () => {
    window.electronAPI.send('toMain', 'Hello from React!')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Electron + React + Tailwind
      </h1>
      <button
        onClick={sendToMain}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Send to Main Process
      </button>
    </div>
  )
}

export default App
```

### 9. Run the Application

#### Development Mode
```bash
npm run dev
```
This will:
1. Start Vite dev server for React
2. Wait for the server to be ready
3. Launch Electron with hot-reloading

#### Production Build
```bash
npm run build
npm start
```

### 10. Package Your App (Optional)

First install electron-builder if you haven't:
```bash
npm install --save-dev electron-builder
```

Then create a build configuration in `package.json`:
```json
"build": {
  "appId": "com.example.electronreacttailwind",
  "productName": "Electron React Tailwind",
  "files": [
    "main.js",
    "preload.js",
    {
      "from": "renderer/dist",
      "to": "dist"
    }
  ],
  "win": {
    "target": "nsis",
    "icon": "assets/icon.ico"
  },
  "mac": {
    "target": "dmg",
    "icon": "assets/icon.icns"
  },
  "linux": {
    "target": "AppImage",
    "icon": "assets/icon.png"
  }
}
```

Then run:
```bash
npm run package
```

### Key Features of This Setup:

1. **Modern React Development** with Vite for fast compilation
2. **Tailwind CSS** for utility-first styling
3. **Secure Electron Configuration** with:
    - Context isolation
    - Preload script whitelisting
    - No Node.js integration in renderer
4. **Development Workflow** with:
    - Hot reloading for React
    - DevTools automatically opened
5. **Production-Ready** with packaging support


