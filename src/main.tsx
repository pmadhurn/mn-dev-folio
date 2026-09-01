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

// Retire the boot loader bar (index.html). `booted` also disarms the 8s
// watchdog that would otherwise reveal the crawler snapshot — see index.html.
document.documentElement.classList.add('booted');
const bootLoader = document.getElementById('boot-loader');
if (bootLoader) {
  // Let the opacity transition play before removing the node.
  setTimeout(() => bootLoader.remove(), 300);
}
