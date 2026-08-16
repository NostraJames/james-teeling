/* Content model for the portfolio catalogue.
   Plain global (no ES module) so the site works over file:// and GitHub Pages
   without a build step. Ported from the Builder Portfolio design handoff. */

const CATEGORIES = [
  { key: 'ai',    label: 'AI & Agentic',    title: 'AI systems, designed and built' },
  { key: 'work',  label: 'Shipped at Scale', title: 'Shipped at scale' },
  { key: 'built', label: 'Built by Hand',    title: 'Built with my own hands' }
];

/* Hero rotation pool — editorially chosen, in order. */
const FEATURED = ['po-copilot', 'opt-in-rebuild', 'full-squish'];

const PROJECTS = [
  /* ---------------------------------------------------------------- AI & Agentic */
  {
    id: 'po-copilot',
    art: './assets/posters/po-copilot.svg', artType: 'line',
    title: 'PO Copilot',
    initial: 'P',
    kicker: 'The blank work item, answered',
    badge: 'Shipped',
    cat: 'ai',
    bg: 'linear-gradient(155deg,#b2622d,#402310)',
    metric: '30–45 min of intake moved ahead of dev',
    blurb: 'A rough idea becomes a Definition-of-Ready-gated Azure DevOps work item through one guided conversation.',
    tags: ['Agentic Workflow', 'RAG', 'Vector Embeddings', 'Azure DevOps API', 'Python'],
    metrics: [
      { value: '~5 min', label: 'down from 30–45, now before dev starts' },
      { value: '2-pass', label: 'keyword + semantic rule retrieval' },
      { value: '1 cmd', label: 'setup for a non-technical PO' }
    ],
    gist: 'Product Owners at American Airlines were too stretched to write real Feature or Story descriptions — most were a bare title. Business Rules sat stale in Word docs on SharePoint, and analytics intake got built after dev was already underway, delaying launch. PO Copilot turns all of that into one guided conversation that produces a rules-checked, DoR-gated work item up front.',
    sections: [
      { kicker: 'the problem', head: 'The blank title was the whole feature.',
        body: 'No problem statement, no proposed solution, no acceptance criteria — not from carelessness, but because POs didn’t have the hours. Business Rules went stale in hard-to-search Word docs, and analytics intake was built after dev had already started, so review came back after launch was supposed to happen.' },
      { kicker: 'what I built', head: 'A conversation, not a form.',
        body: 'A PO brain-dumps in plain English and gets a polished draft back: persona and acceptance criteria enforced as a hard gate, relevant Business Rules cross-checked and cited, analytics documents generated up front instead of after the fact. The AI’s operating rules live as version-controlled markdown, so every PO gets an identical AI and every behaviour change is diffable.',
        pull: 'The system prompt is code, not a setting in a vendor portal.' },
      { kicker: 'the hard part', head: 'Finding a rule you can’t name.',
        body: 'I migrated Business Rules out of Word docs into BookStack, then built retrieval on top. Keyword search only works if you already know the official term — exactly what a newer PO lacks — so a semantic pass (fetch, chunk, embed, index, cosine search) fills the gap. Search "letting someone move seats after boarding" and the Seat Change Request rules come back.',
        pull: 'A vector database would have been more impressive and strictly worse.' },
      { kicker: 'what I got right', head: 'Adoption was the feature.',
        body: 'Seven manual setup steps became one bootstrap command across Mac and Windows, and it degrades gracefully to keyword-only search if embeddings aren’t available. A productivity tool that needs a developer to install is a tool most Product Owners will never adopt.' }
    ],
    href: './projects/po-copilot.html'
  },
  {
    id: 'ma-origination',
    art: './assets/posters/ma-origination.svg', artType: 'line',
    title: 'M&A Origination',
    initial: 'M',
    kicker: 'A multi-agent deal-sourcing workforce',
    badge: 'Shipped',
    cat: 'ai',
    bg: 'linear-gradient(155deg,#645c50,#2e2b25)',
    metric: '25 scored targets from one thesis',
    blurb: 'Specialised agents research companies, keep each client’s investment thesis alive, and score company-to-client fit.',
    tags: ['Multi-Agent Orchestration', 'Claude Code', 'MCP', 'Human-in-the-Loop', 'Markdown + Git'],
    metrics: [
      { value: '25', label: 'fully-scored targets in one campaign' },
      { value: '4', label: 'agent relay: research → verify → edit → publish' },
      { value: '0', label: 'fabricated contacts, by design' }
    ],
    gist: 'Boutique M&A origination ran on human memory — every campaign started from a blank page. I designed and built a coordinated team of narrow AI agents on top of a durable data layer, and it is live and in use at the firm. The knowledge compounds now instead of evaporating; AI drafts, humans decide.',
    sections: [
      { kicker: 'the bet', head: 'The agents aren’t the asset. The memory is.',
        body: 'Two living stores are the spine: one investment thesis per private-equity client, and a tracker of every company the firm has ever touched — which campaign, which client, why, and what happened. Tooling changes; the theses and the tracker come with the firm.' },
      { kicker: 'what I built', head: 'Narrow agents with clean contracts.',
        body: 'A Thesis Architect turns intake calls into a living, dated thesis that tags inferences apart from stated facts. A List Builder translates its firmographics into a search that excludes companies the firm already owns. A Matcher scores fit in both directions — one thesis to a list, and one company to every client.',
        pull: 'Fit and confidence are separate axes. Thin data lowers confidence without faking a low fit.' },
      { kicker: 'the design rule', head: 'Separate generation from verification.',
        body: 'Deep research runs as a relay: an Ultra-Researcher drafts, then an adversarial Verifier re-checks every claim against sources and flags what isn’t supported, then an Editor tightens, then a Publisher formats. A lone model produces confident, plausible, occasionally wrong output.' },
      { kicker: 'what’s next', head: 'Close the loop on the reply.',
        body: 'Response triage: when a company answers weeks later, look it up in the Target Tracker and hand the rep a one-page brief — who this was for, why, and what to know walking into the call.' }
    ],
    href: './projects/ai-origination-system.html'
  },
  {
    id: 'voice-of-customer',
    art: './assets/posters/voice-of-customer.svg', artType: 'line',
    title: 'Voice of Customer',
    initial: 'V',
    kicker: 'Thousands of comments, ranked by demand',
    badge: 'Shipped',
    cat: 'ai',
    bg: 'linear-gradient(155deg,#8c491a,#2e2b25)',
    metric: 'Zero recurring token cost',
    blurb: 'A reusable Python pipeline that reads unstructured customer feedback and quantifies what to build next.',
    tags: ['Python', 'Theme Extraction', 'Customer Feedback', 'Roadmap Prioritisation'],
    metrics: [
      { value: '$0', label: 'recurring AI token cost' },
      { value: 'Reusable', label: 'one pipeline, any feedback corpus' },
      { value: 'Ranked', label: 'themes sized by demand, not volume' }
    ],
    gist: 'Customer feedback arrived as thousands of unstructured comments and left as somebody’s favourite quote in a slide. I built a reusable Python pipeline that surfaces emerging themes and quantifies demand, so roadmap arguments get settled with a number.',
    sections: [
      { kicker: 'the problem', head: 'Everyone had a favourite quote.',
        body: 'Unstructured feedback is easy to collect and almost impossible to prioritise with. Whoever read the most comments won the argument, and nobody could size a theme.' },
      { kicker: 'what I built', head: 'A pipeline, not a subscription.',
        body: 'Reusable Python that identifies emerging themes across the corpus and quantifies demand behind each one — deliberately built without a per-token dependency, so it can be re-run as often as the roadmap needs it.',
        pull: 'Recurring cost is a reason a tool quietly stops being used.' }
    ],
    href: null
  },

  /* -------------------------------------------------------------- Shipped at scale */
  {
    id: 'opt-in-rebuild',
    art: './assets/posters/opt-in-rebuild.svg', artType: 'line',
    title: 'The Opt-In Rebuild',
    initial: 'O',
    kicker: 'A value exchange, not a checkbox',
    badge: 'Shipped',
    cat: 'work',
    bg: 'linear-gradient(155deg,#b2622d,#2e2b25)',
    metric: '400K → 10.7M opt-ins',
    blurb: 'Redesigned the customer journey around a clear value exchange and grew marketing opt-ins twenty-six-fold.',
    tags: ['Mobile App', 'Growth', 'Customer Journey', 'Adobe Analytics'],
    metrics: [
      { value: '10.7M', label: 'marketing opt-ins, up from 400K' },
      { value: '$15.6M', label: 'generated by a single campaign' },
      { value: '26×', label: 'growth in reachable audience' }
    ],
    gist: '400K opt-ins was the ceiling because the ask arrived with nothing offered in return. Rebuilding the flow around a clear value exchange took it to 10.7M — and made a single downstream campaign worth $15.6M.',
    sections: [
      { kicker: 'the problem', head: 'We were asking before we were offering.',
        body: 'The opt-in sat at a moment in the journey where the customer had no reason to say yes. Consent isn’t a checkbox problem — it’s a timing and value problem wearing a checkbox costume.' },
      { kicker: 'what changed', head: 'Move the ask. Name the benefit.',
        body: 'Redesigning the customer-journey flow so the value exchange was explicit — and placed where the customer already wanted something — took opt-ins from 400K to 10.7M.',
        pull: '26× came from changing the offer, not the button.' },
      { kicker: 'what it unlocked', head: 'The audience was the product.',
        body: 'A single campaign into the rebuilt audience generated $15.6M. The growth work wasn’t the campaign; it was making a campaign that size possible in the first place.' }
    ],
    href: null
  },
  {
    id: 'one-way-of-working',
    art: './assets/posters/one-way-of-working.svg', artType: 'line',
    title: 'One Way of Working',
    initial: 'W',
    kicker: 'Five orgs, one work-management platform',
    badge: 'Shipped',
    cat: 'work',
    bg: 'linear-gradient(155deg,#56633f,#201e1d)',
    metric: '5,000+ employees in under 12 months',
    blurb: 'Led an enterprise migration onto a consolidated work-management platform — integration pipelines and all.',
    tags: ['Enterprise Migration', 'Data Pipelines', 'Change Management', 'Azure DevOps'],
    metrics: [
      { value: '5,000+', label: 'employees fully adopted' },
      { value: '<12 mo', label: 'to full enterprise adoption' },
      { value: '5+', label: 'internal organisations aligned' }
    ],
    gist: 'Five internal organisations, five ways of working, five sets of licences. I led the consolidation onto one platform — building the integration pipelines and the cross-portfolio team that made a single way of working stick — with full adoption in under a year.',
    sections: [
      { kicker: 'the problem', head: 'The tools were the symptom.',
        body: 'Misalignment across 5+ internal organisations showed up as duplicate licences and un-joinable data. Swapping tools without first settling how people work just relocates the problem into a new interface.' },
      { kicker: 'what I did', head: 'Form the team before you pick the tool.',
        body: 'I stood up a cross-portfolio team to establish one way of working across those organisations, then built the integration data pipelines so the migration didn’t cost anyone their history.',
        pull: 'Adoption is a design problem, not a training problem.' },
      { kicker: 'the result', head: 'Full adoption, lower spend.',
        body: '5,000+ employees on the consolidated platform in under twelve months, with licensing costs down and one shared definition of what "in progress" means.' }
    ],
    href: null
  },
  {
    id: 'contract-visibility',
    art: './assets/posters/contract-visibility.svg', artType: 'line',
    title: 'Contract Visibility',
    initial: 'C',
    kicker: 'Vendor management, out of the inbox',
    badge: 'Shipped',
    cat: 'work',
    bg: 'linear-gradient(155deg,#a19786,#474238)',
    metric: '+200% contract visibility',
    blurb: 'An automated SharePoint-linked dashboard that made every vendor contract findable — and got the team to keep it clean.',
    tags: ['SharePoint', 'Power Query', 'Excel VBA', 'Process Design'],
    metrics: [
      { value: '200%', label: 'lift in contract visibility' },
      { value: '87%', label: 'lift in data-hygiene adoption' },
      { value: '1', label: 'source of truth, finally' }
    ],
    gist: 'Vendor contracts lived wherever the last person left them. An automated SharePoint-linked dashboard doubled visibility — but the 87% jump in data hygiene came from training the contracting team, not from the dashboard.',
    sections: [
      { kicker: 'the problem', head: 'Nobody could answer "what do we have?"',
        body: 'Contract data was scattered across inboxes and drives, and cross-functional pain points were blocking the work long before anyone got to a negotiation.' },
      { kicker: 'what I built', head: 'Automate the report, then teach the input.',
        body: 'The SharePoint-linked dashboard lifted contract visibility by 200%. The 87% adoption lift in data hygiene came afterwards, from sitting with the contracting team and changing how the data got entered.',
        pull: 'A dashboard shows you the data-quality problem. It doesn’t fix it.' }
    ],
    href: null
  },
  {
    id: 'the-82-percent-pipeline',
    art: './assets/posters/the-82-percent-pipeline.svg', artType: 'line',
    title: 'The 82% Pipeline',
    initial: 'D',
    kicker: 'Analysts unblocked, projects unstuck',
    badge: 'Shipped',
    cat: 'work',
    bg: 'linear-gradient(155deg,#645c50,#402310)',
    metric: '82% faster project turnaround',
    blurb: 'Automated the data pipeline every project queued behind, and cut the analyst bottleneck out of the critical path.',
    tags: ['Data Engineering', 'Automation', 'Tableau', 'User Research'],
    metrics: [
      { value: '82%', label: 'faster project turnaround' },
      { value: '60%', label: 'increase in workflow efficiency' },
      { value: '100%', label: 'adoption of the data tool' }
    ],
    gist: 'Every project waited on a specific analyst. I automated the pipeline they were the bottleneck for, cutting turnaround by 82% — and drove the proprietary data tool to 100% adoption by building what user research said mattered.',
    sections: [
      { kicker: 'the problem', head: 'The dependency was a person.',
        body: 'Project-to-analyst coupling meant throughput was capped by whoever happened to be free. Turnaround was measured in weeks and the queue never emptied.' },
      { kicker: 'what I did', head: 'Ask first, then automate.',
        body: 'I gathered user research on the proprietary data tool and prioritised the features that carried the most value to the people using it — which took adoption to 100% — then automated the pipeline sitting behind them.',
        pull: 'Adoption first, automation second. The reverse just builds a fast tool nobody opens.' },
      { kicker: 'the result', head: '82% off the clock.',
        body: 'Turnaround dropped 82%, workflow efficiency rose 60%, and the analyst bottleneck stopped being a scheduling conversation.' }
    ],
    href: null
  },

  /* ------------------------------------------------------------- Built by hand */
  {
    id: 'full-squish',
    art: './assets/posters/full-squish.jpg', artType: 'photo',
    overlay: 'linear-gradient(155deg,#7281574d,#272e1bc4)',
    title: 'Full Squish',
    initial: 'F',
    kicker: 'Suspension setup, remembered',
    badge: 'App Store',
    cat: 'built',
    bg: 'linear-gradient(155deg,#728157,#272e1b)',
    metric: 'Live on the Apple App Store',
    blurb: 'A mountain bike app that lets riders record, compare and trust their suspension setups.',
    tags: ['React Native', 'Expo', 'TypeScript', 'AI Pair Programming'],
    metrics: [
      { value: 'Live', label: 'on the Apple App Store' },
      { value: '3 mo', label: 'idea to submission' },
      { value: 'TestFlight', label: 'months of beta with real riders' }
    ],
    gist: 'Riders are intimidated by changing their suspension, and nobody remembers what they changed last time. Full Squish records complete setups per trail and riding style so experimenting stops being risky. It shipped to the App Store.',
    sections: [
      { kicker: 'the problem', head: 'Fear of the click.',
        body: 'Beyond the factory setting, suspension setup is intimidating — there is a real fear of making the bike worse. And even if you do experiment, you won’t remember what you changed or how it rode.' },
      { kicker: 'what I built', head: 'Record it, and the fear goes away.',
        body: 'Quick setup recording, multiple stored configurations you can switch between, and notes on trail conditions and feel. The app’s entire job is to make a change reversible.',
        pull: 'If you can always get back, you’ll always try.' },
      { kicker: 'how I built it', head: 'Product thinking by day, code at night.',
        body: 'Structured AI pair programming using user-story mechanics to keep every increment purposeful — React Native and Expo on the front, and months in TestFlight with local riders before launch.' },
      { kicker: 'what it taught me', head: 'The Apple ecosystem is the last mile.',
        body: 'Building the app was the middle of the job. TestFlight, review and the store listing were the part that turned a project into a product.' }
    ],
    href: './projects/fullsquish.html',
    extra: { label: 'App Store', url: 'https://apps.apple.com/us/app/fullsquish/id6751511672' }
  },
  {
    id: 'bike-fit-calculator',
    art: './assets/posters/bike-fit-calculator.png', artType: 'line',
    title: 'Bike Fit Calculator',
    initial: 'B',
    kicker: 'Medium doesn’t mean medium any more',
    badge: 'Shipped',
    cat: 'built',
    bg: 'linear-gradient(155deg,#8fa073,#2e2b25)',
    metric: 'Two bikes bought on it, both fit',
    blurb: 'A serverless RAD calculator that matches a rider to bikes that actually fit, across manufacturers.',
    tags: ['Python', 'AWS Lambda', 'Flask', 'Serverless', 'API'],
    metrics: [
      { value: 'RAD', label: 'one measurement, any manufacturer' },
      { value: 'Serverless', label: 'Python on AWS Lambda' },
      { value: '2', label: 'bikes bought on it, both fit' }
    ],
    gist: 'Bike sizing is like shoe sizing — a Medium isn’t a Medium. I built a calculator around the RAD measurement so a rider’s number returns every bike and setup that fits them, and learned Python doing it.',
    sections: [
      { kicker: 'the problem', head: 'You have to ride it to know.',
        body: 'Geometry varies wildly between manufacturers, and in Texas there is nowhere to demo. Buying a mountain bike meant guessing and hoping.' },
      { kicker: 'what I built', head: 'One number, every bike.',
        body: 'A Python script became modular functions, then an AWS Lambda behind a front end — plus a database riders could contribute to and an automation script that ingested manufacturer geometry charts.',
        pull: 'RAD(rider) = RAD(bike). Everything after that is a lookup.' },
      { kicker: 'the constraint', head: 'The measurement wasn’t mine.',
        body: 'RAD is a mountain bike coach’s intellectual property. Building the thing meant getting his approval and working with him — a product problem before it was ever a code problem.' },
      { kicker: 'what happened', head: 'A friend and I bought bikes on it.',
        body: 'Both fit. Built pre-AI, which meant learning Python the slow way — and that turned out to be the real return on the project.' }
    ],
    href: './projects/bike-fit-calculator.html',
    extra: { label: 'GitHub', url: 'https://github.com/NostraJames/bikefitcalculator' }
  },
  {
    id: 'alpha-vidiris',
    art: './assets/posters/alpha-vidiris.jpg', artType: 'photo',
    overlay: 'linear-gradient(155deg,#56633f47,#201e1dbd)',
    title: 'Alpha Vidiris',
    initial: 'A',
    kicker: 'A space 4X, designed from zero',
    badge: '0 → 1',
    cat: 'built',
    bg: 'linear-gradient(155deg,#56633f,#201e1d)',
    metric: '15 playtests, 15 iterations',
    blurb: 'An original space exploration and combat board game — mechanics, boards and pieces designed from scratch.',
    tags: ['Product Management', 'User Research', 'A/B Testing', 'Fusion 360', 'CAD'],
    metrics: [
      { value: '15', label: 'playtest sessions, one iteration each' },
      { value: '4+', label: 'players, multiple paths to victory' },
      { value: '3-piece', label: 'magnetic, self-contained player board' }
    ],
    gist: 'A space 4X board game built from nothing — mechanics, hex map, player boards, pieces — as a gift for a friend going through a hard time. Fifteen playtest sessions, an iteration after every single one.',
    sections: [
      { kicker: 'the goal', head: 'Original, balanced, and worth a second play.',
        body: '4+ players, combat encouraged but multiple paths to victory through technology, expansion or strategy, and factions balanced enough that replay-ability came from choices rather than luck.' },
      { kicker: 'the process', head: 'Test, iterate, repeat — fifteen times.',
        body: 'Every session revealed something that changed mechanics, boards or usability. Player boards were tested without instructions, which is exactly where the real pain points show up.',
        pull: 'Small pain points turned out to be the biggest design opportunities.' },
      { kicker: 'the hardware', head: 'Hex tiles that don’t drift.',
        body: 'Tile shift is a known annoyance in hex games. I designed Fusion 360 tile holders with embedded magnets that keep the galaxy together on any table, and a 3-piece magnetic player board that stores every token, cube and card inside itself.' }
    ],
    href: './projects/alpha-vidiris.html',
    extra: { label: 'GitHub', url: 'https://github.com/NostraJames/alphavidiris' }
  },
  {
    id: 'sonos-cooler',
    art: './assets/posters/sonos-cooler.jpg', artType: 'photo',
    overlay: 'linear-gradient(155deg,#4742385c,#201e1dab)',
    title: 'Sonos Cooler',
    initial: 'S',
    kicker: 'A wind tunnel for a hot closet',
    badge: 'Weekend',
    cat: 'built',
    bg: 'linear-gradient(155deg,#474238,#201e1d)',
    metric: '100% decrease in amp failures',
    blurb: 'A stackable 3D-printed cooling module that stopped Sonos amps overheating in an unventilated closet.',
    tags: ['Fusion 360', 'CAD', '3D Printing', 'Thermal Design'],
    metrics: [
      { value: '100%', label: 'decrease in amp failures' },
      { value: '2 days', label: 'sketch to printed prototype' },
      { value: '2', label: 'modular pieces, stackable' }
    ],
    gist: 'Sonos amps in an unventilated utility closet dropped audio after a few hours of use. Two stackable 3D-printed modules create a wind tunnel — intake below, exhaust above — and the user reported a 100% decrease in amp failures.',
    sections: [
      { kicker: 'the problem', head: 'The closet was the product constraint.',
        body: 'The amps couldn’t move. Any solution had to cool them where they already were, stacked, using parts you can buy — the community answer was a PC fan balanced on top, with no airflow design behind it.' },
      { kicker: 'what I designed', head: 'Intake below, exhaust above.',
        body: 'A bottom module pulls cool air across the underside of an amp; a top module exhausts that amp’s heat while cooling the one above it. Stack them and the whole rack becomes a single airflow path.',
        pull: 'Two pieces, because one piece can’t stack.' },
      { kicker: 'the fix', head: 'One to two millimetres.',
        body: 'The first prototype fit too tightly to slide in. Scaling the dimensions by 1–2mm made insertion easy without costing any cooling performance — that was the entire refinement.' }
    ],
    href: './projects/sonos-aircooler.html',
    extra: { label: 'GitHub', url: 'https://github.com/NostraJames/sonoscooler' }
  }
];

