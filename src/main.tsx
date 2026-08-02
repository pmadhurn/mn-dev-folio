import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root")!;

// The build injects a plain-HTML snapshot of the site into #root for crawlers and
// no-JavaScript clients (see scripts/prerender.ts). Once React is running it owns
// the container, so clear the fallback explicitly before mounting.
container.replaceChildren();

createRoot(container).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
