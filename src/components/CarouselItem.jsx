import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../lib/utils';
import { useRef } from 'react';

export function CarouselItem({ item, index, scrollX, itemWidth, gap, onClick }) {
    const ref = useRef(null);
    const position = index * (itemWidth + gap);
    const range = [position - (itemWidth + gap), position, position + (itemWidth + gap)];

    const scale = useTransform(scrollX, range, [0.85, 1, 0.85]);
    const opacity = useTransform(scrollX, range, [0.5, 1, 0.5]);
    const zIndexRaw = useTransform(scrollX, range, [1, 10, 1]);
    const zIndex = useTransform(zIndexRaw, (v) => Math.round(v));

    // 3D Tilt properties
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [0, 1], [15, -15]);
    const rotateY = useTransform(springX, [0, 1], [-15, 15]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-neutral-800 shadow-xl origin-center",
                "snap-center relative"
            )}
            style={{
                width: itemWidth,
                height: itemWidth * 1.4,
                scale,
                opacity,
                zIndex,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            onClick={() => onClick(item)}
            layoutId={`card-${item.id}`}
        >
            <motion.div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 pointer-events-none w-full h-full border-2 border-white/5 rounded-2xl z-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover select-none"
                    style={{ filter: "brightness(0.9)" }}
                />
            </motion.div>

            {/* Dynamic Glare/Glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/20 to-white/0 mix-blend-overlay z-10"
                style={{
                    opacity: useTransform(springX, [0, 1], [0, 0.8]),
                    x: useTransform(springX, [0, 1], ['-50%', '50%']),
                }}
            />

            <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-6 h-1/2 z-20"
            >
                <span className="text-white font-semibold tracking-wide text-lg drop-shadow-md border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors">
                    View Details
                </span>
            </div>
        </motion.div>
    );
}
