// Architecture diagram for NavDashboard. Same conventions as
// InfraArchitectureDiagram: inline SVG on the design tokens, connector lines
// drawn after the boxes they cross, unique marker ids per diagram.
const NavDashboardArchitectureDiagram = () => (
  <div className="overflow-x-auto rounded-lg border bg-muted/30 p-4">
    <svg
      viewBox="0 0 880 430"
      role="img"
      aria-label="Architecture diagram: a React 18 single-page app reaches nav.madhur.dev through Cloudflare Tunnel; nginx is the single published port and proxies to an async FastAPI backend of feature modules behind a per-section permission layer; data lives in PostgreSQL with PostGIS and pgvector, Redis, and MinIO object storage; an Ollama model on the host powers the AI assistant."
      className="min-w-[680px] w-full h-auto font-sans"
    >
      <defs>
        <marker id="nav-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-muted-foreground" />
        </marker>
      </defs>

      {/* ---- Browser ----------------------------------------------------- */}
      <rect x="16" y="150" width="128" height="70" rx="10" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="80" y="178" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="600">Browser</text>
      <text x="80" y="196" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">React 18 SPA · antd</text>

      {/* ---- Cloudflare Tunnel ------------------------------------------- */}
      <rect x="176" y="152" width="118" height="66" rx="10" className="fill-primary/10 stroke-primary/40" strokeWidth="1" />
      <text x="235" y="180" textAnchor="middle" className="fill-primary" fontSize="12" fontWeight="600">Cloudflare</text>
      <text x="235" y="196" textAnchor="middle" className="fill-primary" fontSize="12" fontWeight="600">Tunnel</text>

      {/* ---- Compose box ------------------------------------------------- */}
      <rect x="326" y="18" width="538" height="394" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="344" y="46" className="fill-foreground" fontSize="13.5" fontWeight="600">Docker Compose</text>
      <text x="344" y="64" className="fill-muted-foreground" fontSize="11">single published port · everything else internal</text>

      {/* nginx */}
      <rect x="344" y="156" width="96" height="58" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
      <text x="392" y="182" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">nginx</text>
      <text x="392" y="198" textAnchor="middle" className="fill-muted-foreground" fontSize="10">:80 only</text>

      {/* FastAPI */}
      <rect x="478" y="146" width="180" height="78" rx="8" className="fill-background stroke-border" strokeWidth="1.5" />
      <text x="568" y="170" textAnchor="middle" className="fill-foreground" fontSize="12.5" fontWeight="600">FastAPI (async)</text>
      <text x="568" y="187" textAnchor="middle" className="fill-muted-foreground" fontSize="10">SQLAlchemy 2 · Alembic</text>
      <rect x="492" y="196" width="152" height="18" rx="9" className="fill-primary/10 stroke-primary/40" strokeWidth="1" />
      <text x="568" y="209" textAnchor="middle" className="fill-primary" fontSize="9.5" fontWeight="600">per-section RBAC · view / edit / manage</text>

      {/* Feature module chips */}
      <text x="568" y="262" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5" fontWeight="600">feature modules</text>
      {(
        [
          ['Devices', 'Inventory', 'Personnel'],
          ['Attendance', 'Gate pass + QR', 'Exports'],
          ['Audit trail', 'Reports', 'AI assistant'],
        ] as const
      ).map((row, r) =>
        row.map((label, c) => (
          <g key={label}>
            <rect x={446 + c * 84} y={272 + r * 36} width={78} height={28} rx="6" className="fill-muted stroke-border" strokeWidth="1" />
            <text x={485 + c * 84} y={290 + r * 36} textAnchor="middle" className="fill-foreground" fontSize="9.5" fontWeight="500">{label}</text>
          </g>
        ))
      )}

      {/* Data stores */}
      <rect x="712" y="112" width="136" height="52" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
      <text x="780" y="133" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">PostgreSQL</text>
      <text x="780" y="149" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">PostGIS · pgvector</text>

      <rect x="712" y="176" width="136" height="40" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
      <text x="780" y="200" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Redis</text>

      <rect x="712" y="228" width="136" height="52" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
      <text x="780" y="249" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">MinIO</text>
      <text x="780" y="265" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">object storage</text>

      {/* Ollama on host */}
      <rect x="344" y="330" width="86" height="62" rx="8" className="fill-background stroke-primary/40" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="387" y="356" textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="600">Ollama</text>
      <text x="387" y="372" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">on the host</text>

      {/* ---- Connectors (drawn last) ------------------------------------- */}
      <line x1="144" y1="185" x2="172" y2="185" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#nav-arrow)" />
      <line x1="294" y1="185" x2="340" y2="185" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#nav-arrow)" />
      <text x="317" y="175" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">HTTPS</text>
      <line x1="440" y1="185" x2="474" y2="185" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#nav-arrow)" />
      {/* FastAPI -> stores */}
      <line x1="658" y1="162" x2="708" y2="140" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#nav-arrow)" />
      <line x1="658" y1="192" x2="708" y2="195" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#nav-arrow)" />
      <line x1="658" y1="216" x2="708" y2="248" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#nav-arrow)" />
      {/* FastAPI -> modules */}
      <line x1="568" y1="224" x2="568" y2="248" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#nav-arrow)" />
      {/* AI assistant module -> Ollama, routed under the chip grid so the
          dashed line doesn't cut through the other module chips */}
      <path d="M 653 376 V 388 H 438" fill="none" className="stroke-primary" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#nav-arrow)" />

      {/* Callout */}
      <text x="16" y="272" className="fill-muted-foreground" fontSize="11">
        <tspan x="16" dy="0">Every request enters through one port;</tspan>
        <tspan x="16" dy="16">the permission layer decides per section</tspan>
        <tspan x="16" dy="16">what each account may view, edit,</tspan>
        <tspan x="16" dy="16">or manage.</tspan>
      </text>
    </svg>
  </div>
);

export default NavDashboardArchitectureDiagram;
