# Cinemus

A movie discovery app built with **Next.js** and the **TMDB API**, developed as part of Noon's frontend case study challenge.

---

## 1. Introduction

**Cinemus** is a dynamic web application that allows users to search for movies, browse detailed information (including cast, director, synopsis), and explore paginated results — all powered by the public [TMDB API](https://www.themoviedb.org/).

The project leverages **Next.js** with both server-side rendering (SSR) and client-side rendering (CSR) where appropriate. It demonstrates my skills in:

- Next.js framework 
- React and state management with Zustand
- API integration and secure client-server communication
- Frontend best practices

---


## 2. Getting Started

This project uses **[Bun](https://bun.sh/)** as the JavaScript runtime, offering significantly faster installs and native TypeScript/JSX support.

### To run the project locally:

> **Note:** Skip this step if a `.env` file is already provided.

Create a `.env` file by copying from `.env.example`, then add your TMDB API key.



```bash
bun install
bun dev
```

---

## 3. Design Decisions & Development Insights

### 3.1 Design Decisions

1. **SSR vs CSR**  
   A key architectural decision was when to use Server-Side Rendering (SSR) versus Client-Side Rendering (CSR).  
   - CSR was chosen for **Search** and **Favorites** pages where interactivity is crucial.
   - SSR was applied to the **Movie Details** page to benefit from SEO and keep API secrets server-side.
   - To avoid exposing TMDB API keys in client code, I used **API route handlers** to proxy requests securely through the server.

2. **State Management with Sets**  
   I used a `Set` instead of an array for managing favorites to achieve O(1) performance on `add`, `delete`, and `has` operations. While this introduced complexity in persisting the data to `localStorage` (due to `Set` being non-serializable), I overcame it by customizing Zustand’s `partialize` and `merge` options.

3. **Movie Card UI Design Choices**  
   To reduce clutter, I moved movie metadata (title, year, rating) into a hover overlay on cards. This kept the focus on the poster artwork and improved visual hierarchy.  
   For mobile users (no hover), I added a fallback: first tap shows the overlay, second tap navigates to the details page — a solution balancing usability and aesthetics.

### 3.2 Challenges & How I Overcame Them

1. **Learning Next.js Under Time Pressure**  
   This was my first real project using Next.js. Balancing this task with a full-time job was a challenge. I dedicated my free time to crash courses, documentation, and practice. The experience significantly improved my understanding of the framework.

2. **Switching from Tailwind to CSS Modules**  
   I’m comfortable with Tailwind CSS, but the project requirement was to use CSS/SASS Modules. Initially, it slowed me down due to syntax differences and having to write more custom styles. However, with a lot of Googling and Stack Overflow help 😄, I adapted quickly and delivered what I would say is a decently clean result.

---

## 4. Bonus Features

- **Interactive Pagination**  
  Users can navigate through paginated movie search results using a dynamic, accessible pagination component.

---

## 5. Acknowledgements

Made by **Mena Saleh**  
Mena.a.saleh.2001@gmail.com  
+20 128 500 5268

---
