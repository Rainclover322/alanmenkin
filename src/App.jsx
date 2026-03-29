import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Carousel } from './components/Carousel'
import { DetailView } from './components/DetailView'
import { HeroSection } from './components/HeroSection'
import './index.css'

// Sample Data with Unsplash Images
const ITEMS = [
  {
    id: 1,
    title: "Neon Cyberpunk",
    subtitle: "A futuristic glimpse into neon-lit streets.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Serene Nature",
    subtitle: "Peaceful mountain lake at sunrise.",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Abstract Geometry",
    subtitle: "Modern 3D shapes and glass textures.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Urban Architecture",
    subtitle: "Minimalist concrete structures.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Golden Hour",
    subtitle: "Warm sunlight filtering through trees.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
  }
];

function App() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-blue-500/30">

      <main className="relative z-0">
        <HeroSection />

        {/* Adds padding so the carousel acts as a secondary section */}
        <div className="py-24 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-white">More Experiences</h2>
            <p className="text-neutral-400 mt-2">Tilt and explore across multiple dimensions.</p>
          </div>
          <Carousel
            items={ITEMS}
            onSelect={setSelectedItem}
          />
        </div>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <DetailView
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            key="detail-view"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
