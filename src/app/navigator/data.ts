export type EipRecord = {
  number: number
  title: string
  summary: string
  status: string
  type: string
  category: string
  keywords: string[]
  forkRelationships?: ForkRelationship[]
}

export type ForkRelationship = {
  forkName: string
  stage: string
  date: string | null
}

export const scopeOptions = [
  { id: 'execution', title: 'How transactions execute', detail: 'Opcodes, gas costs, accounts, fees, or execution-layer state.' },
  { id: 'consensus', title: 'How the network agrees', detail: 'Validators, attestations, finality, fork choice, or block proposals.' },
  { id: 'networking', title: 'How nodes communicate', detail: 'Peer-to-peer messages, data propagation, or discovery.' },
  { id: 'interface', title: 'How apps talk to nodes', detail: 'JSON-RPC methods, APIs, wallet behavior, or application conventions.' },
  { id: 'process', title: 'A process or information standard', detail: 'A shared convention, Meta EIP, or description of a protocol process.' },
  { id: 'unsure', title: 'I’m not sure yet', detail: 'That is normal. You can clarify the boundary while discussing the idea.' },
]

export const buildOptions = [
  { id: 'client', title: 'Yes, in a client', detail: 'There is a branch or pull request in an execution or consensus client.' },
  { id: 'prototype', title: 'Yes, as a prototype', detail: 'There is runnable code, but it is not integrated into a production client.' },
  { id: 'spec', title: 'Only specification work', detail: 'The behavior is written down, but nobody has demonstrated it in code yet.' },
  { id: 'none', title: 'No, not yet', detail: 'The idea is still at the research or discussion stage.' },
  { id: 'unknown', title: 'I don’t know', detail: 'You may need to ask the authors or search client repositories.' },
]

export const evidenceOptions = [
  { id: 'spec', title: 'Precise specification', example: 'A draft EIP defining exact state transitions, constants, and edge cases.', mark: '§' },
  { id: 'implementation', title: 'Working implementation', example: 'A Geth, Nethermind, Besu, Ethrex, Reth, Lighthouse, or Prysm pull request.', mark: '</>' },
  { id: 'tests', title: 'Tests and devnets', example: 'Execution-spec tests, consensus-spec tests, hive results, or a multi-client devnet.', mark: '✓' },
  { id: 'measurement', title: 'Measurements', example: 'Benchmarks showing CPU, bandwidth, state growth, or propagation impact.', mark: 'ms' },
  { id: 'security', title: 'Risk analysis', example: 'Written failure modes, DoS analysis, audits, or answers to raised concerns.', mark: '!' },
  { id: 'support', title: 'Implementer interest', example: 'Named client teams willing to review, implement, and maintain the change.', mark: '+' },
]

export const intents = [
  { id: 'champion', title: 'Propose a feature for Ethereum', detail: 'Start with an idea, whether or not an EIP already exists.', available: true },
  { id: 'fork', title: 'Understand fork inclusion', detail: 'See how a proposal moves from discussion to mainnet.', available: true },
  { id: 'decision', title: 'Trace a decision', detail: 'Find who participated, what was decided, and the primary sources.', available: true },
  { id: 'participate', title: 'Join the process', detail: 'Learn where to contribute and how to prepare for an ACD call.', available: true },
]

export const inclusionStages = [
  {
    id: 'pfi',
    abbreviation: 'PFI',
    title: 'Proposed for Inclusion',
    meaning: 'Someone is formally asking for this change to be considered for a particular network upgrade.',
    not: 'It does not mean client teams support it or have committed to implementation.',
    question: 'Is the proposal clear enough, relevant enough, and owned enough to evaluate?',
  },
  {
    id: 'cfi',
    abbreviation: 'CFI',
    title: 'Considered for Inclusion',
    meaning: 'The proposal is a serious candidate, and implementers are willing to spend time evaluating and developing it.',
    not: 'It is not guaranteed to ship. Open design, implementation, or testing problems can still remove it.',
    question: 'Can the remaining questions be answered within this fork’s time and complexity budget?',
  },
  {
    id: 'sfi',
    abbreviation: 'SFI',
    title: 'Scheduled for Inclusion',
    meaning: 'The change is in the planned fork scope and client teams are working toward shipping it.',
    not: 'It is not irreversible. A serious safety, specification, interoperability, or scheduling problem can change the plan.',
    question: 'Can independent clients implement and test the combined fork safely?',
  },
  {
    id: 'dfi',
    abbreviation: 'DFI',
    title: 'Declined for Inclusion',
    meaning: 'The proposal will not be included in that particular network upgrade.',
    not: 'It does not necessarily mean the idea is permanently rejected or technically bad.',
    question: 'Should the proposal be revised, researched further, or proposed for a later fork?',
  },
]

