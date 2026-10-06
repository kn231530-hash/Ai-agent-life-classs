import { Mentor, AcademyTrack, VoiceDrill, SessionRecording, UserProgress } from '../types';

export const MENTORS: Mentor[] = [
  {
    id: 'aria',
    name: 'Aria Vance',
    title: 'Neural Systems Architect',
    specialty: 'Distributed Consensus & Resilient Scale',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    voiceStyle: 'Crisp, Analytical, Socratic',
    accent: 'Neutral Transatlantic',
    pitch: 1.05,
    rate: 1.02,
    tag: 'Tier V · Architecture',
    systemPrompt: 'You are Aria Vance, principal architect specializing in zero-latency distributed systems and fault-tolerant computing. You test first principles and challenge assumptions sharply but constructively.'
  },
  {
    id: 'kaelen',
    name: 'Kaelen Cross',
    title: 'High-Stakes Rhetoric Master',
    specialty: 'Executive Persuasion & Boardroom Defense',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    voiceStyle: 'Authoritative, Resonant, Dynamic',
    accent: 'Oxford British',
    pitch: 0.92,
    rate: 0.98,
    tag: 'Tier IV · Rhetoric',
    systemPrompt: 'You are Kaelen Cross, executive speech coach and strategic negotiator. You teach vocal presence, cadenced pause techniques, framing, and handling hostile inquiries with grace.'
  },
  {
    id: 'elena',
    name: 'Dr. Elena Rostova',
    title: 'Frontier AI & Cognitive Scientist',
    specialty: 'Transformer Dynamics & Neural Latency',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    voiceStyle: 'Inquisitive, Piercing, Fast-Paced',
    accent: 'Slavic-Euro Clean',
    pitch: 1.1,
    rate: 1.05,
    tag: 'Tier V · Frontier AI',
    systemPrompt: 'You are Dr. Elena Rostova, researcher in multimodal intelligence and neural memory models. You dive straight into mathematical rigor and intuitive analogies.'
  },
  {
    id: 'marcus',
    name: 'Marcus Thorne',
    title: 'Adversarial Socratic Inquisitor',
    specialty: 'Stress Inoculation & Crisis Defense',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    voiceStyle: 'Stern, Socratic, Rapid',
    accent: 'Midwest Precision',
    pitch: 0.88,
    rate: 1.08,
    tag: 'Tier IV · Crisis',
    systemPrompt: 'You are Marcus Thorne, former legal litigator and tech crisis counsel. You push learners to defend technical choices under intense interrogation.'
  }
];

