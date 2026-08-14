// Architecture diagram for SpeakInsights. Same conventions as the other
// diagrams in this directory: inline SVG on the design tokens, connectors
// drawn after boxes, unique marker ids.
const SpeakInsightsArchitectureDiagram = () => (
  <div className="overflow-x-auto rounded-lg border bg-muted/30 p-4">
    <svg
      viewBox="0 0 880 400"
      role="img"
      aria-label="Architecture diagram: participants join a LiveKit WebRTC conference from the React app; an async FastAPI backend with a Redis job queue sends recorded audio through WhisperX transcription with speaker attribution, then Ollama summarization and task extraction; transcripts and embeddings land in PostgreSQL with pgvector, which powers retrieval-augmented chat over past meetings. Everything runs on-premises in Docker — meeting audio never leaves the deployment."
      className="min-w-[680px] w-full h-auto font-sans"
    >
      <defs>
        <marker id="si-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-muted-foreground" />
        </marker>
        <marker id="si-arrow-primary" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-primary" />
        </marker>
      </defs>

      {/* ---- Participants ------------------------------------------------ */}
      <rect x="16" y="80" width="126" height="64" rx="10" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="79" y="106" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="600">Participants</text>
      <text x="79" y="124" textAnchor="middle" className="fill-muted-foreground" fontSize="10.5">React 18 app</text>

      {/* ---- Deployment box ---------------------------------------------- */}
      <rect x="176" y="16" width="688" height="368" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="194" y="44" className="fill-foreground" fontSize="13.5" fontWeight="600">Self-hosted deployment — Docker</text>
      <text x="194" y="62" className="fill-muted-foreground" fontSize="11">no third-party API calls · meeting audio never leaves it</text>

      {/* LiveKit */}
      <rect x="200" y="86" width="140" height="64" rx="8" className="fill-background stroke-border" strokeWidth="1.5" />
      <text x="270" y="112" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">LiveKit WebRTC</text>
      <text x="270" y="129" textAnchor="middle" className="fill-muted-foreground" fontSize="10">conferencing, up to 20</text>

      {/* Orchestrator */}
      <rect x="200" y="196" width="140" height="78" rx="8" className="fill-background stroke-border" strokeWidth="1.5" />
      <text x="270" y="222" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">FastAPI (async)</text>
      <text x="270" y="239" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Redis job queue</text>
      <text x="270" y="255" textAnchor="middle" className="fill-muted-foreground" fontSize="10">pipeline orchestration</text>

      {/* Pipeline stages */}
      <rect x="392" y="86" width="150" height="72" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
      <text x="467" y="110" textAnchor="middle" className="fill-foreground" fontSize="11.5" fontWeight="600">WhisperX</text>
      <text x="467" y="126" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">transcription +</text>
      <text x="467" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">speaker attribution</text>

      <rect x="580" y="86" width="150" height="72" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
      <text x="655" y="110" textAnchor="middle" className="fill-foreground" fontSize="11.5" fontWeight="600">Ollama</text>
      <text x="655" y="126" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">summaries ·</text>
      <text x="655" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">task extraction</text>

      {/* Store */}
      <rect x="700" y="216" width="148" height="64" rx="8" className="fill-muted stroke-border" strokeWidth="1" />
      <text x="774" y="240" textAnchor="middle" className="fill-foreground" fontSize="11.5" fontWeight="600">PostgreSQL</text>
      <text x="774" y="256" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">transcripts · pgvector</text>

      {/* RAG chat */}
      <rect x="392" y="300" width="200" height="56" rx="8" className="fill-primary/10 stroke-primary/40" strokeWidth="1" />
      <text x="492" y="322" textAnchor="middle" className="fill-primary" fontSize="11.5" fontWeight="600">RAG chat over meetings</text>
      <text x="492" y="338" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">retrieval from pgvector · answers via Ollama</text>

      {/* ---- Connectors (drawn last) ------------------------------------- */}
      {/* participants <-> livekit */}
      <line x1="142" y1="112" x2="196" y2="112" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#si-arrow)" markerStart="url(#si-arrow)" />
      {/* livekit -> fastapi (audio down) */}
      <line x1="270" y1="150" x2="270" y2="192" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#si-arrow)" />
      <text x="292" y="176" textAnchor="middle" className="fill-muted-foreground" fontSize="9.5">audio</text>
      {/* fastapi -> whisperx */}
      <line x1="340" y1="220" x2="416" y2="162" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#si-arrow)" />
      {/* whisperx -> ollama */}
      <line x1="542" y1="122" x2="576" y2="122" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#si-arrow)" />
      {/* ollama -> postgres */}
      <line x1="686" y1="158" x2="750" y2="212" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#si-arrow)" />
      {/* postgres -> rag chat */}
      <line x1="696" y1="278" x2="576" y2="310" className="stroke-primary" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#si-arrow-primary)" />
      {/* fastapi -> rag chat */}
      <line x1="292" y1="278" x2="404" y2="306" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#si-arrow)" />

      {/* Callout */}
      <text x="16" y="230" className="fill-muted-foreground" fontSize="11">
        <tspan x="16" dy="0">Recording, transcription,</tspan>
        <tspan x="16" dy="16">and summarization all run</tspan>
        <tspan x="16" dy="16">inside the deployment —</tspan>
        <tspan x="16" dy="16">nothing is sent to a</tspan>
        <tspan x="16" dy="16">cloud API.</tspan>
      </text>
    </svg>
  </div>
);

export default SpeakInsightsArchitectureDiagram;
