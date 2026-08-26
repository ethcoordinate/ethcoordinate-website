export type Screen =
  | 'home'
  | 'guide'
  | 'inclusion'
  | 'decisions'
  | 'participate'
  | 'process'
  | 'people'
  | 'resources'

type ScreenRoute = {
  slug: string
  title: string
  description: string
}

// One entry per navigator screen, so every screen has an address of its own and
// its own metadata. 'home' owns /navigator itself and therefore has no slug.
export const screenRoutes: Record<Screen, ScreenRoute> = {
  home: {
    slug: '',
    title: 'ACD Navigator',
    description:
      'An interactive, plain-language guide to Ethereum’s EIP, AllCoreDevs, and network-upgrade processes. Start with your goal, not the process vocabulary.',
  },
  guide: {
    slug: 'propose-a-feature',
    title: 'Propose a feature for Ethereum',
    description:
      'Start with an idea, with or without an EIP. Draw the boundary of the change, then find the specifications, calls, and implementers that matter.',
  },
  inclusion: {
    slug: 'fork-inclusion',
    title: 'Understand fork inclusion',
    description:
      'How an EIP becomes proposed, considered, scheduled, or included in one network upgrade, and how client teams coordinate those outcomes.',
  },
  decisions: {
    slug: 'trace-a-decision',
    title: 'Trace a decision',
    description:
      'Find the evidence behind an outcome. Identify the exact question, participants, reasoning, and resulting artifact.',
  },
  participate: {
    slug: 'join-the-process',
    title: 'Join the process',
    description:
      'There is no application form for core developer. Start with a concrete contribution in a public working area and build context over time.',
  },
  process: {
    slug: 'how-changes-happen',
    title: 'How a proposal reaches mainnet',
    description:
      'Explore the route from a problem to mainnet activation. This map describes common coordination practice, not a guaranteed pipeline.',
  },
  people: {
    slug: 'who-is-involved',
    title: 'Who’s involved',
    description:
      'Meet the roles and teams involved in proposing, reviewing, implementing, and testing protocol changes.',
  },
  resources: {
    slug: 'useful-links',
    title: 'Continue with primary and live sources',
    description:
      'Use ACD Navigator for orientation, then verify changing facts in Forkcast and the canonical process documents.',
  },
}

export const screens = Object.keys(screenRoutes) as Screen[]

export function screenPath(screen: Screen) {
  const { slug } = screenRoutes[screen]
  return slug ? `/navigator/${slug}` : '/navigator'
}

export function screenFromSlug(slug: string | undefined): Screen | null {
  if (!slug) return 'home'
  return screens.find(screen => screenRoutes[screen].slug === slug) ?? null
}

export function screenFromPath(pathname: string): Screen {
  const slug = pathname.replace(/^\/navigator\/?/, '').replace(/\/$/, '')
  return screenFromSlug(slug) ?? 'home'
}
