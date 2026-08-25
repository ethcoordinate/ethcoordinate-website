'use client'

import { useEffect, useRef, useState } from 'react'
import { buildOptions, clientTeams, evidenceOptions, inclusionStages, intents, processNodes, roles, scopeOptions, type EipRecord } from './data'
import './navigator.css'

type Screen = 'home' | 'guide' | 'inclusion' | 'decisions' | 'participate' | 'process' | 'people' | 'resources'
type EipAnswer = 'yes' | 'no' | 'unknown' | null

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

const forkcastStageLinks: Record<string, { href: string, label: string, detail: string }> = {
  problem: { href: 'https://forkcast.org/eips', label: 'Browse related EIPs in Forkcast', detail: 'Search proposals and see their current context.' },
  spec: { href: 'https://forkcast.org/champions/', label: 'Use Forkcast’s champion guide', detail: 'Write the plain-language summary, benefits, tradeoffs, impacts, and FAQ.' },
  implementation: { href: 'https://forkcast.org/eips', label: 'Inspect live EIP analysis', detail: 'Find supporting documents, implementation context, and stakeholder impacts.' },
  inclusion: { href: 'https://forkcast.org/upgrades', label: 'Track upgrade inclusion', detail: 'See current fork candidates and inclusion stages.' },
  testing: { href: 'https://forkcast.org/networks', label: 'Check network readiness', detail: 'Follow devnets, testnets, and client progress.' },
  activation: { href: 'https://forkcast.org/upgrades', label: 'View live upgrade timelines', detail: 'Follow testnet and mainnet milestones.' },
}

