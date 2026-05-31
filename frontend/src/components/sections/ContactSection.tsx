import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Input, Textarea, Select, Field } from '@/components/ui/form'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_RAW,
  WHATSAPP_URL,
  SOCIALS,
} from '@/data/nav'

const budgets = ['< $2k', '$2k – $10k', '$10k – $30k', '$30k+']

export function ContactSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]' })
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // No backend yet — simulate a successful submission.
    setSent(true)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden border-t border-line py-24 md:py-36"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          {/* left — CTA */}
          <div>
            <div data-reveal>
              <SectionLabel>Contact</SectionLabel>
            </div>
            <RevealText
              as="h2"
              lines={["Let's build something", 'intelligent together.']}
              className="mt-8 font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-6xl md:text-7xl"
            />
            <p
              data-reveal
              className="mt-8 max-w-md text-base leading-relaxed text-muted"
            >
              Tell me about your project — AI automation, a SaaS product, a
              mobile app or an enterprise system. I work with a focused number of
              clients to keep every build exceptional.
            </p>

            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton variant="solid" href={`mailto:${CONTACT_EMAIL}`}>
                Email Me
              </MagneticButton>
              <MagneticButton variant="outline" href={WHATSAPP_URL}>
                WhatsApp
              </MagneticButton>
              <MagneticButton
                variant="outline"
                href={`tel:${CONTACT_PHONE_RAW}`}
              >
                Call
              </MagneticButton>
            </div>

            <div data-reveal className="mt-8 space-y-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onPointerEnter={() => setCursorVariant('hover')}
                onPointerLeave={() => setCursorVariant('default')}
                className="block text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                onPointerEnter={() => setCursorVariant('hover')}
                onPointerLeave={() => setCursorVariant('default')}
                className="block text-muted transition-colors hover:text-fg"
              >
                {CONTACT_PHONE}
              </a>
            </div>

            <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onPointerEnter={() => setCursorVariant('hover')}
                    onPointerLeave={() => setCursorVariant('default')}
                    className="font-mono-label text-muted/70 transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* right — form */}
          <div
            data-reveal
            className="relative rounded-3xl border border-line bg-surface/50 p-6 backdrop-blur-md md:p-8"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-accent text-accent">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-fg">
                    Message sent
                  </h3>
                  <p className="mt-3 max-w-xs text-sm text-muted">
                    Thanks — I'll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="font-mono-label mt-8 text-muted transition-colors hover:text-fg"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <Input id="name" name="name" placeholder="Jane Doe" required />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@brand.com"
                        required
                      />
                    </Field>
                  </div>

                  <Field label="Budget" htmlFor="budget">
                    <Select id="budget" name="budget" defaultValue="">
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Message" htmlFor="message">
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project…"
                      required
                    />
                  </Field>

                  <div className="mt-2">
                    <MagneticButton variant="solid" type="submit">
                      Send Message
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
