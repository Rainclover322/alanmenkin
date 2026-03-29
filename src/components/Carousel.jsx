import { useRef, useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { CarouselItem } from './CarouselItem';
import { cn } from '../lib/utils';

export function Carousel({ items, onSelect, itemWidth = 300, gap = 32 }) {
    const containerRef = useRef(null);
    const { scrollX } = useScroll({ container: containerRef });

    const [activeItem, setActiveItem] = useState(items[0]);

    // Update active item based on scroll position - strict synced text
    useMotionValueEvent(scrollX, "change", (latest) => {
        // Determine which item is closest to center
        // Center of item i is at i * (itemWidth + gap)
        const index = Math.round(latest / (itemWidth + gap));
        const clampedIndex = Math.min(Math.max(index, 0), items.length - 1);

        if (items[clampedIndex] && items[clampedIndex].id !== activeItem.id) {
            setActiveItem(items[clampedIndex]);
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
            {/* Scroll Container */}
            <div
                ref={containerRef}
                className={cn(
                    "flex overflow-x-auto snap-x snap-mandatory w-full py-12 gap-8 no-scrollbar",
                    "px-[calc(50vw-150px)]" // Center alignment padding (300px/2 = 150px)
                )}
                style={{
                    scrollBehavior: 'smooth',
                    // Simple way to hide scrollbar in standard CSS if tailwind utility fails
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {items.map((item, index) => (
                    <CarouselItem
                        key={item.id}
                        item={item}
                        index={index}
                        scrollX={scrollX}
                        itemWidth={itemWidth}
                        gap={gap}
                        onClick={onSelect}
                    />
                ))}
            </div>

            {/* Synced Text */}
            <div className="mt-8 text-center space-y-2 max-w-lg px-4 h-24">
                <h2
                    key={activeItem.id + "-title"}
                    className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                    {activeItem.title}
                </h2>
                <p
                    key={activeItem.id + "-sub"}
                    className="text-neutral-400 text-lg animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75"
                >
                    {activeItem.subtitle}
                </p>
            </div>
        </div>
    );
}
