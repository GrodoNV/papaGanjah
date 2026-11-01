import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { About } from '@/components/sections/About'
import { Affiliate } from '@/components/sections/Affiliate'
import { BookSection } from '@/components/sections/BookSection'
import { Donations } from '@/components/sections/Donations'
import { Events } from '@/components/sections/Events'
import { Hero } from '@/components/sections/Hero'
import { Impact } from '@/components/sections/Impact'
import { Transparency } from '@/components/sections/Transparency'

export default function App() {
  return (
    <div className="min-h-dvh bg-paper">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-forest-800 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-cream focus:shadow-lg"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido">
        <Hero />
        <About />
        <Transparency />
        <Impact />
        <BookSection />
        <Events />
        <Affiliate />
        <Donations />
      </main>

      <Footer />
    </div>
  )
}
