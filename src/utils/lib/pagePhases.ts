export const PAGE_PHASES = ['has-landed', 'has-loaded', 'has-displayed', 'has-completed'] as const;

export type PagePhase = (typeof PAGE_PHASES)[number];
