import Navbar from '../components/Navbar'
import HowItWorks from '../components/HowItWorks'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <HowItWorks />
        <Services />
        <WhyUs />
      </main>
    </div>
  )
}