export const ACADEMY_TRACKS: AcademyTrack[] = [
  {
    id: 'track-arch',
    title: 'Distributed Systems & Zero-Downtime Scale',
    tier: 'Level IV · Mastery Tier',
    tierLevel: 4,
    category: 'architecture',
    icon: 'Layers',
    description: 'Master consensus algorithms, partitioning resilience, and sub-10ms edge caching through live voice defense against architect bots.',
    progressPercent: 68,
    totalLessons: 6,
    completedLessons: 4,
    estimatedHours: '8.5h',
    color: 'cyan',
    lessons: [
      {
        id: 'lesson-raft',
        title: 'Deconstructing Raft vs Paxos Consensus',
        duration: '18 min',
        xp: 150,
        description: 'Articulate split-brain mitigation, log compaction, and leader election protocols in under 3 minutes.',
        status: 'completed',
        checklist: [
          { id: 'c1', label: 'Define Term Numbers & Heartbeat Timers', completed: true },
          { id: 'c2', label: 'Explain Joint Consensus Configuration Change', completed: true },
          { id: 'c3', label: 'Socratic Voice Check: Handling Quorum Loss', completed: true }
        ],
        voiceChallenge: {
          prompt: 'A junior engineer asks: "Why not just use Paxos everywhere instead of Raft?" Explain the state machine replication difference and mental model in 60 seconds.',
          targetSeconds: 60,
          criteria: ['Clarity of understandability vs formality', 'State machine log replication sequence', 'Brevity under 60 seconds'],
          sampleResponse: 'Raft decomposed consensus into leader election, log replication, and safety. While Multi-Paxos is mathematically equivalent, Raft enforces a strict invariant: logs only flow from leader to follower, eliminating multi-path drift.'
        }
      },
      {
        id: 'lesson-cap',
        title: 'CAP Theorem & Real-World PACELC Tradeoffs',
        duration: '22 min',
        xp: 180,
        description: 'Break down partition tolerance versus consistency tradeoffs under live simulated network splits.',
        status: 'completed',
        checklist: [
          { id: 'c4', label: 'Formulate Latency vs Consistency when Partitioned', completed: true },
          { id: 'c5', label: 'Compare DynamoDB vs Spanner storage engines', completed: true },
          { id: 'c6', label: 'Defend Eventual Consistency to financial stakeholders', completed: true }
        ],
        voiceChallenge: {
          prompt: 'Your VP of Product demands "100% immediate consistency and zero latency across 4 continents without data center delays." Defend the physics of PACELC.',
          targetSeconds: 75,
          criteria: ['Acknowledge speed of light in fiber', 'Present optimistic updates with compensating transactions', 'Authoritative calm cadence'],
          sampleResponse: 'The speed of light across continents introduces an irreducible 140ms round-trip latency. We cannot break PACELC, but we can employ optimistic client-side execution with transactional rollbacks on the ledger.'
        }
      },
      {
        id: 'lesson-edge',
        title: 'Sub-10ms Edge Gateways & Cache Invalidation',
        duration: '25 min',
        xp: 210,
        description: 'Defend cache tier architectures against stale data anomalies and dogpiling phenomena.',
        status: 'in-progress',
        checklist: [
          { id: 'c7', label: 'Thundering Herd mitigation with SingleFlight', completed: true },
          { id: 'c8', label: 'Event-driven TTL vs Redis cluster pub/sub', completed: false },
          { id: 'c9', label: 'Live Voice Arena with Mentor Aria', completed: false }
        ],
        voiceChallenge: {
          prompt: 'Your edge cache experiences a flash invalidation spike of 500,000 req/sec on product drops. Present your mitigation strategy.',
          targetSeconds: 90,
          criteria: ['Probabilistic early expiration (XFetch)', 'Mutex request coalescing / singleflight', 'Graceful stale-while-revalidate fallback'],
          sampleResponse: 'We deploy two layers: first, SingleFlight mutex locks collapse concurrent origin fetches into a single flight. Second, stale-while-revalidate serves cache with background rehydration, preventing origin collapse.'
        }
      },
      {
        id: 'lesson-sharding',
        title: 'Zero-Downtime Sharding & Resharding',
        duration: '30 min',
        xp: 250,
        description: 'Navigate consistent hashing rings and online data migration under 40k QPS.',
        status: 'locked',
        checklist: [
          { id: 'c10', label: 'Virtual nodes distribution', completed: false },
          { id: 'c11', label: 'Dual-write dual-read verification loops', completed: false },
          { id: 'c12', label: 'Final cutover voice simulation', completed: false }
        ],
        voiceChallenge: {
          prompt: 'Explain the 4-phase zero-downtime database resharding migration plan to your executive steering committee.',
          targetSeconds: 90,
          criteria: ['Dual writes', 'Shadow reads', 'Backfill validation', 'Final switchover'],
          sampleResponse: 'Phase 1 dual-writes to both shards. Phase 2 backfills historical data with checksums. Phase 3 enables shadow reads for parity checks. Phase 4 promotes the new shard as canonical.'
        }
      }
    ]
  },
  {
    id: 'track-rhetoric',
    title: 'Executive Persuasion & High-Stakes Vocal Range',
    tier: 'Level III · Advanced Tier',
    tierLevel: 3,
    category: 'rhetoric',
    icon: 'Mic',
    description: 'Transform technical jargon into commanding executive narratives. Cut filler words, master tactical pauses, and project gravitas.',
    progressPercent: 82,
    totalLessons: 5,
    completedLessons: 4,
    estimatedHours: '6.0h',
    color: 'violet',
    lessons: [
      {
        id: 'lesson-pitch60',
        title: 'The 60-Second Executive Pitch',
        duration: '15 min',
        xp: 140,
        description: 'Compress an enterprise AI initiative into problem, economic moat, and immediate call to action in exactly 60 seconds.',
        status: 'completed',
        checklist: [
          { id: 'r1', label: 'Hook with the cost of inaction', completed: true },
          { id: 'r2', label: 'Articulate the asymmetrical leverage', completed: true },
          { id: 'r3', label: 'Eliminate all "basically" and "kind of" filler words', completed: true }
        ],
        voiceChallenge: {
          prompt: 'Deliver a 60-second pitch to a Board of Directors justifying a $4M investment in sovereign inference infrastructure.',
          targetSeconds: 60,
          criteria: ['Zero fillers', 'Pacing between 135-155 WPM', 'Concrete ROI metrics'],
          sampleResponse: 'Every month we rely on third-party inference, our proprietary IP leaks to model aggregators and our margins erode by 18%. Owning our inference stack cuts RTT by 40% and secures our customer data moat.'
        }
      },
      {
        id: 'lesson-pause',
        title: 'The Power of the 2-Second Socratic Pause',
        duration: '18 min',
        xp: 160,
        description: 'Use silence as a weapon against hostile inquiries instead of rushing into nervous filler sounds.',
        status: 'completed',
        checklist: [
          { id: 'r4', label: 'Breathe from the diaphragm on hostile objection', completed: true },
          { id: 'r5', label: 'Hold eye contact & 2.1s acoustic silence', completed: true },
          { id: 'r6', label: 'Reframe with a question before answering', completed: true }
        ],
        voiceChallenge: {
          prompt: 'A client interrupts: "Your architecture is unnecessarily complex and twice as expensive as AWS native." Pause, reframe, and answer.',
          targetSeconds: 60,
          criteria: ['Deliberate 2-second pause', 'Calm tone without defensive inflection', 'Value-based reframe'],
          sampleResponse: '[Pause]... What looks like upfront complexity is actually our insurance against $2M lock-in penalties and vendor egress tariffs when you scale.'
        }
      },
      {
        id: 'lesson-range',
        title: 'Vocal Frequency Modulation & Cadence Shifts',
        duration: '22 min',
        xp: 200,
        description: 'Vary pitch and pace to capture attention: accelerate on urgency, drop pitch on critical directives.',
        status: 'in-progress',
        checklist: [
          { id: 'r7', label: 'Downward inflection on declarative statements', completed: true },
          { id: 'r8', label: 'Cadence variation between 110 WPM and 160 WPM', completed: false },
          { id: 'r9', label: 'Resonance chamber calibration', completed: false }
        ],
        voiceChallenge: {
          prompt: 'Deliver an incident announcement to an engineering org: explain the severity first with urgent tempo, then shift to a calm, deep directive.',
          targetSeconds: 70,
          criteria: ['Pitch descent on closing remarks', 'Tempo contrast between situation and solution', 'Authoritative resonance'],
          sampleResponse: 'Team, our primary queue is backed up by 12 million events. Latency is spiking. [Pitch drops, tempo slows]. Here is what we do now: isolate the ingestion worker, purge dead letters, and maintain communication on channel alpha.'
        }
      }
    ]
  },
  {
    id: 'track-frontier',
    title: 'Frontier AI Architecture & Multimodal Reasoning',
    tier: 'Level V · Elite Tier',
    tierLevel: 5,
    category: 'frontier-ai',
    icon: 'Cpu',
    description: 'Explain attention heads, speculative decoding, KV-cache optimization, and agentic tool-use loops under live technical scrutiny.',
    progressPercent: 45,
    totalLessons: 6,
    completedLessons: 2,
    estimatedHours: '9.0h',
    color: 'cyan',
    lessons: [
      {
        id: 'lesson-speculative',
        title: 'Speculative Decoding & KV Cache Compaction',
        duration: '20 min',
        xp: 220,
        description: 'Walk through how small draft models verify candidate tokens in parallel on GPU tensor cores.',
        status: 'completed',
        checklist: [
          { id: 'fa1', label: 'Draft vs Target model acceptance rate', completed: true },
          { id: 'fa2', label: 'PagedAttention memory footprint reduction', completed: true },
          { id: 'fa3', label: 'Voice defense with Dr. Elena', completed: true }
        ],
        voiceChallenge: {
          prompt: 'Explain speculative decoding to a staff engineer who thinks it is just batching.',
          targetSeconds: 60,
          criteria: ['Draft model generation', 'Single-pass parallel verification', 'Mathematical equivalency'],
          sampleResponse: 'Speculative decoding lets a tiny 1B draft model generate K tokens cheaply, which the 70B target verifies in a single forward pass. Because memory bandwidth is the bottleneck, this yields a 2.5x speedup with zero degradation.'
        }
      },
      {
        id: 'lesson-agents',
        title: 'Agentic Tool Loops & Cognitive Reflexion',
        duration: '25 min',
        xp: 250,
        description: 'Design self-correcting ReAct loops with guardrails against hallucinated parameter payloads.',
        status: 'in-progress',
        checklist: [
          { id: 'fa4', label: 'Tool execution verification protocols', completed: true },
          { id: 'fa5', label: 'Tree-of-thoughts search evaluation', completed: false },
          { id: 'fa6', label: 'Adversarial jailbreak resistance', completed: false }
        ],
        voiceChallenge: {
          prompt: 'Why do naive LLM agent loops fail in production, and how does your architecture prevent unbounded recursion?',
          targetSeconds: 75,
          criteria: ['State machine determinism', 'Depth-limited backtracking', 'Dry-run schemas'],
          sampleResponse: 'Naive loops fail from compounding hallucinations and circular tool invocations. We enforce strict deterministic state graphs with max token budgets and explicit schema validation before real state mutation.'
        }
      }
    ]
  }
];

