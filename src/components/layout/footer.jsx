import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Facebook,
  Linkedin,
  Mail,
  Send,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const iconVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};
export default function ContactFooter({
  name = "Jauie Cañon",
  tagline = "Let's build something worth remembering.",
  email = import.meta.env?.VITE_EMAIL || "",
  github = import.meta.env?.VITE_GITHUB_URL || "",
  facebook = import.meta.env?.VITE_FACEBOOK_URL || "",
  linkedin = import.meta.env?.VITE_LINKEDIN_URL || "",
  serviceId = import.meta.env?.VITE_EMAILJS_SERVICE_ID || "",
  templateId = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || "",
  onSend,
}) {
  console.log("githuv link: ", github);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSend) {
      onSend(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }
    if (!serviceId || !templateId || !publicKey) {
      // Not configured yet — fall back to mailto so the form still works.
      const subject = encodeURIComponent(
        `Portfolio inquiry from ${form.name || "a visitor"}`,
      );
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name} (${form.email})`,
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setForm({ name: "", email: "", message: "" });
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        { publicKey },
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };
  const socials = [
    { icon: Github, href: github, label: "GitHub" },
    { icon: Facebook, href: facebook, label: "Facebook" },
    { icon: Linkedin, href: linkedin, label: "LinkedIn" },
  ];

  const inputClass =
    "rounded-2xl border  border-gray-700 dark:border-gray-700 bg-emerald-950 dark:bg-gray-800 px-4 py-3 text-sm text-gray-100 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 outline-none shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),inset_-4px_-4px_8px_rgba(16,145,108,0.3)] dark:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.6),inset_-4px_-4px_8px_rgba(75,85,99,0.35)] transition-all duration-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 motion-reduce:transition-none";

  const iconBtnClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-emerald-950 text-gray-300 shadow-[6px_6px_14px_rgba(0,0,0,0.5),-6px_-6px_14px_rgba(16,145,108,0.15)] transition-all duration-300 hover:border-emerald-400 hover:text-emerald-400 hover:shadow-[3px_3px_8px_rgba(0,0,0,0.5),-3px_-3px_8px_rgba(16,145,108,0.35)] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(16,145,108,0.3)] motion-reduce:transition-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:shadow-[6px_6px_14px_rgba(0,0,0,0.65),-6px_-6px_14px_rgba(75,85,99,0.4)] dark:hover:border-emerald-400 dark:hover:text-emerald-400 dark:hover:shadow-[3px_3px_8px_rgba(0,0,0,0.65),-3px_-3px_8px_rgba(75,85,99,0.4)] dark:active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.65),inset_-3px_-3px_6px_rgba(75,85,99,0.35)]";
  return (
    <motion.footer
      className="w-full bg-emerald-900 px-6 py-16 dark:bg-gray-900 sm:px-10 lg:px-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
    >
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: intro + socials */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-medium tracking-widest text-slate-100 dark:text-emerald-400 uppercase">
                Get in touch
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-100 dark:text-stone-50">
                {name}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-100 dark:text-stone-400">
                {tagline}
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className={iconBtnClass}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* Right: contact form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={inputClass}
            />
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Say hello…"
            required
            rows={3}
            className={`resize-none ${inputClass}`}
          />
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ y: status === "sending" ? 0 : -2 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
            className="flex items-center justify-center gap-2 self-start rounded-2xl border border-gray-700 bg-emerald-950 px-6 py-3 text-sm font-medium text-slate-400 shadow-[6px_6px_14px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-400 hover:shadow-[3px_3px_8px_rgba(0,0,0,0.5),-3px_-3px_8px_rgba(16,145,108,0.35)] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(16,145,108,0.3)] disabled:opacity-70 motion-reduce:transition-none dark:border-gray-700 dark:bg-gray-800 dark:shadow-[6px_6px_14px_rgba(0,0,0,0.65),-6px_-6px_14px_rgba(75,85,99,0.4)] dark:hover:border-emerald-400 dark:hover:shadow-[3px_3px_8px_rgba(0,0,0,0.65),-3px_-3px_8px_rgba(75,85,99,0.4)] dark:active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.65),inset_-3px_-3px_6px_rgba(75,85,99,0.35)]"
          >
            {status === "sending" && (
              <Loader2
                size={16}
                className="animate-spin motion-reduce:animate-none"
              />
            )}
            {status === "sent" && <Check size={16} />}
            {status === "error" && <AlertCircle size={16} />}
            {status === "idle" && <Send size={16} />}
            {status === "sending" && "Sending…"}
            {status === "sent" && "Sent"}
            {status === "error" && "Try again"}
            {status === "idle" && "Send message"}
          </motion.button>
        </motion.form>
      </div>
    </motion.footer>
  );
}
