// src/routes/+layout.js

// This disables server-side rendering for the entire app
// Since we're building a client-side documentation site
export const ssr = false;

// Enable client-side routing
export const csr = true;

// Preload strategy for faster navigation
export const prerender = false;