const SKILLS = [
  { name: 'Product strategy & roadmapping',   pct: 90, note: 'Aha!, and opinions' },
  { name: 'Customer discovery & research',    pct: 88, note: 'the part that moves the roadmap' },
  { name: 'Agentic AI & workflow design',     pct: 86, note: 'shipped one to my own team' },
  { name: 'Data pipelines & analysis',        pct: 88, note: 'Python and SQL, no shame' },
  { name: 'Prompt & context engineering',     pct: 90, note: 'version-controlled, like code' },
  { name: 'Solution architecture',            pct: 86, note: 'enough to build it myself' }
];

const TOOLS = ['Claude Code', 'Copilot CLI', 'Azure DevOps', 'Aha! Roadmaps', 'Python', 'SQL',
               'GitHub', 'Adobe Analytics', 'Quantum Metrics', 'Excel / VBA', 'Figma', 'Fusion 360'];

const TIMELINE = [
  { when: '2021 — now',   what: 'Product Manager, Mobile App',
    detail: 'American Airlines. Grew opt-ins 400K → 10.7M, and built the agentic PM workflow the team now runs on. Previously Program Manager, Delivery Transformation.' },
  { when: '2020 — 2021',  what: 'Project Manager, Vendor Management',
    detail: 'Cotality, formerly CoreLogic. Automated contract visibility and got the org to keep the data clean.' },
  { when: '2011 — 2019',  what: 'Senior Data Analyst',
    detail: 'Affirmity, formerly Peoplefluent. Cut project turnaround 82% by automating the pipeline everything queued behind.' },
  { when: '2006 — 2011',  what: 'BS Economics, University of North Texas',
    detail: 'Minor in Mathematics. Game theory and econometrics — still how I think about a roadmap.' }
];

const FACTS = ['Dallas, Texas / CST', 'CSPO — Scrum Alliance', 'PMP — Project Management Institute', 'Open to remote'];
