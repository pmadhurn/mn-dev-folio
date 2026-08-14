// Architecture diagram for the self-hosted infrastructure project.
//
// Inline SVG rather than a raster in public/ so every color rides the theme
// tokens — the diagram stays legible in both light and dark without shipping
// two images. Fill/stroke utilities come from the same palette as the rest of
// the site, so a future rebrand retones this for free.
const InfraArchitectureDiagram = () => (
  <div className="overflow-x-auto rounded-lg border bg-muted/30 p-4">
    <svg
      viewBox="0 0 860 400"
      role="img"
      aria-label="Architecture diagram: visitors reach Cloudflare's edge over HTTPS; a cloudflared connector inside the Oracle Cloud ARM64 instance dials out to Cloudflare, so no inbound ports are open; tunnel ingress rules route each subdomain to one of six Docker Compose services, which persist state to named volumes."
      className="min-w-[640px] w-full h-auto font-sans"
    >
      <defs>
        <marker id="infra-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-muted-foreground" />
        </marker>
        <marker id="infra-arrow-primary" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-primary" />
        </marker>
      </defs>

      {/* ---- Visitors ---------------------------------------------------- */}
      <rect x="16" y="120" width="128" height="64" rx="10" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="80" y="146" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="600">Visitors</text>
      <text x="80" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="11">*.madhur.dev</text>

      {/* Visitors -> Cloudflare */}
      <line x1="144" y1="152" x2="216" y2="152" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#infra-arrow)" />
      <text x="180" y="142" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">HTTPS</text>

      {/* ---- Cloudflare edge --------------------------------------------- */}
      <rect x="220" y="96" width="150" height="112" rx="10" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="295" y="122" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="600">Cloudflare Edge</text>
      <text x="295" y="142" textAnchor="middle" className="fill-muted-foreground" fontSize="11">DNS · TLS · Zero Trust</text>
      <rect x="236" y="156" width="118" height="34" rx="7" className="fill-primary/10 stroke-primary/40" strokeWidth="1" />
      <text x="295" y="177" textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="600">Tunnel endpoint</text>

      {/* ---- OCI instance ------------------------------------------------ */}
      <rect x="410" y="20" width="434" height="360" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="428" y="48" className="fill-foreground" fontSize="13.5" fontWeight="600">Oracle Cloud instance</text>
      <text x="428" y="66" className="fill-muted-foreground" fontSize="11">ARM64 · 4 vCPU / 24 GB · Ubuntu · no open inbound ports</text>

      {/* cloudflared connector */}
      <rect x="446" y="150" width="120" height="46" rx="8" className="fill-primary/10 stroke-primary/40" strokeWidth="1" />
      <text x="506" y="170" textAnchor="middle" className="fill-primary" fontSize="12" fontWeight="600">cloudflared</text>
      <text x="506" y="186" textAnchor="middle" className="fill-muted-foreground" fontSize="10">ingress rules</text>

      {/* Tunnel: cloudflared dials OUT — arrow points from instance to edge.
          Drawn after both boxes so the line and its label sit on top of them. */}
      <line x1="446" y1="173" x2="358" y2="173" className="stroke-primary" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#infra-arrow-primary)" />
      <rect x="362" y="149" width="80" height="17" rx="8.5" className="fill-card stroke-primary/40" strokeWidth="1" />
      <text x="402" y="161" textAnchor="middle" className="fill-primary" fontSize="9.5" fontWeight="600">outbound-only</text>

      {/* cloudflared -> docker network */}
      <line x1="566" y1="173" x2="614" y2="173" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#infra-arrow)" />
      <text x="590" y="163" textAnchor="middle" className="fill-muted-foreground" fontSize="10">route</text>

      {/* Docker network */}
      <rect x="618" y="84" width="206" height="216" rx="10" className="fill-background stroke-border" strokeWidth="1.5" />
      <text x="721" y="106" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Docker Compose</text>

      {(
        [
          ['Open WebUI', 'Ollama'],
          ['n8n', 'Supabase'],
          ['Portainer', 'code-server'],
        ] as const
      ).map(([left, right], row) => (
        <g key={left}>
          <rect x="632" y={118 + row * 58} width="86" height="40" rx="7" className="fill-muted stroke-border" strokeWidth="1" />
          <text x="675" y={142 + row * 58} textAnchor="middle" className="fill-foreground" fontSize="10.5" fontWeight="500">{left}</text>
          <rect x="726" y={118 + row * 58} width="86" height="40" rx="7" className="fill-muted stroke-border" strokeWidth="1" />
          <text x="769" y={142 + row * 58} textAnchor="middle" className="fill-foreground" fontSize="10.5" fontWeight="500">{right}</text>
        </g>
      ))}

      {/* Volumes */}
      <g>
        <path
          d="M 640 330 a 82 10 0 0 1 164 0 v 22 a 82 10 0 0 1 -164 0 z"
          className="fill-muted stroke-border"
          strokeWidth="1.5"
        />
        <ellipse cx="722" cy="330" rx="82" ry="10" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="722" y="352" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">named volumes</text>
      </g>
      <line x1="721" y1="300" x2="721" y2="316" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#infra-arrow)" />

      {/* Callout */}
      <text x="16" y="266" className="fill-muted-foreground" fontSize="11">
        <tspan x="16" dy="0">The tunnel is dialed from inside the instance,</tspan>
        <tspan x="16" dy="16">so nothing on the public internet can reach it</tspan>
        <tspan x="16" dy="16">directly — there is no port to scan.</tspan>
      </text>
    </svg>
  </div>
);

export default InfraArchitectureDiagram;
