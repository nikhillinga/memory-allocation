# Memory Allocation Simulator

An **interactive web application** that visualizes **memory allocation algorithms** — including **First-Fit**, **Best-Fit**, and **Worst-Fit** — in real time.  
Built using **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, this tool helps learners and educators understand how dynamic memory management works at a low level through an intuitive graphical interface.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## Introduction

The **Memory Allocation Simulator** provides an educational visualization of how different allocation algorithms assign processes to memory blocks.  
It’s ideal for students studying **Operating Systems** or **Computer Architecture**, and for instructors demonstrating memory management techniques.

The app allows you to:
- Input **custom memory blocks** and **process sizes**
- Step through each allocation decision
- Compare **fragmentation**, **allocation success**, and **memory waste**

---

## Features

✅ Real-time visualization of memory allocation steps  
✅ Support for **First-Fit**, **Best-Fit**, and **Worst-Fit** algorithms  
✅ Interactive control panel with **Play**, **Pause**, and **Step** navigation  
✅ Dynamic configuration of block and process sizes  
✅ Fragmentation and allocation statistics  
✅ Adjustable simulation speed  

---

## Tech Stack

| Category | Technologies |
|-----------|--------------|
| Framework | **React** (via Vite) |
| Language | **TypeScript (ES2020+)** |
| Styling | **Tailwind CSS** + **autoprefixer** |
| UI Library | **shadcn-ui** |
| Build Tool | **Vite** |
| Config | PostCSS, TypeScript, Vite configs |

---

## Installation

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/nikhillinga/memory-allocation.git

# Navigate into the project
cd memory-allocation

# Install dependencies
npm install

# Start the development server
npm run dev
```

Once running, open the URL shown in the console (usually `http://localhost:5173`) in your browser.

---

## Usage

1. Open the simulator in your browser.
2. Enter **Memory Blocks** (e.g., `100, 500, 200, 300, 600`).
3. Enter **Processes** (e.g., `212, 417, 112, 426`).
4. Choose an allocation algorithm from the dropdown:
   - **Best-Fit**
   - **First-Fit**
   - **Worst-Fit**
5. Click **Start** to begin simulation.
6. Use controls to:
   - ▶ **Play / Pause**
   - ⟶ **Step Forward / Backward**
   - 🔁 **Reset Simulation**
7. Monitor real-time stats such as:
   - Allocated Memory
   - Wasted Memory
   - Fragmentation
   - Success & Fail Counts

---

## Configuration

Configuration files include:

| File | Purpose |
|------|----------|
| `postcss.config.js` | Tailwind and autoprefixer setup |
| `tailwind.config.ts` | Tailwind theme configuration |
| `vite.config.ts` | Build and development server configuration |
| `tsconfig.app.json` / `tsconfig.node.json` | TypeScript compiler options |

---

## Project Structure

```
memory-allocation/
├── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── styles/
│   └── main.tsx
├── public/
│   └── favicon.ico
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Development

Run a live development environment with hot reload:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Deployment

You can deploy using any static site host such as:
- **Vercel**
- **Netlify**
- **GitHub Pages**

---

## Troubleshooting

| Issue | Solution |
|--------|-----------|
| `npm run dev` fails | Ensure **Node.js (v18+)** and **npm** are installed |
| Blank screen or broken styles | Run `npm run build` to verify Tailwind compilation |
| TypeScript errors | Check `tsconfig.json` for missing or incorrect paths |
| UI not updating | Refresh browser or clear cache |

---

## Contributors

- **Nikhil Arya Linga (23BAI0142)**  

---

## 📜 License

This project is licensed under the **MIT License** — free for personal and educational use.
