// "use client";
// import React, { useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { CircleDashed, Lock, Mail, User, X } from "lucide-react";
// import Image from "next/image";
// import axios from "axios";

// type propType = {
//   open: boolean;
//   onClose: () => void;
// };

// type stepType = "login" | "signup" | "otp";

// const AuthModal = ({ open, onClose }: propType) => {
//   const [step, setStep] = useState<stepType>("login");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [Loading, setLoading] = useState(false);

// const handleSignUp = async () => {
//   setLoading(true);
//   try {
//     const  {data} = await axios.post("/api/auth/register",{
//       name,
//       email,
//       password
//     });
//     console.log(data);
//   } catch (error) {
//     console.error("Error signing up:", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-90 bg-black/80 backdrop-blur-md"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 40 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.35, ease: "easeOut" }}
//               exit={{ opacity: 0, scale: 0.95, y: 40 }}
//               className="fixed inset-0 z-100 flex items-center justify-center px-4"
//             >
//               <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
//                 <div
//                   className="absolute right-4 top-4 text-gray-600 hover:text-blue-700 transition"
//                   onClick={onClose}
//                 >
//                   <X size={20} />
//                 </div>

//                 <div className="mb-6 text-center">
//                   <h1 className="text-3xl font-extrabold tracking-widest">
//                     Gaddi
//                   </h1>
//                   <p className="mt-1  text-xs text-gray-500">
//                     Premium Gaddi Bookings...
//                   </p>
//                 </div>

//                 <button className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition">
//                   <Image
//                     src={"/google.png"}
//                     alt="google"
//                     width={30}
//                     height={30}
//                   />
//                   Continue with Google
//                 </button>

//                 <div className="flex items-center gap-4 my-6">
//                   <div className="flex-1 h-px bg-black/10" />
//                   <div className="text-xs text-gray-500">OR</div>
//                   <div className="flex-1 h-px bg-black/10" />
//                 </div>
//                 <div>
//                   {step == "login" && (
//                     <motion.div
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                     >
//                       <h1 className="text-xl font-semibold">Welcome back</h1>
//                       <div className="mt-5 space-y-4">
//                         <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 ">
//                           <Mail size={18} className="text-gray-500" />
//                           <input
//                             type="email"
//                             placeholder="Email"
//                             className="w-full bg-transparent outline-none text-sm"
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                           />
//                         </div>

//                         <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 ">
//                           <Lock size={18} className="text-gray-500" />
//                           <input
//                             type="password"
//                             placeholder="Password"
//                             className="w-full bg-transparent outline-none text-sm"
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                           />
//                         </div>

//                         <button className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition">
//                           Login
//                         </button>
//                       </div>

//                       {/* <p className="mt-6 text-center text-sm text-gray-500">
//                         Donot have an account ?{" "}
//                         <div
//                           className="text-black font-medium hover:underline"
//                           onClick={() => setStep("signup")}
//                         >
//                           sign Up
//                         </div>
//                       </p> */}
//                       <div className="mt-6 text-center text-sm text-gray-500">
//                         Don&apos;t have an account?{" "}
//                         <button
//                           type="button"
//                           className="text-black font-medium hover:underline inline bg-transparent border-none cursor-pointer"
//                           onClick={() => setStep("signup")}
//                         >
//                           Sign Up
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}

//                   {step == "signup" && (
//                     <motion.div
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                     >
//                       <h1 className="text-xl font-semibold">
//                         Create a Account
//                       </h1>
//                       <div className="mt-5 space-y-4">
//                         <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 ">
//                           <User size={18} className="text-gray-500" />
//                           <input
//                             type="text"
//                             placeholder="Full Name"
//                             className="w-full bg-transparent outline-none text-sm"
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                           />
//                         </div>

//                         <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 ">
//                           <Mail size={18} className="text-gray-500" />
//                           <input
//                             type="email"
//                             placeholder="Email"
//                             className="w-full bg-transparent outline-none text-sm"
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                           />
//                         </div>

//                         <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 ">
//                           <Lock size={18} className="text-gray-500" />
//                           <input
//                             type="password"
//                             placeholder="Password"
//                             className="w-full bg-transparent outline-none text-sm"
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                           />
//                         </div>

//                         <button
//                           className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
//                           disabled={Loading}
//                           onClick={handleSignUp}
//                         >
//                           {!Loading ? (
//                             "Signing Up..."
//                           ) : (
//                             <CircleDashed size={20} className="animate-spin" />
//                           )}
//                         </button>
//                       </div>

//                       {/* <p className="mt-6 text-center text-sm text-gray-500">
//                         Already have an account ?{" "}
//                         <div
//                           className="text-black font-medium hover:underline"
//                           onClick={() => setStep("login")}
//                         >
//                           Login
//                         </div>
//                       </p> */}
//                       <div className="mt-6 text-center text-sm text-gray-500">
//                         Already have an account?{" "}
//                         <button
//                           type="button"
//                           className="text-black font-medium hover:underline inline bg-transparent border-none cursor-pointer"
//                           onClick={() => setStep("login")}
//                         >
//                           Login
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AuthModal;
"use client";

import { useState, FormEvent } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type AuthStep = "login" | "signup";

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [step, setStep] = useState<AuthStep>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null; // If modal is closed, render nothing

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      console.log(data);
      setStep("login");
      setForm({ name: "", email: "", password: "" });
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md mx-4 rounded-3xl bg-white p-6 sm:p-8 text-black shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-widest">Gaddi</h1>
          <p className="mt-1 text-xs text-gray-500">Premium Gaddi Bookings</p>
        </div>

        {/* Google Button */}
        <button className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition">
          <Image src="/google.png" alt="Google" width={20} height={20} />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {step === "login" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Login:", form);
            }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Welcome back</h2>

            <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black/50">
              <Mail size={18} className="text-gray-500 shrink-0" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full bg-transparent outline-none text-sm"
                onChange={handleChange}
                value={form.email}
              />
            </div>

            <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black/50">
              <Lock size={18} className="text-gray-500 shrink-0" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full bg-transparent outline-none text-sm"
                onChange={handleChange}
                value={form.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
            >
              Login
            </button>

            <div className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setStep("signup")}
                className="text-black font-medium hover:underline bg-transparent border-none cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}

        {/* SIGNUP FORM */}
        {step === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <h2 className="text-xl font-semibold">Create an Account</h2>

            <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black/50">
              <User size={18} className="text-gray-500 shrink-0" />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-transparent outline-none text-sm"
                onChange={handleChange}
                value={form.name}
              />
            </div>

            <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black/50">
              <Mail size={18} className="text-gray-500 shrink-0" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full bg-transparent outline-none text-sm"
                onChange={handleChange}
                value={form.email}
              />
            </div>

            <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3 focus-within:border-black/50">
              <Lock size={18} className="text-gray-500 shrink-0" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full bg-transparent outline-none text-sm"
                onChange={handleChange}
                value={form.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Sign Up
            </button>

            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setStep("login")}
                className="text-black font-medium hover:underline bg-transparent border-none cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