export const VOICE_DRILLS: VoiceDrill[] = [
  {
    id: 'drill-pitch',
    title: 'The 60-Second Elevator Crucible',
    category: 'Executive Delivery',
    difficulty: 'Practitioner',
    targetDuration: 60,
    description: 'Articulate value proposition under time pressure. Zero filler tolerance.',
    scenario: 'You have entered an elevator with the Chief Technology Officer of a Fortune 50 enterprise. You have exactly until the 40th floor to pitch your low-latency infrastructure upgrade.',
    evaluationRubric: ['Sub-60s completion', 'Under 2 filler words', 'Clear financial leverage', 'Actionable closing hook'],
    bestScore: 94
  },
  {
    id: 'drill-socratic',
    title: 'Socratic Architecture Defense',
    category: 'System Resilience',
    difficulty: 'Apex',
    targetDuration: 90,
    description: 'Defend choosing Eventual Consistency over Two-Phase Commit against hostile questioning.',
    scenario: 'Mentor Marcus questions: "2PC guarantees ACID across banks. Why are you risking customer balances on eventual consistency during network partitions?"',
    evaluationRubric: ['Acknowledge failure domain', 'Explain Saga pattern with compensating actions', 'Hold vocal cadence under pressure'],
    bestScore: 88
  },
  {
    id: 'drill-crisis',
    title: 'P0 Incident Outage Briefing',
    category: 'Crisis Command',
    difficulty: 'Advanced',
    targetDuration: 75,
    description: 'Deliver crisp, unhurried directives to stakeholders during a critical database failover.',
    scenario: 'The primary write database is unresponsive. 80,000 active checkout sessions are dropping. Brief the executive room.',
    evaluationRubric: ['Direct situation assessment', 'Concrete mitigation in flight', 'Downbeat authoritative cadence', 'Zero ambiguous language'],
    bestScore: 92
  },
  {
    id: 'drill-eli5',
    title: 'Explain Vector Embeddings to Non-Tech Board',
    category: 'Translation & Clarity',
    difficulty: 'Practitioner',
    targetDuration: 60,
    description: 'Use the spatial library analogy to demystify high-dimensional embeddings for non-technical leadership.',
    scenario: 'A board director says: "Everyone talks about vectors. Is it just keyword search with more electricity?"',
    evaluationRubric: ['Visual analogy used', 'Semantic distance explained', 'No math jargon', 'Clear ROI connection'],
    bestScore: 96
  }
];

