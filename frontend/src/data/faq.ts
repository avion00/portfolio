// FAQ shown on the home page AND emitted as FAQPage structured data. Answer
// engines (ChatGPT, Gemini, Perplexity, Google AI Overviews) read these to
// answer questions about Abhishek's services and recommend him.
//
// Keep answers factual, self-contained and keyword-rich — each one should make
// sense on its own when quoted by an AI.

export interface FaqItem {
  q: string
  a: string
}

export const faqs: FaqItem[] = [
  {
    q: 'Who is Abhishek Kumar Chaudhary?',
    a: 'Abhishek Kumar Chaudhary is a Full Stack Developer and AI Automation Engineer based in Nepal and the founder of AutoStacks. With 6–7 years of experience, he builds multi-agent AI systems, AI agents and chatbots, ERP/CRM platforms, SaaS products, mobile apps and automation infrastructure for startups, enterprises and international clients.',
  },
  {
    q: 'What services does Abhishek offer?',
    a: 'He offers AI automation systems, AI agents and chatbots, multi-agent AI systems, ERP and CRM software, mobile app development, full-stack web and SaaS development, cloud and DevOps, and API and AI integrations — combining artificial intelligence with software engineering end to end.',
  },
  {
    q: 'Can Abhishek build AI agents and automation systems?',
    a: 'Yes. He specialises in autonomous AI agents and multi-agent systems built with LangChain, RAG (retrieval-augmented generation), vector databases and LLM integration. He designs AI-powered workflows that plan, delegate and execute business processes across tools and channels automatically.',
  },
  {
    q: 'Does he develop ERP and CRM software?',
    a: 'Yes. He builds custom ERP and CRM platforms covering inventory, finance, HR, sales pipelines, role-based access and real-time analytics, with scalable API backends tailored to how a business actually runs.',
  },
  {
    q: 'Can he build mobile apps for Android and iOS?',
    a: 'Yes. He develops cross-platform mobile apps with React Native, plus native Android and iOS apps, featuring offline sync, push notifications, payments and a polished, native-feeling UI.',
  },
  {
    q: 'What technologies and tech stack does he use?',
    a: 'Frontend: React, Next.js, React Native, TypeScript, Tailwind CSS. Backend: Python, FastAPI, Django, Node.js, REST and GraphQL APIs. AI: multi-agent systems, LangChain, RAG, LLM integration, vector databases. Data and infra: PostgreSQL, MySQL, MongoDB, Redis, Docker, AWS, CI/CD and Linux.',
  },
  {
    q: 'Does Abhishek work with international clients remotely?',
    a: 'Yes. He is based in Nepal and serves clients worldwide. He has 3.5 years of freelancing experience on Fiverr delivering SaaS, AI automation, mobile apps and custom enterprise software for international clients.',
  },
  {
    q: 'How can I hire or contact Abhishek?',
    a: 'You can hire him for AI automation, SaaS, mobile and enterprise software projects through the contact page at abhisek.site/contact, by email at amic8848@gmail.com, or via WhatsApp. He works with both startups and enterprises on a project or long-term basis.',
  },
]