export const processNodes = [
  {
    id: 'problem',
    short: 'Problem',
    title: 'Someone identifies something Ethereum needs',
    summary: 'There\'s something Ethereum needs and can\'t be provided for on the app layer. There\'s active, explicit consensus among a type of user that this is needed.',
    next: 'Find prior work and the people affected by the change.',
    people: 'Researchers, application builders, client contributors, or anyone with evidence.',
    artifact: 'A research post, Ethereum Magicians thread, issue, or concise problem statement.',
    caveat: 'If people do not agree on what problem needs solving, they cannot properly evaluate the proposed solution.',
  },
  {
    id: 'spec',
    short: 'Specification',
    title: 'An author writes down the rules',
    summary: 'An EIP describes exactly what clients must do, including edge cases, so separate teams can build the same change and get the same result.',
    next: 'Resolve ambiguity through review and implementation feedback.',
    people: 'EIP authors, editors, subject-matter reviewers, and potential implementers.',
    artifact: 'A numbered EIP and, for many Core proposals, executable specifications or test vectors.',
    caveat: 'An EIP documents a proposal. Its status does not grant fork inclusion.',
  },
  {
    id: 'implementation',
    short: 'Client work',
    title: 'Authors, champions, or client teams prototype it',
    summary: 'A prototype turns the proposal into working code and exposes costs, ambiguities, and interactions. Building one outside a client team is useful, but it is a high bar.',
    next: 'Compare independent implementations and publish measurements.',
    people: 'Execution, consensus, and networking client contributors relevant to the change.',
    artifact: 'Branches, pull requests, benchmarks, implementation notes, and specification feedback.',
    caveat: 'One prototype is evidence, not ecosystem-wide commitment.',
  },
  {
    id: 'inclusion',
    short: 'Inclusion',
    title: 'Client teams evaluate it for a fork',
    summary: 'AllCoreDevs participants surface support, objections, dependencies, and readiness for a particular upgrade.',
    next: 'Address open concerns and meet the fork’s implementation and testing constraints.',
    people: 'Relevant client teams, champions, testing coordinators, researchers, and ACD facilitators.',
    artifact: 'Fork Meta EIP stage, ACD agenda material, meeting notes, and recorded rationale.',
    caveat: 'Discussion is not a vote by a legislature. Readiness and willingness to ship matter.',
  },
  {
    id: 'testing',
    short: 'Testing',
    title: 'Client and testing teams test the fork',
    summary: 'Multiple clients exercise the combined fork through tests, devnets, shadow forks, and public testnets.',
    next: 'Fix interoperability and operational failures; repeat until the fork is ready.',
    people: 'Client teams, test authors, devops coordinators, security researchers, and infrastructure operators.',
    artifact: 'Test suites, hive runs, devnet reports, testnet activations, and client releases.',
    caveat: 'A feature can move backward or be removed if it threatens the larger fork.',
  },
  {
    id: 'activation',
    short: 'Activation',
    title: 'Nodes activate the upgrade',
    summary: 'Released clients apply the agreed rules at a configured block, timestamp, or epoch.',
    next: 'Monitor the network and preserve an accurate historical record.',
    people: 'Node operators, client teams, stakers, infrastructure providers, and the broader ecosystem.',
    artifact: 'Client releases, activation parameters, fork specifications, and network monitoring.',
    caveat: 'Mainnet activation is the result of coordinated software adoption, not an EIP changing status.',
  },
]