export const RECENT_RECORDINGS: SessionRecording[] = [
  {
    id: 'rec-1',
    mentorName: 'Aria Vance',
    topic: 'Consensus Quorums & Network Splits',
    date: 'Today, 07:42 AM',
    duration: '4m 12s',
    latencyAvg: 22,
    wpmAvg: 144,
    fillerCount: 1,
    clarityPercent: 98.4,
    keyTakeaway: 'Mastered split-brain quorum math. Cadence remained steady even during rapid follow-up inquiry.'
  },
  {
    id: 'rec-2',
    mentorName: 'Kaelen Cross',
    topic: 'Vocal Pause Timing on Hostile Inquiries',
    date: 'Yesterday, 05:15 PM',
    duration: '6m 30s',
    latencyAvg: 28,
    wpmAvg: 138,
    fillerCount: 2,
    clarityPercent: 96.8,
    keyTakeaway: 'Achieved authentic 2.2-second pregnant pause before addressing pricing pushback.'
  },
  {
    id: 'rec-3',
    mentorName: 'Dr. Elena Rostova',
    topic: 'KV Cache PagedAttention Tradeoffs',
    date: 'Oct 04, 2026',
    duration: '5m 08s',
    latencyAvg: 19,
    wpmAvg: 151,
    fillerCount: 0,
    clarityPercent: 99.2,
    keyTakeaway: 'Exceptional zero-filler technical breakdown. Flawless explanation of fragmented virtual memory.'
  }
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  level: 4,
  levelTitle: 'Apex Synthesizer',
  currentXp: 4850,
  nextLevelXp: 6000,
  streakDays: 14,
  totalPracticeMinutes: 342,
  averageLatencyMs: 23,
  vocalClarityScore: 97.8,
  radarScores: {
    rhetoric: 88,
    latency: 95,
    architecture: 92,
    brevity: 84,
    cadence: 90
  }
};
