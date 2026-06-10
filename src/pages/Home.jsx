import Hero         from '../components/Hero'
import About        from '../components/About'
import Testimonials from '../components/Testimonials'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}