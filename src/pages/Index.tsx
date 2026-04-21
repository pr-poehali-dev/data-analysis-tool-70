import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import PricingSection from '@/components/PricingSection'
import CommunitySection from '@/components/CommunitySection'

const Index = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#050a18] text-white overflow-x-hidden font-inter">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CommunitySection />
    </div>
  )
}

export default Index