export default function NavigatorApp() {
  const [screen, setScreen] = useState<Screen>('home')
  const [guidesOpen, setGuidesOpen] = useState(false)
  const [startMenuPosition, setStartMenuPosition] = useState({ top: 0, left: 0 })
  const startMenuButton = useRef<HTMLButtonElement>(null)
  const [step, setStep] = useState(0)
  const [scope, setScope] = useState<string | null>(null)
  const [eipAnswer, setEipAnswer] = useState<EipAnswer>(null)
  const [selectedEip, setSelectedEip] = useState<EipRecord | null>(null)
  const [buildState, setBuildState] = useState<string | null>(null)
  const [evidence, setEvidence] = useState<string[]>([])
  const [inclusionEip, setInclusionEip] = useState<EipRecord | null>(null)
  const [peopleRole, setPeopleRole] = useState('author')

  const startGuide = () => {
    setScreen('guide')
    setGuidesOpen(false)
    setStep(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setScreen('home')
    setGuidesOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startInclusion = () => {
    setScreen('inclusion')
    setGuidesOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigate = (next: Screen) => {
    setScreen(next)
    setGuidesOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openPeople = (role = 'author') => {
    setPeopleRole(role)
    navigate('people')
  }

  const resetGuide = () => {
    setStep(0)
    setScope(null)
    setEipAnswer(null)
    setSelectedEip(null)
    setBuildState(null)
    setEvidence([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleStartMenu = () => {
    if (!guidesOpen && startMenuButton.current) {
      const trigger = startMenuButton.current.getBoundingClientRect()
      const menuWidth = 310
      setStartMenuPosition({
        top: trigger.bottom + 8,
        left: Math.min(trigger.left, window.innerWidth - menuWidth - 8),
      })
    }
    setGuidesOpen(open => !open)
  }

  return (
    <div className="navigator-root">
      <div className="nav-topbar">
        <button className="nav-wordmark" onClick={goHome} aria-label="ACD Navigator home">
          <span className="nav-wordmark-glyph" aria-hidden="true">⎇</span>
          <span>ACD Navigator</span>
        </button>
        <nav aria-label="Navigator sections">
          <button className={screen === 'home' ? 'active' : ''} onClick={goHome}>Home</button>
          <div className="guides-menu">
            <button ref={startMenuButton} className={['guide', 'inclusion', 'decisions', 'participate'].includes(screen) ? 'active' : ''} onClick={toggleStartMenu} aria-expanded={guidesOpen} aria-haspopup="menu">Start here <span aria-hidden="true">⌄</span></button>
          </div>
          <button className={screen === 'process' ? 'active' : ''} onClick={() => navigate('process')}>How changes happen</button>
          <button className={screen === 'people' ? 'active' : ''} onClick={() => openPeople()}>Who’s involved</button>
          <button className={screen === 'resources' ? 'active' : ''} onClick={() => navigate('resources')}>Useful links</button>
        </nav>
        {guidesOpen && <div className="guides-dropdown" role="menu" style={{ top: startMenuPosition.top, left: startMenuPosition.left }}>
          <button role="menuitem" onClick={startGuide}><b>Propose a feature for Ethereum</b><small>Start with an idea, with or without an EIP</small></button>
          <button role="menuitem" onClick={startInclusion}><b>Understand fork inclusion</b><small>How proposals reach a network upgrade</small></button>
          <button role="menuitem" onClick={() => navigate('decisions')}><b>Trace a decision</b><small>Find the evidence behind an outcome</small></button>
          <button role="menuitem" onClick={() => navigate('participate')}><b>Join the process</b><small>Find a useful place to contribute</small></button>
        </div>}
      </div>

      {screen === 'home' && <Home onNavigate={navigate} />}
      {screen === 'inclusion' && <InclusionGuide selectedEip={inclusionEip} setSelectedEip={setInclusionEip} />}
      {screen === 'guide' && (
        <Guide
          step={step}
          setStep={setStep}
          scope={scope}
          setScope={setScope}
          eipAnswer={eipAnswer}
          setEipAnswer={setEipAnswer}
          selectedEip={selectedEip}
          setSelectedEip={setSelectedEip}
          buildState={buildState}
          setBuildState={setBuildState}
          evidence={evidence}
          setEvidence={setEvidence}
          onReset={resetGuide}
        />
      )}
      {screen === 'decisions' && <DecisionGuide />}
      {screen === 'participate' && <ParticipationGuide onOpenClient={() => openPeople('client')} />}
      {screen === 'process' && <ReferencePage eyebrow="Reference" title="How a proposal reaches mainnet" intro="Explore the route from a problem to mainnet activation. This map describes common coordination practice, not a guaranteed pipeline."><ProcessExplorer /></ReferencePage>}
      {screen === 'people' && <ReferencePage eyebrow="People" title="Who’s involved" intro="Meet the roles and teams involved in proposing, reviewing, implementing, and testing protocol changes."><RoleExplorer initialRole={peopleRole} /></ReferencePage>}
      {screen === 'resources' && <ReferencePage eyebrow="Live resources" title="Continue with primary and live sources" intro="Use ACD Navigator for orientation, then verify changing facts in Forkcast and the canonical process documents."><ForkcastHandoffs /><SourceLinks /></ReferencePage>}
    </div>
  )
}

function Home({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const destinations: Record<string, Screen> = { champion: 'guide', fork: 'inclusion', decision: 'decisions', participate: 'participate' }
  return (
    <main className="home-page">
      <section className="home-centerfold">
        <div className="section-heading">
          <p className="eyebrow">Ethereum protocol navigator</p>
          <h1>What are you trying to do?</h1>
          <p>Start with your goal. You do not need to know whether it belongs to the EIP process, AllCoreDevs, or fork planning.</p>
        </div>
        <div className="intent-grid">
          {intents.map((intent, index) => (
            <button key={intent.id} className="intent-card" onClick={() => onNavigate(destinations[intent.id])}>
              <span className="card-number">0{index + 1}</span>
              <span className="intent-title">{intent.title}</span>
              <span className="intent-detail">{intent.detail}</span>
              <span className="card-link">Open this guide <Arrow /></span>
            </button>
          ))}
        </div>
        <div className="home-reference-links"><span>Looking for reference material?</span><button onClick={() => onNavigate('process')}>Process map</button><button onClick={() => onNavigate('people')}>People and clients</button><button onClick={() => onNavigate('resources')}>Live resources</button></div>
      </section>
    </main>
  )
}

function ReferencePage({ eyebrow, title, intro, children }: { eyebrow: string, title: string, intro: string, children: React.ReactNode }) {
  return <main className="reference-page">
    <header className="reference-header"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></header>
    {children}
  </main>
}

function SourceLinks() {
  return <section className="source-strip">
    <div><p className="eyebrow">Primary sources</p><h2>Rules, records,<br />and meeting rooms.</h2></div>
    <div className="source-links">
      <a href="https://eips.ethereum.org/EIPS/eip-1" target="_blank" rel="noreferrer"><span>EIP-1</span><b>The formal EIP process</b><Arrow /></a>
      <a href="https://github.com/ethereum/pm" target="_blank" rel="noreferrer"><span>ethereum/pm</span><b>ACD agendas and call records</b><Arrow /></a>
      <a href="https://eips.ethereum.org/EIPS/eip-7723" target="_blank" rel="noreferrer"><span>EIP-7723</span><b>Network upgrade inclusion stages</b><Arrow /></a>
      <a href="https://ethereum-magicians.org/" target="_blank" rel="noreferrer"><span>Ethereum Magicians</span><b>Open proposal discussion</b><Arrow /></a>
    </div>
    <p className="review-note">Content reviewed August 2026. “Formal rule” means an accepted process EIP; “coordination practice” describes how public work is commonly organized and may change.</p>
  </section>
}

function DecisionGuide() {
  return <ReferencePage eyebrow="Trace a decision" title="Find the evidence behind an outcome" intro="Do not stop at “ACD approved it.” Identify the exact question, participants, reasoning, and resulting artifact.">
    <section className="decision-page-content">
      <div className="decision-sequence">
        <article><span>1</span><div><b>Start with the claimed outcome</b><p>Write the narrowest possible statement: which EIP, which fork, which inclusion stage, or which technical question?</p></div></article>
        <article><span>2</span><div><b>Find the call and agenda item</b><p>Use Forkcast calls and decisions to locate the meeting, timestamp, summary, and linked proposal context.</p></div></article>
        <article><span>3</span><div><b>Read objections and commitments</b><p>Look for the relevant client teams, unresolved concerns, implementation commitments, and conditions attached to the outcome.</p></div></article>
        <article><span>4</span><div><b>Confirm the durable artifact changed</b><p>Check the fork Meta EIP, specification, tests, or other repository change. A verbal summary may be incomplete or later superseded.</p></div></article>
      </div>
      <div className="decision-tools">
        <a href="https://forkcast.org/decisions" target="_blank" rel="noreferrer"><span className="forkcast-mark">⎇</span><div><b>Forkcast decisions</b><p>Search captured AllCoreDevs outcomes and follow their source context.</p></div><Arrow /></a>
        <a href="https://forkcast.org/calls" target="_blank" rel="noreferrer"><span className="forkcast-mark">⎇</span><div><b>Forkcast calls</b><p>Browse agendas, summaries, recordings, transcripts, and chat logs.</p></div><Arrow /></a>
        <a href="https://github.com/ethereum/pm" target="_blank" rel="noreferrer"><span className="source-symbol">GH</span><div><b>ethereum/pm</b><p>Check agenda issues, meeting notes, and the public coordination record.</p></div><Arrow /></a>
        <a href="https://forkcast.org/upgrades" target="_blank" rel="noreferrer"><span className="forkcast-mark">⎇</span><div><b>Upgrade tracker</b><p>Confirm the proposal’s current relationship to a network upgrade.</p></div><Arrow /></a>
      </div>
      <div className="inclusion-warning"><b>Decisions are contextual and revisable.</b><p>Record the date and fork. Later implementation, security, or testing evidence may change an earlier conclusion.</p></div>
    </section>
  </ReferencePage>
}

function ParticipationGuide({ onOpenClient }: { onOpenClient: () => void }) {
  const entries = [
    ['Discuss an idea', 'Open or join a focused Ethereum Magicians thread. Search for prior work first.', 'https://ethereum-magicians.org/'],
    ['Improve an EIP', 'Review the specification, contribute examples, identify ambiguity, or help with tests.', 'https://github.com/ethereum/EIPs'],
    ['Work on a client', 'Choose an execution or consensus client and follow its contribution guide.', null],
    ['Follow protocol calls', 'Read agendas and summaries before attending. Join with a concrete contribution or question.', 'https://forkcast.org/calls'],
    ['Help test upgrades', 'Follow devnets and testnets, reproduce failures, and contribute test coverage.', 'https://forkcast.org/networks'],
    ['Champion a proposal', 'Coordinate specification, evidence, stakeholders, implementation, and follow-through.', 'https://forkcast.org/champions/'],
  ] as const
  return <ReferencePage eyebrow="Join the process" title="Participate through useful work" intro="There is no application form for “core developer.” Start with a concrete contribution in a public working area and build context over time.">
    <section className="participation-content">
      <div className="participation-grid">{entries.map(([title, detail, href], index) => href ? <a href={href} target="_blank" rel="noreferrer" key={title}><span>0{index + 1}</span><b>{title}</b><p>{detail}</p><Arrow /></a> : <button key={title} onClick={onOpenClient}><span>0{index + 1}</span><b>{title}</b><p>{detail}</p><Arrow /></button>)}</div>
      <div className="meeting-prep"><div><p className="eyebrow">Before joining an ACD call</p><h2>Earn synchronous time.</h2></div><ol><li><span>1</span><p>Read the agenda and linked material before the call.</p></li><li><span>2</span><p>Know the exact question that needs synchronous discussion.</p></li><li><span>3</span><p>Bring relevant evidence and affected implementers.</p></li><li><span>4</span><p>State objections, commitments, and follow-up owners clearly.</p></li></ol></div>
    </section>
  </ReferencePage>
}

function ProcessExplorer() {
  const [active, setActive] = useState(0)
  const node = processNodes[active]
  const forkcastLink = forkcastStageLinks[node.id]
  return <section className="process-explorer" id="process-map">
    <div className="explorer-intro">
      <p className="eyebrow">The process map</p>
      <h2>A route,<br /><em>not a pipeline.</em></h2>
      <p>Choose a stage to see the people, evidence, and usual next move. Proposals can pause, loop backward, compete, or leave a fork.</p>
      <span className="practice-tag">Coordination practice</span>
    </div>
    <div className="process-content">
      <div className="node-tabs" role="tablist" aria-label="Protocol change stages">
        {processNodes.map((item, index) => <button key={item.id} role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.short}</button>)}
      </div>
      <article className="node-detail">
        <div className="node-main"><p className="eyebrow">Stage 0{active + 1}</p><h3>{node.title}</h3><p>{node.summary}</p><a className="forkcast-stage-link" href={forkcastLink.href} target="_blank" rel="noreferrer"><span><b>{forkcastLink.label}</b><small>{forkcastLink.detail}</small></span><Arrow /></a><div className="loop-note">↶ You may return to an earlier stage when evidence changes the design.</div></div>
        <dl>
          <div><dt>Usually involved</dt><dd>{node.people}</dd></div>
          <div><dt>Evidence you can see</dt><dd>{node.artifact}</dd></div>
          <div><dt>Useful next move</dt><dd>{node.next}</dd></div>
          <div className="caveat"><dt>Do not assume</dt><dd>{node.caveat}</dd></div>
        </dl>
      </article>
    </div>
  </section>
}

function RoleExplorer({ initialRole = 'author' }: { initialRole?: string }) {
  const [active, setActive] = useState(initialRole)
  const [editors, setEditors] = useState<Array<{ name: string, username: string, url: string }>>([])
  const role = roles.find(item => item.id === active) ?? roles[0]
  useEffect(() => {
    let mounted = true
    fetch('/navigator/eip-editors.json').then(response => response.json()).then(data => { if (mounted) setEditors(data) }).catch(() => undefined)
    return () => { mounted = false }
  }, [])
  useEffect(() => {
    setActive(initialRole)
  }, [initialRole])
  const selectRole = (roleId: string) => {
    setActive(roleId)
  }
  return <section className="role-explorer" id="roles">
    <div className="section-heading">
      <p className="eyebrow">People, not an org chart</p>
      <h2>Who’s involved?</h2>
      <p>These are roles people perform in a particular effort. One person can hold several, and participation changes over time.</p>
    </div>
    <div className="role-layout">
      <div className="role-list" role="tablist" aria-label="Ethereum protocol roles">
        {roles.map((item, index) => <button role="tab" aria-selected={active === item.id} className={active === item.id ? 'active' : ''} key={item.id} onClick={() => selectRole(item.id)}><span>0{index + 1}</span>{item.title}<b>→</b></button>)}
      </div>
      <article className="role-detail">
        <p className="eyebrow">Functional role</p><h3>{role.title}</h3>
        <div className="does"><span>Does</span><p>{role.does}</p></div>
        <div className="does not"><span>Does not</span><p>{role.not}</p></div>
        <div className="role-start"><span>How to begin</span><p>{role.start}</p></div>
        {active === 'client' && <div className="role-reveal" role="status"><span><b>Client team directory is now visible below</b><small>Read this role first, then scroll when you’re ready.</small></span><i aria-hidden="true">↓</i></div>}
        {active === 'editor' && <div className="role-specific"><span>Current editors</span><div className="editor-list">{editors.map(editor => <a href={editor.url} target="_blank" rel="noreferrer" key={editor.username}>{editor.name} <small>@{editor.username}</small></a>)}</div><a className="role-source" href="https://eips.ethereum.org/EIPS/eip-1#eip-editors" target="_blank" rel="noreferrer">Source: current list in EIP-1 <Arrow /></a></div>}
        {active === 'testing' && <div className="role-specific"><span>Teams to know</span><div className="testing-teams"><a href="https://ethpandaops.io/" target="_blank" rel="noreferrer"><b>ethPandaOps</b><small>Devnets, infrastructure, observability, and network data</small></a><a href="https://steel.ethereum.foundation/" target="_blank" rel="noreferrer"><b>STEEL</b><small>Execution-layer specifications and test suites</small></a></div></div>}
      </article>
    </div>
    {active === 'client' && <ClientDirectory />}
    <p className="core-dev-note"><b>“Core developer” is usually a functional description, not a credential.</b> Ask which code, specifications, tests, or coordination work someone contributes to, and whose implementation commitments they can actually represent.</p>
  </section>
}

function ClientDirectory() {
  return <section className="client-directory" id="client-teams">
    <div className="section-heading">
      <p className="eyebrow">Client team directory</p>
      <h2>Who builds Ethereum?</h2>
      <p>A “client contributor” works on one of the programs that nodes run. Ethereum needs both an execution client and a consensus client.</p>
    </div>
    <div className="layer-explainer">
      <div><span className="layer-badge el">EL</span><p><b>Execution layer</b> clients execute transactions, run the EVM, and maintain execution state.</p></div>
      <div><span className="layer-badge cl">CL</span><p><b>Consensus layer</b> clients handle validators, fork choice, attestations, and finality.</p></div>
    </div>
    <div className="client-columns">
      {(['EL', 'CL'] as const).map(layer => <div className="client-layer" key={layer}>
        <div className="client-layer-heading"><span className={`layer-badge ${layer.toLowerCase()}`}>{layer}</span><h3>{layer === 'EL' ? 'Execution clients' : 'Consensus clients'}</h3></div>
        <div className="client-list">
          {clientTeams.filter(team => team.layer === layer).map(team => <a href={team.repository} target="_blank" rel="noreferrer" key={team.name}>
            <span><b>{team.name}</b><small>{team.language}</small></span>
            <p>{team.description}</p>
            <Arrow />
          </a>)}
        </div>
      </div>)}
    </div>
    <div className="contact-guide">
      <div><p className="eyebrow">How to contact a team</p><h3>Start where the work is visible.</h3></div>
      <ol>
        <li><span>1</span><p><b>Open the team’s repository.</b> Read its README and contributing guide. Look for a linked Discord, Matrix, or discussion forum.</p></li>
        <li><span>2</span><p><b>Search before asking.</b> Find existing issues or pull requests about the EIP or technical area.</p></li>
        <li><span>3</span><p><b>Ask one concrete question.</b> Link the EIP and relevant evidence. Explain why that team’s input is needed.</p></li>
        <li><span>4</span><p><b>Do not ask for “approval.”</b> Ask what is unclear, risky, costly, or required for a useful prototype.</p></li>
      </ol>
      <p className="contact-caveat">Repositories are listed instead of individual people because maintainers and responsibilities change. Public technical channels also preserve context for the next contributor.</p>
    </div>
  </section>
}

function ForkcastHandoffs() {
  const destinations = [
    { href: 'https://forkcast.org/champions/', label: 'Champion guide', detail: 'Make an EIP legible and contribute its live Forkcast analysis.' },
    { href: 'https://forkcast.org/eips', label: 'EIP directory', detail: 'Browse proposal status, analysis, impacts, FAQs, and timelines.' },
    { href: 'https://forkcast.org/calls', label: 'Protocol calls', detail: 'Find agendas, summaries, transcripts, and call artifacts.' },
    { href: 'https://forkcast.org/decisions', label: 'Decision record', detail: 'Trace key decisions captured from AllCoreDevs meetings.' },
    { href: 'https://forkcast.org/upgrades', label: 'Upgrade tracker', detail: 'Follow current forks, candidates, stages, and milestones.' },
    { href: 'https://forkcast.org/networks', label: 'Network readiness', detail: 'Follow devnets, testnets, and client progress.' },
  ]
  return <section className="forkcast-handoffs">
    <div className="section-heading">
      <p className="eyebrow">Continue in Forkcast</p>
      <h2>Learn here. Track the live process there.</h2>
      <p>ACD Navigator explains what the process means. Forkcast maintains changing EIP, call, decision, upgrade, and testing information.</p>
    </div>
    <div className="handoff-grid">
      {destinations.map(destination => <a href={destination.href} target="_blank" rel="noreferrer" key={destination.href}>
        <span className="forkcast-mark" aria-hidden="true">⎇</span>
        <span><b>{destination.label}</b><small>{destination.detail}</small></span>
        <Arrow />
      </a>)}
    </div>
  </section>
}

function InclusionGuide({ selectedEip, setSelectedEip }: { selectedEip: EipRecord | null, setSelectedEip: (eip: EipRecord | null) => void }) {
  return <main className="inclusion-article">
    <header className="reference-header"><p className="eyebrow">Guide</p><h1>Understand fork inclusion</h1><p>How an EIP becomes proposed, considered, scheduled, or included in one network upgrade, and how client teams coordinate those outcomes.</p></header>
    <div className="inclusion-article-layout">
      <nav className="article-contents" aria-label="On this page">
        <span>On this page</span>
        <a href="#eip-statuses">EIP statuses</a>
        <a className="sub-item" href="#inclusion-stages">↳ During Draft / Review: inclusion stages</a>
        <a href="#timelines-and-deadlines">Timelines &amp; deadlines</a>
        <a href="#fork-delivery">Fork delivery timeline</a>
        <a href="#inclusion-decisions">How decisions happen</a>
        <a href="#inclusion-readiness">What readiness means</a>
        <a href="#check-proposal">Check a proposal</a>
      </nav>
      <div className="inclusion-sections">
        <section id="eip-statuses"><EipStatusLifecycle /></section>
        <section id="inclusion-stages"><InclusionStageExplorer /></section>
        <section id="timelines-and-deadlines"><InclusionTimelines /></section>
        <section id="fork-delivery"><ForkDeliveryTimeline /></section>
        <section id="inclusion-decisions"><InclusionDecisionProcess /></section>
        <section id="inclusion-readiness"><InclusionReadiness /></section>
        <section id="check-proposal"><InclusionLookup selected={selectedEip} setSelected={setSelectedEip} /></section>
      </div>
    </div>
  </main>
}

function EipStatusLifecycle() {
  return <>
    <StepHeading kicker="First, the EIP process" title="Most published EIPs have not reached Final.">An EIP has one current status in its preamble. Status tracks the proposal through standardization, not whether it will ship in a fork.</StepHeading>
    <div className="status-lifecycle">
      <article><span>01</span><div><b>Idea</b><p>Pre-draft work outside the EIPs repository. The problem and approach are still being explored.</p></div></article>
      <article className="stage-zone"><span>02</span><div><b>Draft</b><p>The first tracked status. The proposal can still change substantially as reviewers and implementers find issues.</p><small>Core EIPs are commonly proposed for a network upgrade while Draft.</small></div></article>
      <article className="stage-zone"><span>03</span><div><b>Review</b><p>The author considers the proposal ready for peer review. Implementation and fork evaluation may still continue.</p><small>Inclusion stages can span Draft and Review; they are not sub-statuses.</small></div></article>
      <article><span>04</span><div><b>Last Call</b><p>A final review window for a stable specification. Normative changes send it back to Review.</p></div></article>
      <article><span>05</span><div><b>Final</b><p>The final standard. Changes are generally limited to errata and non-normative clarification.</p></div></article>
    </div>
    <div className="status-exits"><div><b>Stagnant</b><p>Draft, Review, or Last Call proposals inactive for at least six months may be moved here and can later be revived.</p></div><div><b>Withdrawn</b><p>The authors have withdrawn the proposal. Pursuing it later requires a new EIP number.</p></div><div><b>Living</b><p>A special status for documents intended to keep evolving rather than become Final.</p></div></div>
    <div className="status-snapshot"><b>A snapshot, not a prediction</b><p>Of the 520 EIPs in this site’s August 2026 index, 133 are Final. There are 235 Stagnant, 99 Draft, 33 Withdrawn, 9 Review, 8 Last Call, and 3 Living. Stagnant is the most common current status. The categories and ages differ, so this is not a success-rate calculation, but it shows that publication as Draft is the start of work, not an expectation of Final status.</p></div>
    <a className="forkcast-stage-link" href="https://eips.ethereum.org/EIPS/eip-1#eip-process" target="_blank" rel="noreferrer"><span><b>Read the formal EIP status definitions</b><small>EIP-1 defines the standardization lifecycle and each status.</small></span><Arrow /></a>
  </>
}

function InclusionStageExplorer() {
  const [active, setActive] = useState(0)
  const stage = inclusionStages[active]
  return <>
    <StepHeading kicker="Nested within active Core EIP work" title="Inclusion stages answer a different question.">While a Core EIP is usually Draft or Review, it may also be tracked against a particular fork. The stage does not replace or advance its EIP status.</StepHeading>
    <div className="stage-nesting"><span>Typical EIP status</span><div><b>Draft</b><i>or</i><b>Review</b></div><span>Per-upgrade stage</span><div><em>PFI</em><i>→</i><em>CFI</em><i>→</i><em>SFI</em><i>→</i><em>Included</em></div></div>
    <div className="permissionless-pfi">
      <span className="stage-badge">PFI</span><div><h2>PFI is permissionless entry, with procedural requirements.</h2><p>No client-team approval is required to become Proposed for Inclusion. In the current process, the proposal must still enter through the published route:</p><ol><li>The EIP is proposed within the fork’s published PFI window and before its deadline.</li><li>Someone opens the pull request adding it to the fork Meta EIP’s PFI list.</li><li>The proposal is added to an appropriate ACD agenda and brought to the call.</li><li>Someone speaks on behalf of the EIP on that call. This can be the proposer, champion, author, or another prepared representative.</li><li>A primary point of contact remains available through the upgrade cycle.</li></ol><small>EIP-7723 formally requires the Meta EIP pull request and recommends a point of contact. Agenda presentation and an advocate on the call are current operating requirements used to make the proposal actionable; they are coordination practice rather than proof of support.</small></div>
    </div>
    <p className="permissionless-meaning"><b>Permissionless does not mean automatic advancement.</b> PFI makes the proposal visible for evaluation. CFI and SFI require later client-team decisions and readiness evidence.</p>
    <p className="stage-picker-intro">Select a stage to see what it means after entry:</p>
    <div className="inclusion-stage-tabs" role="tablist" aria-label="Fork inclusion stages">
      {inclusionStages.map((item, index) => <button key={item.id} role="tab" aria-selected={index === active} className={index === active ? 'active' : ''} onClick={() => setActive(index)}><b>{item.abbreviation}</b><small>{item.title}</small></button>)}
    </div>
    <article className="inclusion-stage-detail">
      <span className="stage-badge">{stage.abbreviation}</span><h2>{stage.title}</h2>
      <dl><div><dt>What it means</dt><dd>{stage.meaning}</dd></div><div><dt>What it does not mean</dt><dd>{stage.not}</dd></div><div><dt>The practical question</dt><dd>{stage.question}</dd></div></dl>
    </article>
    <a className="forkcast-stage-link" href="https://eips.ethereum.org/EIPS/eip-7723" target="_blank" rel="noreferrer"><span><b>Read the formal inclusion-stage definitions</b><small>EIP-7723 defines the network-upgrade inclusion process.</small></span><Arrow /></a>
  </>
}

function InclusionTimelines() {
  return <>
    <StepHeading kicker="A deadline belongs to one step" title="Which deadline are people talking about?">A fork has several planning and delivery milestones. Meeting one does not skip the work required by the next.</StepHeading>
    <div className="timeline-lanes">
      <article><span>1</span><div><b>PFI proposal window</b><p>The period when someone may add an EIP to a fork’s Proposed for Inclusion list. This opens evaluation; it does not signal support.</p></div></article>
      <article><span>2</span><div><b>CFI decisions</b><p>Client teams decide which proposed EIPs they intend to attempt in devnets. A PFI submitted on time can still remain PFI or become DFI.</p></div></article>
      <article><span>3</span><div><b>SFI and scope decisions</b><p>Stable specifications, implementations, tests, interactions, and devnet results support a strong intent to ship.</p></div></article>
      <article><span>4</span><div><b>Testnet and activation targets</b><p>The combined fork moves through devnets and public testnets before mainnet. These dates are often targets and may change when testing finds problems.</p></div></article>
    </div>
    <div className="deadline-types">
      <div><span>Published cutoff</span><p>A date set for a specific action, such as submitting a PFI request.</p></div>
      <div><span>Planning target</span><p>A coordination goal that can move as implementation and testing produce evidence.</p></div>
      <div><span>Not yet decided</span><p>Some later dates remain TBD until earlier scope and readiness questions are resolved.</p></div>
    </div>
    <div className="inclusion-warning"><b>A deadline only controls its named milestone.</b><p>Meeting a PFI deadline permits a proposal to enter evaluation. It does not grant CFI, SFI, devnet inclusion, or mainnet activation.</p></div>
    <a className="forkcast-stage-link" href="https://forkcast.org/schedule" target="_blank" rel="noreferrer"><span><b>View Forkcast’s planning sandbox</b><small>Explore current planning assumptions and upgrade timelines. Treat projections as targets unless a source identifies a firm cutoff.</small></span><Arrow /></a>
  </>
}

function ForkDeliveryTimeline() {
  return <>
    <StepHeading kicker="After scope is chosen" title="How does a fork reach mainnet?">The work moves from isolated experiments to increasingly public networks. The phases are familiar, but their exact order and overlap can change from fork to fork.</StepHeading>
    <div className="delivery-timeline">
      <article><span>01</span><div><b>Devnets</b><p>Short-lived networks let client teams integrate the selected changes, find disagreements, revise specifications, and repeat quickly.</p></div></article>
      <article><span>02</span><div><b>Stable specifications and client releases</b><p>Implementations converge, shared tests pass, and teams prepare releases suitable for public testnets.</p></div></article>
      <article><span>03</span><div><b>Public testnets</b><p>Longer-lived networks exercise the fork with public infrastructure, validators, applications, and realistic operations.</p></div></article>
      <article><span>04</span><div><b>Security review or competition</b><p>Independent reviewers examine the combined change set. This can overlap with testing or occur on either side of public testnet upgrades; there is no universal ordering.</p></div></article>
      <article><span>05</span><div><b>Ecosystem preparation window</b><p>After the final public testnet, the process aims to leave at least 30 days before mainnet so L2s, DAOs, staking providers, exchanges, RPC services, and other operators can prepare.</p></div></article>
      <article><span>06</span><div><b>Mainnet activation</b><p>Node operators run fork-ready releases, and the new rules activate at the agreed epoch or timestamp.</p></div></article>
    </div>
    <div className="current-fork-note"><span>Current Glamsterdam plan</span><p>Glamsterdam plans to upgrade <b>Sepolia before Hoodi</b>, and to run the public testnets <b>before the security competition</b>. That ordering differs from Fusaka’s process. Past testnet orders and security-review timing are not rules for future forks.</p></div>
    <div className="inclusion-warning"><b>A timeline is evidence-sensitive.</b><p>Devnet failures, specification changes, client readiness, security findings, or ecosystem feedback can move later targets. Forkcast’s schedule is a planning view, not a promise.</p></div>
    <div className="route-handoffs"><a href="https://forkcast.org/networks" target="_blank" rel="noreferrer">Follow current networks <Arrow /></a><a href="https://forkcast.org/schedule" target="_blank" rel="noreferrer">Open the planning schedule <Arrow /></a></div>
  </>
}

function InclusionDecisionProcess() {
  return <>
    <StepHeading kicker="Coordination, not a legislature" title="How does an inclusion decision happen?">There is no single approver and usually no binding majority vote. ACD calls make implementation commitments, objections, and readiness visible.</StepHeading>
    <div className="decision-sequence">
      <article><span>1</span><div><b>A concrete question reaches an ACD agenda</b><p>A champion or participant provides context before the call. The useful question is specific, such as whether to move a proposal from PFI to CFI.</p></div></article>
      <article><span>2</span><div><b>Relevant participants surface constraints</b><p>Client teams, researchers, testing coordinators, and affected stakeholders explain support, objections, implementation burden, and dependencies.</p></div></article>
      <article><span>3</span><div><b>The facilitator tests for rough consensus</b><p>They summarize the apparent outcome and unresolved objections. Silence alone is weak evidence; willingness to implement and maintain the change matters.</p></div></article>
      <article><span>4</span><div><b>The outcome enters the public record</b><p>Meeting notes, recordings, Forkcast decisions, and the fork Meta EIP capture the result. Later evidence can reopen it.</p></div></article>
    </div>
    <div className="inclusion-warning"><b>“ACD approved it” is usually too simple.</b><p>Ask which call discussed it, what exact question was resolved, which implementers participated, what objections remained, and whether the fork Meta EIP changed.</p></div>
    <div className="route-handoffs"><a href="https://forkcast.org/calls" target="_blank" rel="noreferrer">Browse protocol calls <Arrow /></a><a href="https://forkcast.org/decisions" target="_blank" rel="noreferrer">Browse recorded decisions <Arrow /></a></div>
  </>
}

function InclusionReadiness() {
  const signals = [
    ['Specification', 'Independent implementers can tell exactly what behavior is required.'],
    ['Ownership', 'A champion follows through, and relevant teams know who can answer questions.'],
    ['Implementation', 'Multiple affected clients have credible implementation plans or working code.'],
    ['Testing', 'Tests, devnets, and interoperability work expose failures before activation.'],
    ['Evidence', 'Benchmarks, security analysis, and tradeoffs support the proposal’s claims.'],
    ['Fork fit', 'Its complexity, dependencies, and schedule fit alongside every other change in the fork.'],
  ]
  return <>
    <StepHeading kicker="A property of the whole effort" title="What makes a proposal ready?">Readiness is not one score or checklist. It is the combined confidence that teams can specify, implement, test, ship, and maintain the change safely.</StepHeading>
    <div className="readiness-grid">{signals.map(([title, detail], index) => <article key={title}><span>0{index + 1}</span><b>{title}</b><p>{detail}</p></article>)}</div>
    <div className="inclusion-warning"><b>Why can SFI still change?</b><p>Scheduled means the change is in the plan, not that risk has disappeared. Cross-client failures, security findings, unresolved specifications, or a fork-wide schedule problem can move or remove it.</p></div>
    <a className="forkcast-stage-link" href="https://forkcast.org/networks" target="_blank" rel="noreferrer"><span><b>Follow live network readiness in Forkcast</b><small>See devnets, testnets, and current network progress.</small></span><Arrow /></a>
  </>
}

function InclusionLookup({ selected, setSelected }: { selected: EipRecord | null, setSelected: (eip: EipRecord | null) => void }) {
  const [query, setQuery] = useState('')
  const [records, setRecords] = useState<EipRecord[]>([])
  useEffect(() => {
    let active = true
    fetch('/navigator/eip-index.json').then(response => response.json() as Promise<EipRecord[]>).then(data => { if (active) setRecords(data) }).catch(() => undefined)
    return () => { active = false }
  }, [])
  const terms = query.trim().toLowerCase().replace(/^eip-?/, '').split(/\s+/).filter(Boolean)
  const results = terms.length ? records.filter(eip => {
    const text = `${eip.number} ${eip.title} ${eip.summary} ${eip.keywords.join(' ')}`.toLowerCase()
    return terms.every(term => containsSearchTerm(text, term))
  }).slice(0, 6) : []
  return <>
    <StepHeading kicker="Use the live record" title="Check a proposal’s current position.">This tool teaches what stages mean. Forkcast tracks where a real proposal stands now and links the calls, decisions, and fork context behind it.</StepHeading>
    <div className="eip-finder inclusion-finder">
      <label htmlFor="inclusion-eip-search">EIP number, title, or keywords</label>
      <input id="inclusion-eip-search" value={query} onChange={event => { setQuery(event.target.value); setSelected(null) }} placeholder="Try “proposer builder”, “blob”, or “7702”" />
      {query && <div className="search-results">{results.length ? results.map(eip => <button key={eip.number} onClick={() => setSelected(eip)}><b>EIP-{eip.number}</b><span>{eip.title}</span><small>{eip.summary}</small></button>) : <p>{records.length ? 'No matching EIP. Try broader words.' : 'Loading the EIP index…'}</p>}</div>}
      {selected && <div className="lookup-result"><span className="forkcast-mark">⎇</span><div><b>EIP-{selected.number}: {selected.title}</b><p>Forkcast can show its current fork relationships, status history, analysis, and champion information.</p><a href={`https://forkcast.org/eips/${selected.number}`} target="_blank" rel="noreferrer">Open the live EIP page <Arrow /></a></div></div>}
    </div>
    <div className="inclusion-finish"><b>You now know how to read the stage.</b><p>Check the primary record for the current facts. Treat stage changes as conclusions about one fork at one time, not permanent judgments about an idea.</p><div className="route-handoffs"><a href="https://forkcast.org/upgrades" target="_blank" rel="noreferrer">Browse network upgrades <Arrow /></a><a href="https://forkcast.org/decisions" target="_blank" rel="noreferrer">Trace recent decisions <Arrow /></a></div></div>
  </>
}

type GuideProps = {
  step: number
  setStep: (step: number) => void
  scope: string | null
  setScope: (value: string) => void
  eipAnswer: EipAnswer
  setEipAnswer: (value: EipAnswer) => void
  selectedEip: EipRecord | null
  setSelectedEip: (value: EipRecord | null) => void
  buildState: string | null
  setBuildState: (value: string) => void
  evidence: string[]
  setEvidence: (value: string[]) => void
  onReset: () => void
}

function Guide(props: GuideProps) {
  const labels = ['Boundary', 'Find the EIP', 'Try it in code', 'Build the case', 'Your route']
  return (
    <main className="guide-page">
      <div className="guide-progress" aria-label={`Step ${props.step + 1} of 5`}>
        <span>Propose a feature</span>
        <div className="progress-track"><i style={{ width: `${((props.step + 1) / 5) * 100}%` }} /></div>
        <span>{props.step + 1} / 5</span>
      </div>
      <div className="guide-layout">
        <aside className="step-list" aria-label="Journey steps">
          {labels.map((label, index) => (
            <button key={label} className={index === props.step ? 'current' : index < props.step ? 'complete' : ''} onClick={() => index <= props.step && props.setStep(index)}>
              <span>{index < props.step ? '✓' : index + 1}</span>{label}
            </button>
          ))}
          <p>Your answers stay in this browser tab.</p>
        </aside>
        <section className="question-panel">
          {props.step === 0 && <ScopeStep value={props.scope} onChange={props.setScope} />}
          {props.step === 1 && <EipStep answer={props.eipAnswer} setAnswer={props.setEipAnswer} selected={props.selectedEip} setSelected={props.setSelectedEip} />}
          {props.step === 2 && <BuildStep value={props.buildState} onChange={props.setBuildState} />}
          {props.step === 3 && <EvidenceStep value={props.evidence} onChange={props.setEvidence} />}
          {props.step === 4 && <RouteStep {...props} />}
          <GuideControls {...props} />
        </section>
      </div>
    </main>
  )
}

function StepHeading({ kicker, title, children }: { kicker: string, title: string, children: React.ReactNode }) {
  return <div className="question-heading"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p>{children}</p></div>
}

function ScopeStep({ value, onChange }: { value: string | null, onChange: (value: string) => void }) {
  return <>
    <StepHeading kicker="First, draw the boundary" title="What would your idea change?">Pick the closest answer. This determines which specifications, calls, and implementers are likely to matter.</StepHeading>
    <div className="option-list">
      {scopeOptions.map(option => <Option key={option.id} selected={value === option.id} onClick={() => onChange(option.id)} title={option.title} detail={option.detail} />)}
    </div>
  </>
}

const searchAliases: Record<string, string[]> = {
  cheap: ['cheap', 'cost', 'fee', 'scaling'],
  cheaper: ['cheap', 'cost', 'fee', 'scaling'],
  privacy: ['privacy', 'private', 'confidential'],
  staking: ['staking', 'stake', 'validator'],
  wallet: ['wallet', 'account', 'eoa'],
}

const searchForms = (term: string) => {
  const singular = term.endsWith('ies') ? `${term.slice(0, -3)}y` : term.endsWith('s') && term.length > 3 ? term.slice(0, -1) : term
  return searchAliases[term] ?? [...new Set([term, singular])]
}

const containsSearchTerm = (text: string, term: string) => searchForms(term).some(form => text.includes(form))

function EipStep({ answer, setAnswer, selected, setSelected }: { answer: EipAnswer, setAnswer: (value: EipAnswer) => void, selected: EipRecord | null, setSelected: (value: EipRecord | null) => void }) {
  const [query, setQuery] = useState('')
  const [eipIndex, setEipIndex] = useState<EipRecord[]>([])
  const [forkStages, setForkStages] = useState<Map<number, EipRecord['forkRelationships']>>(new Map())
  const [indexError, setIndexError] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/navigator/eip-index.json')
      .then(response => {
        if (!response.ok) throw new Error('EIP index unavailable')
        return response.json() as Promise<EipRecord[]>
      })
      .then(records => { if (active) setEipIndex(records) })
      .catch(() => { if (active) setIndexError(true) })
    return () => { active = false }
  }, [])
  useEffect(() => {
    let active = true
    fetch('/navigator/eip-fork-stages.json')
      .then(response => response.json() as Promise<Array<{ number: number, forkRelationships: NonNullable<EipRecord['forkRelationships']> }>>)
      .then(records => { if (active) setForkStages(new Map(records.map(record => [record.number, record.forkRelationships]))) })
      .catch(() => undefined)
    return () => { active = false }
  }, [])

  const normalizedQuery = query.trim().toLowerCase().replace(/^eip-?/, '')
  const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean)
  const results = queryTerms.length ? eipIndex
    .map(eip => {
      const metadata = `${eip.number} ${eip.title} ${eip.summary} ${eip.status} ${eip.type} ${eip.category}`.toLowerCase()
      const keywordText = eip.keywords.join(' ')
      if (!queryTerms.every(term => containsSearchTerm(metadata, term) || containsSearchTerm(keywordText, term))) return null

      const score = queryTerms.reduce((total, term) => {
        if (String(eip.number) === term) return total + 100
        if (containsSearchTerm(eip.title.toLowerCase(), term)) return total + 12
        if (containsSearchTerm(eip.summary.toLowerCase(), term)) return total + 7
        const keywordPosition = eip.keywords.findIndex(keyword => containsSearchTerm(keyword, term))
        return total + (keywordPosition >= 0 ? Math.max(1, 5 - keywordPosition / 8) : 1)
      }, 0)
      return { eip, score }
    })
    .filter((result): result is { eip: EipRecord, score: number } => result !== null)
    .sort((a, b) => b.score - a.score || a.eip.number - b.eip.number)
    .slice(0, 8)
    .map(result => result.eip) : []
  const selectedRelationships = selected ? forkStages.get(selected.number) ?? [] : []
  const included = selectedRelationships.find(relationship => relationship.stage === 'Included')
  const scheduled = selectedRelationships.find(relationship => relationship.stage === 'Scheduled')
  return <>
    <StepHeading kicker="Avoid duplicating work" title="Is there already an EIP for this idea?">You do not need to know. Search by what the feature does, and we will check whether a proposal or shipped change already covers it.</StepHeading>
    <div className="answer-row">
      <button className={answer === 'yes' ? 'selected' : ''} onClick={() => setAnswer('yes')}>Yes</button>
      <button className={answer === 'no' ? 'selected' : ''} onClick={() => { setAnswer('no'); setSelected(null) }}>No</button>
      <button className={answer === 'unknown' ? 'selected recommended' : 'recommended'} onClick={() => setAnswer('unknown')}>I don’t know <span>recommended</span></button>
    </div>
    {(answer === 'yes' || answer === 'unknown') && <div className="eip-finder">
      <div className="finder-heading"><div><span className="tiny-label">EIP finder</span><h2>{selected ? `EIP-${selected.number} selected` : 'Search before you start'}</h2></div><span className="magnifier" aria-hidden="true">⌕</span></div>
      <label htmlFor="eip-search">EIP number, title, or a few keywords</label>
      <input id="eip-search" value={query} onChange={event => { setQuery(event.target.value); setSelected(null) }} placeholder="Try “blob”, “validator exits”, or “7702”" />
      {query && !selected && <div className="search-results">
        {results.length ? results.map(eip => <button key={eip.number} onClick={() => { setSelected(eip); setQuery('') }}><b>EIP-{eip.number}</b><span>{eip.title}</span><small>{eip.summary || `${eip.category || eip.type} · ${eip.status}`}</small></button>) : <p>{eipIndex.length ? 'No matching EIP. Try fewer or broader words.' : indexError ? 'The EIP index could not load. Use the canonical catalog below.' : 'Loading the complete EIP index…'}</p>}
      </div>}
      <a href={`https://eips.ethereum.org/all${query ? `?search=${encodeURIComponent(query)}` : ''}`} target="_blank" rel="noreferrer">Search the full canonical EIP catalog <Arrow /></a>
      <p className="source-note">Searches all EIPs by metadata and build-time keywords extracted from the full proposal text.</p>
      {selected && <a className="selected-eip-handoff" href={`https://forkcast.org/eips/${selected.number}`} target="_blank" rel="noreferrer"><span><b>Open EIP-{selected.number} in Forkcast</b><small>See its live analysis, fork relationships, timeline, and champion information.</small></span><Arrow /></a>}
      {included && <div className="existing-stage-alert included"><span>Already included</span><div><b>EIP-{selected?.number} shipped in {included.forkName}.</b><p>This feature is already part of Ethereum. Review the live record before proposing overlapping work.</p></div></div>}
      {!included && scheduled && <div className="existing-stage-alert scheduled"><span>Scheduled</span><div><b>EIP-{selected?.number} is SFI for {scheduled.forkName}.</b><p>Client implementation and testing are already underway. Join or inspect that effort before proposing a duplicate.</p></div></div>}
    </div>}
    {answer === 'no' && <div className="context-box"><span>What this means</span><p>Start with public problem exploration, not a polished EIP. Describe the problem, who it affects, prior attempts, and open questions. A specification becomes useful once the idea has enough shape to evaluate.</p></div>}
  </>
}

function BuildStep({ value, onChange }: { value: string | null, onChange: (value: string) => void }) {
  return <>
    <StepHeading kicker="Make the behavior concrete" title="Has anyone tried building this change?">This means runnable code, not merely writing the EIP. Early code reveals ambiguity, performance costs, and interactions that prose can hide.</StepHeading>
    <div className="plain-definition"><b>Client</b><p>Software that runs Ethereum, such as Geth, Nethermind, Besu, Reth, Lighthouse, or Prysm. A client contributor is a person who works on that software.</p><b>Prototype</b><p>A smaller experiment used to prove or measure one part of the idea.</p></div>
    <div className="option-list compact">
      {buildOptions.map(option => <Option key={option.id} selected={value === option.id} onClick={() => onChange(option.id)} title={option.title} detail={option.detail} />)}
    </div>
    <details className="example-drawer implementation-case"><summary>Case study: implementation between CFI and SFI <span>+</span></summary><div>
      <p className="case-intro"><strong>EIP-7778: Block Gas Accounting without Refunds</strong> shows the current non-headliner process well: client teams agreed to attempt it at CFI, then specifications, tests, and implementations evolved before the stronger SFI commitment.</p>
      <ol>
        <li><a href="https://forkcast.org/calls/acde/225" target="_blank" rel="noreferrer"><b>Considered for Inclusion</b><span>ACDE #225 agreed client teams should attempt EIP-7778 for Glamsterdam.</span><code>Dec 4, 2025</code></a></li>
        <li><a href="https://github.com/ethereum/execution-spec-tests/releases/tag/bal%40v4.0.0" target="_blank" rel="noreferrer"><b>Shared specification and tests</b><span>The BAL fixture release included executable EIP-7778 rules and cross-client test cases.</span><code>Jan 23, 2026</code></a></li>
        <li><a href="https://github.com/NethermindEth/nethermind/commit/f5eace2cfa9aa366b9691b108ae1f814204137bc" target="_blank" rel="noreferrer"><b>Nethermind implementation</b><span>The first production-client implementation merged.</span><code>Jan 26, 2026</code></a></li>
        <li><a href="https://github.com/ethereum/EIPs/commit/3929b1aab57b493417eccec7457d1485eccb9768" target="_blank" rel="noreferrer"><b>Specification corrected</b><span>After implementation discussion, a proposed receipt field was removed to simplify client behavior.</span><code>Jan 28, 2026</code></a></li>
        <li><a href="https://github.com/paradigmxyz/reth/commit/7671838c61f0fc180a1363ecdb7be4a2934e842e" target="_blank" rel="noreferrer"><b>Reth implementation</b><span>Receipt and block-validation handling merged.</span><code>Feb 4, 2026</code></a></li>
        <li><a href="https://github.com/ethereum/go-ethereum/commit/6d0dd0886000a2011bc79872b74ccfe9c672c40d" target="_blank" rel="noreferrer"><b>Geth implementation</b><span>Geth’s EIP-7778 accounting change merged.</span><code>Mar 4, 2026</code></a></li>
        <li><a href="https://forkcast.org/calls/acde/236" target="_blank" rel="noreferrer"><b>Scheduled for Inclusion</b><span>After implementation and devnet work, ACDE #236 moved EIP-7778 to SFI.</span><code>May 7, 2026</code></a></li>
      </ol>
      <p className="case-caveat"><strong>Iteration is expected:</strong> the EIP text changed three times after CFI and before SFI: a receipt field was added, user accounting was clarified, then the field was removed. Tests were updated with it. Since SFI, there have been no normative EIP changes as of August 2026, only a Draft-to-Review status update.</p>
    </div></details>
  </>
}

function EvidenceStep({ value, onChange }: { value: string[], onChange: (value: string[]) => void }) {
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter(item => item !== id) : [...value, id])
  return <>
    <StepHeading kicker="A champion connects the work" title="What does the proposal have today?">Select everything you can point to. Examples show what each category means; you do not need all six before discussing an idea.</StepHeading>
    <div className="evidence-grid">
      {evidenceOptions.map(item => <button key={item.id} className={value.includes(item.id) ? 'selected' : ''} onClick={() => toggle(item.id)} aria-pressed={value.includes(item.id)}>
        <span className="evidence-mark">{item.mark}</span><span><b>{item.title}</b><small>{item.example}</small></span><i>{value.includes(item.id) ? '✓' : '+'}</i>
      </button>)}
    </div>
    <div className="context-box"><span>Champion ≠ author</span><p>A champion keeps the proposal moving: finding the right people, surfacing objections, coordinating evidence, and following through. They do not need to write every specification, implementation, or test themselves.</p></div>
    <div className="forkcast-callout"><span className="forkcast-mark" aria-hidden="true">⎇</span><div><b>Make the proposal legible in Forkcast</b><p>Forkcast’s champion guide shows how to contribute a layman description, benefits, tradeoffs, stakeholder impacts, supporting documents, and FAQ.</p><a href="https://forkcast.org/champions/" target="_blank" rel="noreferrer">Open the EIP Champion Guide <Arrow /></a></div></div>
  </>
}

function RouteStep(props: GuideProps) {
  const hasCode = props.buildState === 'client' || props.buildState === 'prototype'
  const hasSpec = props.evidence.includes('spec') || Boolean(props.selectedEip)
  const next = !props.eipAnswer || props.eipAnswer === 'no'
    ? { title: 'Make the problem legible', text: 'Write a short problem statement and search for prior proposals before investing in a formal specification.' }
    : !hasSpec
      ? { title: 'Turn the idea into testable behavior', text: 'Work with potential authors and implementers on a draft specification with explicit edge cases.' }
      : !hasCode
        ? { title: 'Find an implementation partner', text: 'Ask relevant client contributors what a minimal prototype would need to answer. Agenda time alone will not substitute for this work.' }
        : props.evidence.length < 4
          ? { title: 'Close the evidence gaps', text: 'Use the prototype to produce tests, measurements, and risk analysis. Record objections and answer them in public artifacts.' }
          : { title: 'Prepare a focused inclusion conversation', text: 'Summarize the specification, implementations, tests, tradeoffs, open risks, and which teams are prepared to maintain the change.' }
  return <>
    <StepHeading kicker="Your next useful move" title={next.title}>{next.text}</StepHeading>
    <div className="route-summary">
      <div className="route-primary"><span>Do this next</span><h2>{next.title}</h2><p>{next.text}</p></div>
      <div className="route-checks">
        <h3>Your signals</h3>
        <p><span>{props.selectedEip ? '✓' : '○'}</span>{props.selectedEip ? `EIP-${props.selectedEip.number} identified` : props.eipAnswer === 'no' ? 'No EIP yet' : 'EIP still to identify'}</p>
        <p><span>{hasCode ? '✓' : '○'}</span>{hasCode ? 'Runnable code exists' : 'No runnable code identified'}</p>
        <p><span>{props.evidence.length >= 4 ? '✓' : '○'}</span>{props.evidence.length} of 6 evidence areas selected</p>
      </div>
    </div>
    <div className="not-yet"><span>Probably not yet</span><p>Do not frame an ACD agenda slot as an approval request. Use it to resolve a specific cross-client question once the relevant material and people are ready.</p></div>
    <div className="route-handoffs">
      {props.selectedEip && <a href={`https://forkcast.org/eips/${props.selectedEip.number}`} target="_blank" rel="noreferrer">Track EIP-{props.selectedEip.number} in Forkcast <Arrow /></a>}
      <a href="https://forkcast.org/champions/" target="_blank" rel="noreferrer">Prepare its Forkcast champion data <Arrow /></a>
    </div>
    <button className="text-action" onClick={props.onReset}>Start over with another feature ↻</button>
  </>
}

function Option({ selected, onClick, title, detail }: { selected: boolean, onClick: () => void, title: string, detail: string }) {
  return <button className={`option ${selected ? 'selected' : ''}`} onClick={onClick}><span className="radio">{selected ? '●' : ''}</span><span><b>{title}</b><small>{detail}</small></span></button>
}

function GuideControls(props: GuideProps) {
  const canContinue = [Boolean(props.scope), Boolean(props.eipAnswer && (props.eipAnswer !== 'yes' || props.selectedEip)), Boolean(props.buildState), true][props.step] ?? false
  if (props.step === 4) return null
  return <div className="guide-controls">
    <button className="back-action" onClick={() => props.step > 0 ? props.setStep(props.step - 1) : props.onReset()} disabled={props.step === 0}>← Back</button>
    <button className="primary-action" disabled={!canContinue} onClick={() => props.setStep(props.step + 1)}>Continue <span>→</span></button>
  </div>
}
