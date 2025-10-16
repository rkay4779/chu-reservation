// import '../css/app.css';

// import { createInertiaApp } from '@inertiajs/react';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { createRoot } from 'react-dom/client';
// import { initializeTheme } from './hooks/use-appearance';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


// createInertiaApp({
//     title: (title) => (title ? `${title} - ${appName}` : appName),
//     resolve: (name) =>
//         resolvePageComponent(
//             `./pages/${name}.tsx`,
//             import.meta.glob('./pages/**/*.tsx'),
//         ),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(<App {...props} />);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });

// This will set light / dark mode on load...

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { initializeTheme } from './hooks/use-appearance';
import "../css/app.css";


const pages = import.meta.glob(
  [
    './pages/**/*.tsx',
    './pages/**/*.jsx',
    './pages/**/*.ts',
    './pages/**/*.js',
    './Pages/**/*.tsx',
    './Pages/**/*.jsx',
    './Pages/**/*.ts',
    './Pages/**/*.js',
  ],
  { eager: true }
)
console.log("Pages loaded:", Object.keys(pages));
function resolvePage(name: string) {
  const candidates = [
    `./pages/${name}.tsx`,`./pages/${name}.jsx`,`./pages/${name}.ts`,`./pages/${name}.js`,
    `./pages/${name}/index.tsx`,`./pages/${name}/index.jsx`,`./pages/${name}/index.ts`,`./pages/${name}/index.js`,
    `./Pages/${name}.tsx`,`./Pages/${name}.jsx`,`./Pages/${name}.ts`,`./Pages/${name}.js`,
    `./Pages/${name}/index.tsx`,`./Pages/${name}/index.jsx`,`./Pages/${name}/index.ts`,`./Pages/${name}/index.js`,
  ]
  for (const key of candidates) {
    // @ts-ignore
    if (pages[key]) return pages[key]
  }
  console.error('Inertia page not found. Tried:', candidates)
  throw new Error(`Page not found: ./pages/${name}.tsx`)
}

createInertiaApp({
  resolve: (name) => resolvePage(name),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
initializeTheme();