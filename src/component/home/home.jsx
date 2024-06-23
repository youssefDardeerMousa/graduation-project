import React from 'react'
import HeroSection from './Body/HeroSection.jsx'
import PlantCare from './Body/PlantCare.jsx'
import PromoSection from './Body/PromoSection.jsx'
import BestSeller from './Body/BestSeller/BestSeller.jsx'
import FeaturedCollections from './Body/FeaturedCollections/FeaturedCollections.jsx'
import Support from './Body/Support/Support.jsx'

export default function Home() {
  return (
    <div>
        <HeroSection/>
        <PlantCare/>
        <PromoSection/>
        <BestSeller/>
        <FeaturedCollections/>
        <Support/>
    </div>
  )
}
