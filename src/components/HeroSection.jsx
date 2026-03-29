import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const HERO_DATA = [
    {
        id: "mar",
        month: "Mar",
        title: "Mountain Escapes",
        subtitle: "Swiss all the way",
        location: "Albulatal / Bergün",
        // Sample high-quality placeholders for testing video functionality
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
        id: "apr",
        month: "Apr",
        title: "The Alps Awaken",
        subtitle: "Spring in the mountains",
        location: "Matterhorn",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        id: "may",
        month: "May",
        title: "Lakes & Valleys",
        subtitle: "Benefit from it.",
        location: "Lake Lucerne",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
        id: "jun",
        month: "Jun",
        title: "Summer Trails",
        subtitle: "Explore the unknown",
        location: "Interlaken",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    }
];

export function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const activeData = HERO_DATA[activeIndex];

    // Handle video source change when active index changes
    useEffect(() => {
        if (videoRef.current) {
            // When source changes, video naturally pauses. We need to tell it to play if isPlaying is true.
            videoRef.current.load();
            if (isPlaying) {
                videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
            }
        }
    }, [activeIndex, isPlaying]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };

    return (
        <section className="relative h-screen w-full bg-black overflow-hidden select-none">
            {/* Background Video Layer */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                >
                    <source src={activeData.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Gradient dark overlays to ensure text remains legible */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Top Navigation & Location Header */}
            <div className="absolute top-0 inset-x-0 p-6 md:p-10 flex justify-between items-start z-20 text-white">
                <div className="flex gap-4 items-center">
                    {/* Logo/Menu Placeholder */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/20 transition">
                        <Grid className="w-5 h-5" />
                    </div>
                    {/* Mock Navigation */}
                    <nav className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
                        <span className="cursor-pointer hover:text-red-400 transition-colors">Flights</span>
                        <span className="cursor-pointer hover:text-red-400 transition-colors">Hotels</span>
                        <span className="cursor-pointer hover:text-red-400 transition-colors">Car rental</span>
                    </nav>
                </div>

                {/* Dynamic Location Title */}
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={activeData.location}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm md:text-lg font-semibold tracking-wider text-right uppercase drop-shadow-md"
                    >
                        {activeData.location}
                    </motion.h2>
                </AnimatePresence>
            </div>

            {/* Center Dynamic Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none">
                <div className="text-center px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeData.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        >
                            <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-4 drop-shadow-md">
                                {activeData.subtitle}
                            </p>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl">
                                {activeData.title}
                            </h1>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Controls & Month Selector Layer */}
            <div className="absolute bottom-0 inset-x-0 pb-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-end md:items-center z-20 gap-8">

                {/* Month Selector Carousel Area */}
                <div className="flex-1 w-full flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth mask-fade-edges">
                    {HERO_DATA.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "relative px-4 py-2 text-xl md:text-2xl font-semibold transition-all duration-300",
                                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                                )}
                            >
                                {item.month}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Media Controls */}
                <div className="flex gap-4 items-center pl-6 border-l border-white/20">
                    <button
                        onClick={handleMuteToggle}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={handlePlayPause}
                        className="p-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-all shadow-lg"
                    >
                        {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black pl-1" />}
                    </button>
                </div>
            </div>
        </section>
    );
}