export const roles = [
  {
    id: 'author',
    title: 'EIP author',
    does: 'Defines the proposal, incorporates feedback, and keeps the document technically coherent.',
    not: 'Does not decide that clients must implement it or that a fork must include it.',
    start: 'Develop the idea publicly, read EIP-1, find reviewers, and submit a well-scoped draft.',
  },
  {
    id: 'champion',
    title: 'Feature champion',
    does: 'Connects specification, implementation, testing, evidence, and the people needed to resolve objections.',
    not: 'Does not need to personally author every artifact or hold a formal title.',
    start: 'Adopt a concrete proposal, understand its open questions, and consistently follow through.',
  },
  {
    id: 'client',
    title: 'Client contributor',
    does: 'Builds software that runs Ethereum. Client contributors are core developers by contribution, not credential; not all core developers work on clients.',
    not: 'Does not individually speak for every client or unilaterally determine consensus.',
    start: 'Contribute tests and fixes, learn a client codebase, and participate in technical review.',
  },
  {
    id: 'editor',
    title: 'EIP editor',
    does: 'Reviews EIPs for process, format, scope, and sufficient technical clarity to enter the repository.',
    not: 'Does not decide whether a Core EIP belongs in a network upgrade.',
    start: 'Review proposals, learn EIP-1 and repository conventions, and contribute consistently.',
  },
  {
    id: 'facilitator',
    title: 'ACD facilitator',
    does: 'Prepares agendas, moderates discussion, captures outcomes, and helps the group find unresolved concerns.',
    not: 'Does not act as a protocol president or replace client-team judgment.',
    start: 'Follow calls, improve agendas and notes, and help turn broad debates into answerable questions.',
  },
  {
    id: 'testing',
    title: 'Testing coordinator',
    does: 'Organizes specifications, tests, devnets, and monitoring that reveal whether independent clients interoperate safely.',
    not: 'Does not merely run a final checklist after all design decisions are complete.',
    start: 'Contribute test cases, reproduce cross-client failures, and support devnet operations.',
  },
]

export type ClientTeam = {
  name: string
  layer: 'EL' | 'CL'
  language: string
  description: string
  repository: string
}

export const clientTeams: ClientTeam[] = [
  { name: 'Besu', layer: 'EL', language: 'Java', description: 'Execution client hosted by the Hyperledger Foundation.', repository: 'https://github.com/hyperledger/besu' },
  { name: 'Erigon', layer: 'EL', language: 'Go', description: 'Execution client focused on efficiency and modularity.', repository: 'https://github.com/erigontech/erigon' },
  { name: 'Ethrex', layer: 'EL', language: 'Rust', description: 'A modular, ZK-native execution client maintained by LambdaClass.', repository: 'https://github.com/lambdaclass/ethrex' },
  { name: 'Geth', layer: 'EL', language: 'Go', description: 'The Go Ethereum execution client.', repository: 'https://github.com/ethereum/go-ethereum' },
  { name: 'Nethermind', layer: 'EL', language: 'C#', description: 'A .NET execution client.', repository: 'https://github.com/NethermindEth/nethermind' },
  { name: 'Reth', layer: 'EL', language: 'Rust', description: 'A modular Rust execution client.', repository: 'https://github.com/paradigmxyz/reth' },
  { name: 'Grandine', layer: 'CL', language: 'Rust', description: 'A high-performance consensus client.', repository: 'https://github.com/grandinetech/grandine' },
  { name: 'Lighthouse', layer: 'CL', language: 'Rust', description: 'A consensus client maintained by Sigma Prime.', repository: 'https://github.com/sigp/lighthouse' },
  { name: 'Lodestar', layer: 'CL', language: 'TypeScript', description: 'A TypeScript consensus client maintained by ChainSafe.', repository: 'https://github.com/ChainSafe/lodestar' },
  { name: 'Nimbus', layer: 'CL', language: 'Nim', description: 'A resource-efficient consensus client.', repository: 'https://github.com/status-im/nimbus-eth2' },
  { name: 'Prysm', layer: 'CL', language: 'Go', description: 'A Go consensus client.', repository: 'https://github.com/OffchainLabs/prysm' },
  { name: 'Teku', layer: 'CL', language: 'Java', description: 'A Java consensus client maintained by Consensys.', repository: 'https://github.com/Consensys/teku' },
]
