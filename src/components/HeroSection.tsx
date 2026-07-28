// "use client";

// import { motion } from "motion/react";
// import { Bike, Bus, Car, Truck } from "lucide-react";

// interface HeroSectionProps {
//   onBookClick: () => void;
// }

// const VEHICLE_ICONS = [
//   { Icon: Bike, label: "Bikes" },
//   { Icon: Bus, label: "Buses" },
//   { Icon: Truck, label: "Trucks" },
//   { Icon: Car, label: "Cars" },
// ] as const;

// const HeroSection = ({ onAuthRequired }: { onAuthRequired :()=>void}) => {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/heroImage.jpg')" }}
//       />
//       <div className="absolute inset-0 bg-black/80" />
//       <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-white font-extrabold text-4xl sm:text-5xl md:text-7xl"
//         >
//           Book any Vehicles
//         </motion.div>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl"
//         >
//           {" "}
//           from daily rides to heavy transport - all in one platform
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mt-8 flex gap-8 text-gray-300"
//         >
//           <Bike size={35} />
//           <Bus size={35} />
//           <Truck size={35} />
//           <Car size={35} />
//         </motion.div>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="mt-12 px-10 py-4 bg-white text-black rounded-full font-semibold shadow-xl flex gap-8 "
//           onClick={onAuthRequired}
//         >
//           Book Now
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
"use client";

import { motion } from "motion/react";
import { Bike, Bus, Car, Truck } from "lucide-react";
import Image from "next/image";

// WHY: Descriptive prop name. 'onAuthRequired' sounds like a boolean flag.
// 'onBookClick' tells you exactly when it fires.
interface HeroSectionProps {
  onBookClick: () => void;
}

// WHY: Static data outside component prevents re-creation on every render.
const VEHICLE_ICONS = [
  { Icon: Bike, label: "Bikes" },
  { Icon: Bus, label: "Buses" },
  { Icon: Truck, label: "Trucks" },
  { Icon: Car, label: "Cars" },
] as const;

const HeroSection = ({ onBookClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* WHY: Next.js Image optimizes format, size, and lazy-loading.
          priority=true because it's above the fold. fill=true covers the container.
          The wrapper div handles the absolute positioning. */}
      <div className="absolute inset-0">
        <Image
          src="/heroImage.jpg"
          alt="Fleet of vehicles including cars, buses, and trucks"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* WHY: backdrop-blur-sm adds a subtle frosted glass effect over the image,
          making text pop without killing the background entirely. */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-extrabold text-white sm:text-5xl md:text-7xl"
        >
          Book Any Vehicle
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl text-lg font-medium text-gray-200 sm:text-xl md:text-2xl"
        >
          From daily rides to heavy transport — all in one platform
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-8 text-gray-300"
          aria-label="Available vehicle categories"
        >
          {VEHICLE_ICONS.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon size={32} aria-hidden="true" />
              {/* WHY: Screen readers announce "Bikes, Buses, Trucks, Cars"
                  instead of silence. Also helps SEO understand the page topic. */}
              <span className="text-xs font-medium text-gray-400">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="mt-12 rounded-full bg-white px-10 py-4 text-sm font-semibold text-black shadow-2xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
          onClick={onBookClick}
        >
          Book Now
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
