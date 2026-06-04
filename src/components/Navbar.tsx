"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar_Items = ["Home", "Bookings", "About us", "Content"];

const Navbar = () => {
  const pathName = usePathname();
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3 gap-3`}
    >
      <div className="max-w-7xl mx-auto px-4 mdLpx-8 flex items-center justify-between">
        <Image
          src={"/favicon.ico"}
          alt="logo"
          width={50}
          height={50}
          priority
        />
        <div className="hidden md:flex items-center gap-10">
          {Navbar_Items.map((i, index) => {
            if (i == "Home") {
              const href = `/`;
            } else {
              const href = `/${i.toLowerCase()}`;
            }

            const href = `/${i.toLocaleLowerCase()}`;
            const active = href == pathName;
            return (
              <Link
                key={index}
                href={href}
                className={`text-sm font-medium transition ${active ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {i}
              </Link>
            );
          })}
        </div>

        <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm ">
          Login
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
