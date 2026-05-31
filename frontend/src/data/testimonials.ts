export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  /** Initials shown in the avatar chip. */
  initials: string
}

/**
 * Placeholder testimonials — replace the names/quotes with real client
 * feedback. Kept generic and clearly swappable.
 */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Abhishek built our AI automation system end to end. It now runs workflows that used to take our team hours — flawlessly and around the clock.',
    name: 'Client — SaaS Startup',
    role: 'Founder, Europe',
    initials: 'SE',
  },
  {
    id: 't2',
    quote:
      'He delivered a complex ERP/CRM platform with incredible attention to architecture and detail. One of the most capable engineers I have worked with.',
    name: 'Client — Enterprise',
    role: 'Operations Director',
    initials: 'ED',
  },
  {
    id: 't3',
    quote:
      'Our cross-platform mobile app shipped on time and feels completely native. Communication was clear and the code quality was excellent.',
    name: 'Client — Product Team',
    role: 'Product Manager, International',
    initials: 'PM',
  },
  {
    id: 't4',
    quote:
      'The multi-agent AI system Abhishek designed transformed how we handle support and operations. Truly enterprise-grade work.',
    name: 'Client — Technology Company',
    role: 'CTO',
    initials: 'CT',
  },
]
