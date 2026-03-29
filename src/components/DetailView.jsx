import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function DetailView({ item, onClose }) {
    if (!item) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
            animate={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-4xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh] md:h-[600px]"
                layoutId={`card-${item.id}`}
                onClick={(e) => e.stopPropagation()} // Prevent close on click content
            >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                    <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:hidden" />
                </div>

                {/* Content Section */}
                <motion.div
                    className="p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2 bg-neutral-900"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <h2 className="text-4xl font-bold text-white mb-4">{item.title}</h2>
                    <h3 className="text-xl text-blue-400 font-medium mb-6">{item.subtitle}</h3>

                    <div className="space-y-4 text-neutral-300 overflow-y-auto pr-4 custom-scrollbar">
                        <p>
                            Experience the atmosphere of {item.title}. This immersive view allows you to dive deep into the details
                            of this stunning location. The composition highlights the unique interplay between light and form.
                        </p>
                        <p>
                            Scroll through the collection to discover more visual stories curated just for you.
                            Each image represents a distinct mood and narrative.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-8 self-start px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
                    >
                        Back to Gallery
                    </button>
                </motion.div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors z-10"
                >
                    <X size={24} />
                </button>

            </motion.div>
        </motion.div>
    );
}
