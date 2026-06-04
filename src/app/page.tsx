import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PublicHome from "@/components/PublicHome";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <PublicHome />
      <Footer />
    </div>
  );
};

export default page;
