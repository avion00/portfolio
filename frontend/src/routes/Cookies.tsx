import { LegalPage } from '@/components/legal/LegalPage'
import { cookies } from '@/data/legal'

export default function Cookies() {
  return <LegalPage doc={cookies} />
}
