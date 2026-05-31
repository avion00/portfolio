// Content for the legal pages (Privacy, Terms, Cookies). Edit the copy here —
// the LegalPage component renders it with a sticky table of contents.
//
// NOTE: This is sensible, professional boilerplate for a personal portfolio /
// freelance site. Have a legal professional review it before relying on it.

import { OWNER_NAME, COMPANY_NAME, CONTACT_EMAIL } from '@/data/nav'

export interface LegalSection {
  /** Anchor id used by the table of contents. */
  id: string
  heading: string
  /** One entry per paragraph. */
  body: string[]
}

export interface LegalDoc {
  path: string
  /** Small label above the title. */
  label: string
  /** Hero heading, one entry per animated line. */
  lines: string[]
  intro: string
  seo: string
  /** Human-readable "last updated" date. */
  updated: string
  sections: LegalSection[]
}

const UPDATED = 'June 1, 2026'

export const privacy: LegalDoc = {
  path: '/privacy',
  label: 'Legal',
  lines: ['Privacy', 'Policy.'],
  intro:
    'How your information is collected, used and protected when you visit this site or get in touch.',
  seo: `How ${OWNER_NAME} collects, uses and protects your information on this website.`,
  updated: UPDATED,
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      body: [
        `This Privacy Policy explains how ${OWNER_NAME} ("I", "me" or "we") handles information collected through this portfolio website. It applies to visitors, prospective clients and anyone who contacts me through the site.`,
        'By using this website you agree to the collection and use of information in line with this policy. If you do not agree, please discontinue use of the site.',
      ],
    },
    {
      id: 'information-we-collect',
      heading: 'Information We Collect',
      body: [
        'Information you provide: when you use the contact form or email me, I receive the details you share — typically your name, email address and the contents of your message.',
        'Information collected automatically: like most websites, basic technical data such as your IP address, browser type, device and the pages you view may be recorded through cookies and analytics to keep the site secure and understand how it is used.',
      ],
    },
    {
      id: 'how-we-use',
      heading: 'How We Use Your Information',
      body: [
        'Your information is used to respond to enquiries, deliver and improve services, maintain security, analyse site performance and meet legal obligations.',
        'I do not sell your personal information, and I do not share it for third-party advertising.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies & Analytics',
      body: [
        'This site uses cookies and similar technologies for essential functionality, to remember preferences (such as theme), and to measure traffic. You can read more in the Cookie Policy and control cookies through your browser.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Sharing & Third Parties',
      body: [
        'Information may be processed by trusted service providers that help operate the site — for example hosting, analytics and email delivery — who are only permitted to use it to provide those services.',
        'I may also disclose information where required by law or to protect rights, safety and property.',
      ],
    },
    {
      id: 'security',
      heading: 'Data Security',
      body: [
        'Reasonable technical and organisational measures are used to protect your information. However, no method of transmission or storage is completely secure, and absolute security cannot be guaranteed.',
      ],
    },
    {
      id: 'retention',
      heading: 'Data Retention',
      body: [
        'Personal information is kept only for as long as necessary to fulfil the purposes described in this policy or to comply with legal and accounting requirements, after which it is deleted or anonymised.',
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your Rights',
      body: [
        'Depending on your location, you may have the right to access, correct, delete or restrict the use of your personal information, and to object to certain processing.',
        `To exercise any of these rights, contact me at ${CONTACT_EMAIL} and I will respond within a reasonable timeframe.`,
      ],
    },
    {
      id: 'international',
      heading: 'International Transfers',
      body: [
        `This site is operated from Nepal and serves clients worldwide. Your information may therefore be processed in countries other than your own, with appropriate safeguards in place.`,
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to This Policy',
      body: [
        'This policy may be updated from time to time. The "last updated" date at the top reflects the most recent revision; significant changes will be highlighted on this page.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      body: [
        `Questions about this Privacy Policy can be sent to ${CONTACT_EMAIL}.`,
      ],
    },
  ],
}

export const terms: LegalDoc = {
  path: '/terms',
  label: 'Legal',
  lines: ['Terms &', 'Conditions.'],
  intro:
    'The terms that govern your use of this website and any content or services accessed through it.',
  seo: `The terms and conditions governing use of ${OWNER_NAME}'s website.`,
  updated: UPDATED,
  sections: [
    {
      id: 'acceptance',
      heading: 'Acceptance of Terms',
      body: [
        `By accessing or using this website you agree to be bound by these Terms & Conditions and by the Privacy Policy. If you do not agree, please do not use the site.`,
      ],
    },
    {
      id: 'use-of-site',
      heading: 'Use of the Site',
      body: [
        'You may use this site for lawful, personal and informational purposes. You agree not to misuse it, interfere with its operation, or attempt to access it in ways not intended by its design.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual Property',
      body: [
        `All content on this site — including text, designs, graphics, code and project material — is owned by ${OWNER_NAME} or used with permission, and is protected by intellectual property laws.`,
        'You may not copy, reproduce, distribute or create derivative works from any part of this site without prior written consent.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable Use',
      body: [
        'You agree not to use the site to transmit harmful code, attempt unauthorised access, scrape content at scale, or engage in any activity that could damage, disable or impair the site or its security.',
      ],
    },
    {
      id: 'services',
      heading: 'Services & Engagements',
      body: [
        'This website is informational. Any professional engagement, quote or deliverable is governed by a separate written agreement and is not created merely by browsing the site or submitting an enquiry.',
      ],
    },
    {
      id: 'third-party-links',
      heading: 'Third-Party Links',
      body: [
        'The site may link to third-party websites or services. I am not responsible for the content, policies or practices of those third parties, and accessing them is at your own risk.',
      ],
    },
    {
      id: 'disclaimer',
      heading: 'Disclaimer',
      body: [
        'This site and its content are provided "as is" and "as available" without warranties of any kind, whether express or implied, including fitness for a particular purpose and accuracy of information.',
      ],
    },
    {
      id: 'limitation',
      heading: 'Limitation of Liability',
      body: [
        `To the fullest extent permitted by law, ${OWNER_NAME} shall not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, this website.`,
      ],
    },
    {
      id: 'indemnification',
      heading: 'Indemnification',
      body: [
        'You agree to indemnify and hold harmless the site owner from any claims, losses or expenses arising out of your misuse of the site or breach of these terms.',
      ],
    },
    {
      id: 'governing-law',
      heading: 'Governing Law',
      body: [
        'These terms are governed by the laws of Nepal, without regard to conflict-of-law principles. Any disputes shall be subject to the courts located in Nepal.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to These Terms',
      body: [
        'These terms may be revised at any time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      body: [`Questions about these terms can be sent to ${CONTACT_EMAIL}.`],
    },
  ],
}

export const cookies: LegalDoc = {
  path: '/cookies',
  label: 'Legal',
  lines: ['Cookie', 'Policy.'],
  intro:
    'What cookies are, how this site uses them, and how you can stay in control.',
  seo: `How ${OWNER_NAME}'s website uses cookies and how you can manage them.`,
  updated: UPDATED,
  sections: [
    {
      id: 'what',
      heading: 'What Are Cookies',
      body: [
        'Cookies are small text files stored on your device when you visit a website. They help the site work properly, remember your preferences and understand how it is being used.',
      ],
    },
    {
      id: 'how',
      heading: 'How We Use Cookies',
      body: [
        'This site uses cookies to keep essential features working, to remember choices such as your theme or language, and to gather anonymous statistics about how visitors use the site.',
      ],
    },
    {
      id: 'types',
      heading: 'Types of Cookies We Use',
      body: [
        'Essential cookies — required for the site to function and cannot be switched off.',
        'Preference cookies — remember settings like dark/light theme and language.',
        'Analytics cookies — help measure traffic and improve the experience, in aggregate and anonymised form.',
      ],
    },
    {
      id: 'managing',
      heading: 'Managing Cookies',
      body: [
        'You can control or delete cookies through your browser settings, and set most browsers to block them. Note that disabling some cookies may affect how parts of the site work.',
      ],
    },
    {
      id: 'third-party',
      heading: 'Third-Party Cookies',
      body: [
        'Some cookies may be set by third-party services used on the site (such as analytics providers). Their use of cookies is governed by their own privacy and cookie policies.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes',
      body: [
        'This Cookie Policy may be updated periodically. The "last updated" date above reflects the latest version.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      body: [
        `Questions about cookies on this site can be sent to ${CONTACT_EMAIL}. This policy is part of, and should be read alongside, the Privacy Policy of ${COMPANY_NAME}.`,
      ],
    },
  ],
}

export const legalDocs = { privacy, terms, cookies }
