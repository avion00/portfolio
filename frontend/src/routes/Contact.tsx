import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Abhishek Kumar Chaudhary — AI automation, SaaS, mobile and enterprise software. Email amic8848@gmail.com or message on WhatsApp."
        path="/contact"
      />
      <PageHero
        label="Contact"
        lines={["Let's build", 'something intelligent.']}
        intro="Tell me about your project — AI automation, SaaS, mobile or enterprise systems. Share a few details and I'll get back within one business day."
      />
      <ContactSection />
    </>
  )
}
