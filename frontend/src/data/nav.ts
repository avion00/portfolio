export interface NavItem {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/works" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
];

/** Secondary destinations surfaced in the footer. */
export const extraNavItems: NavItem[] = [
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/skills' },
  { label: 'Company', to: '/company' },
]

/** Legal + utility pages surfaced in the footer. */
export const legalNavItems: NavItem[] = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookies' },
  { label: 'Sitemap', to: '/sitemap' },
]

/* ----------------------------- identity ----------------------------- */
export const OWNER_NAME = 'Abhishek Kumar Chaudhary'
export const OWNER_SHORT = 'Abhishek Chaudhary'
export const COMPANY_NAME = 'AutoStacks'
export const COMPANY_URL = 'https://autostacks.com'

/* ----------------------------- contact ------------------------------ */
export const CONTACT_EMAIL = 'amic8848@gmail.com'
export const CONTACT_PHONE = '+977 9824360882'
export const CONTACT_PHONE_RAW = '+9779824360882'
export const WHATSAPP_URL = 'https://wa.me/9779824360882'

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/avion00" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhishek-chaudhary-45a803293/",
  },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "AutoStacks", href: COMPANY_URL },
];
