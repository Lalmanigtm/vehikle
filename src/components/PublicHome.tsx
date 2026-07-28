// "use client";
// import React, { useState } from "react";
// import HeroSection from "./HeroSection";
// import VehicleSlider from "./VehicleSlider";
// import AuthModal from "./AuthModal";

// const PublicHome = () => {
//   const [authOpen, setAuthOpen] = useState(false);
//   return (
//     <>
//       <HeroSection  onAuthRequired={() => setAuthOpen(true)} />
//       <VehicleSlider />
//       <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
//     </>
//   );
// };

// export default PublicHome;
"use client";

import { useState, useCallback } from "react";
import HeroSection from "./HeroSection";
import VehicleSlider from "./VehicleSlider";
import AuthModal from "./AuthModal";

const PublicHome = () => {
  const [authOpen, setAuthOpen] = useState(false);

  // WHY: useCallback stabilizes the function reference.
  // If HeroSection is wrapped in React.memo(), this prevents unnecessary
  // re-renders when PublicHome re-renders for unrelated reasons.
  const handleOpenAuth = useCallback(() => setAuthOpen(true), []);
  const handleCloseAuth = useCallback(() => setAuthOpen(false), []);

  return (
    <main className="relative">
      <HeroSection onAuthRequired={handleOpenAuth} />
      <VehicleSlider />
      <AuthModal open={authOpen} onClose={handleCloseAuth} />
    </main>
  );
};

export default PublicHome;
