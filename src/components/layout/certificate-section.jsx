import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  X,
  ZoomIn,
} from "lucide-react";
/* ------------------------------------------------------------------ */
/*  Default data — swap with real certificates                        */
/* ------------------------------------------------------------------ */
const defaultCertificates = [
  {
    image: "/certificates/cert-1.png",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Mar 2025",
    description:
      "Foundational understanding of AWS Cloud concepts, core services, security, architecture, pricing, and support models.",
    credentialUrl: "#",
  },
  {
    image: "/certificates/cert-2.png",
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "Nov 2024",
    description:
      "Professional certificate covering React, responsive design, UX/UI principles, and version control for production front-ends.",
    credentialUrl: "#",
  },
  {
    image: "/certificates/cert-3.png",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Jun 2024",
    description:
      "Hands-on certification in HTML5, CSS3, Flexbox, and Grid to build accessible, fully responsive layouts from scratch.",
    credentialUrl: "#",
  },
  {
    image: "/certificates/cert-4.png",
    title: "Relational Database Design",
    issuer: "Baliwag Polytechnic College",
    date: "Feb 2024",
    description:
      "Coursework covering normalization, ER modeling, and query optimization for scalable relational database systems.",
    credentialUrl: "#",
  },
  {
    image: "/certificates/cert-5.png",
    title: "PHP & Laravel Fundamentals",
    issuer: "Udemy",
    date: "Oct 2023",
    description:
      "Backend development fundamentals: routing, Eloquent ORM, authentication, and RESTful API design using Laravel.",
    credentialUrl: "#",
  },
];
/* ------------------------------------------------------------------ */
/*  Neumorphic shadow tokens — same language as the rest of the site  */
/* ------------------------------------------------------------------ */
const RAISED =
  "shadow-[6px_6px_14px_rgba(168,162,158,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[6px_6px_16px_rgba(0,0,0,0.55),-6px_-6px_16px_rgba(255,255,255,0.025)]";
const RAISED_HOVER =
  "hover:shadow-[3px_3px_8px_rgba(168,162,158,0.35),-3px_-3px_8px_rgba(255,255,255,0.85)] " +
  "dark:hover:shadow-[3px_3px_10px_rgba(0,0,0,0.55),-3px_-3px_10px_rgba(255,255,255,0.025)]";
const RAISED_SM =
  "shadow-[4px_4px_10px_rgba(168,162,158,0.35),-4px_-4px_10px_rgba(255,255,255,0.8)] " +
  "dark:shadow-[4px_4px_12px_rgba(0,0,0,0.5),-4px_-4px_12px_rgba(255,255,255,0.02)]";
const RAISED_SM_HOVER =
  "hover:shadow-[2px_2px_5px_rgba(168,162,158,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] " +
  "dark:hover:shadow-[2px_2px_6px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.02)]";
const INSET =
  "shadow-[inset_3px_3px_7px_rgba(168,162,158,0.4),inset_-3px_-3px_7px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.55),inset_-3px_-3px_7px_rgba(255,255,255,0.025)]";
const INSET_SM =
  "shadow-[inset_2px_2px_5px_rgba(168,162,158,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.85)] " +
  "dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.55),inset_-2px_-2px_5px_rgba(255,255,255,0.025)]";
const INSET_XS =
  "shadow-[inset_1.5px_1.5px_4px_rgba(168,162,158,0.35),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.8)] " +
  "dark:shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.5),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.02)]";
/* ------------------------------------------------------------------ */
/*  Responsive "cards per page" — mirrors the Tailwind breakpoints    */
/*  used on the page grid below (sm:640 / lg:1024 / xl:1280), so the  */
/*  JS-tracked page count always matches what CSS actually renders.  */
/* ------------------------------------------------------------------ */
function getPerView() {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w >= 1280) return 4;
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
}
function usePerView() {
  const [perView, setPerView] = useState(getPerView);
  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return perView;
}
function chunk(list, size) {
  const pages = [];
  for (let i = 0; i < list.length; i += size) {
    pages.push(list.slice(i, i + size));
  }
  return pages;
}
/* ------------------------------------------------------------------ */
/*  Single certificate card                                           */
/* ------------------------------------------------------------------ */
function CertificateCard({ cert, index, total, onView }) {
  const { image, title, issuer, date, description, credentialUrl } = cert;
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      className={`
        group relative flex h-full flex-col overflow-hidden rounded-[26px]
        bg-stone-100 dark:bg-stone-800 p-2.5 sm:p-3
        transition-[box-shadow,background-color] duration-500
        ${RAISED} ${RAISED_HOVER}
      `}
    >
      {/* Certificate image — tap/click to view full size */}
      <button
        type="button"
        onClick={() => onView(cert)}
        aria-label={`View full certificate: ${title}`}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-200/60 dark:bg-stone-900/60 transition-colors duration-300 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${INSET}`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Zoom hint, appears on hover/focus */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-50/90 dark:bg-stone-800/90 text-stone-700 dark:text-stone-200 backdrop-blur-sm">
            <ZoomIn size={18} strokeWidth={2} />
          </span>
        </span>
        {/* Badge icon, floating on the image corner */}
        <span
          className={`absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 transition-colors duration-300 ${RAISED_SM}`}
        >
          <Award size={16} strokeWidth={2} />
        </span>
      </button>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight leading-snug transition-colors duration-300">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 transition-colors duration-300">
          <span>{issuer}</span>
          <span className="text-stone-300 dark:text-stone-600">•</span>
          <span className="text-stone-500 dark:text-stone-400">{date}</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed transition-colors duration-300">
          {description}
        </p>
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`
              mt-auto inline-flex w-fit items-center gap-1.5 self-start rounded-full
              bg-stone-100 dark:bg-stone-800 px-3.5 py-2 pt-3 text-xs font-semibold
              text-stone-600 dark:text-stone-300
              transition-[box-shadow,color] duration-300
              hover:text-emerald-700 dark:hover:text-emerald-400
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2
              focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-stone-800
            `}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 transition-[box-shadow] duration-300 ${INSET_XS}`}
            >
              <ExternalLink size={11} strokeWidth={2.25} />
            </span>
            View credential
          </a>
        )}
      </div>
    </div>
  );
}
function CertificateLightbox({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [cert, onClose]);
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/75 backdrop-blur-sm p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition-[box-shadow,color] duration-300 hover:text-emerald-700 dark:hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${RAISED_SM} ${RAISED_SM_HOVER}`}
            >
              <X size={16} strokeWidth={2.25} />
            </button>
            <div
              className={`rounded-[26px] bg-stone-100 dark:bg-stone-800 p-2.5 sm:p-3 transition-colors duration-500 ${RAISED}`}
            >
              <div
                className={`relative max-h-[75vh] w-full overflow-hidden rounded-2xl bg-stone-200/60 dark:bg-stone-900/60 transition-colors duration-300 ${INSET}`}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full max-h-[75vh] w-full object-contain"
                />
              </div>
              <div className="px-2 pt-4 pb-1 sm:px-3">
                <h3 className="text-base sm:text-lg font-semibold text-stone-900 dark:text-stone-50 tracking-tight transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 transition-colors duration-300">
                  {cert.issuer}{" "}
                  <span className="text-stone-400 dark:text-stone-600">•</span>{" "}
                  <span className="text-stone-500 dark:text-stone-400">
                    {cert.date}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default function CertificateSection({
  certificates = defaultCertificates,
}) {
  const trackRef = useRef(null);
  const pageRefs = useRef([]);
  const perView = usePerView();
  const pages = useMemo(
    () => chunk(certificates, perView),
    [certificates, perView],
  );
  const pageCount = pages.length;
  const [activePage, setActivePage] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(pageCount > 1);
  const [lightboxCert, setLightboxCert] = useState(null);
  const scrollToPage = useCallback((index) => {
    const track = trackRef.current;
    const page = pageRefs.current[index];
    if (!track || !page) return;
    track.scrollTo({
      left: page.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollTo({ left: 0, behavior: "auto" });
    setActivePage(0);
    setCanScrollPrev(false);
    setCanScrollNext(pageCount > 1);
  }, [perView, pageCount]);
  const goPrev = useCallback(() => {
    scrollToPage(Math.max(0, activePage - 1));
  }, [activePage, scrollToPage]);
  const goNext = useCallback(() => {
    scrollToPage(Math.min(pageCount - 1, activePage + 1));
  }, [activePage, pageCount, scrollToPage]);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = null;
    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trackLeft = track.scrollLeft;
        let nearest = 0;
        let smallestDiff = Infinity;
        pageRefs.current.forEach((page, i) => {
          if (!page) return;
          const diff = Math.abs(page.offsetLeft - track.offsetLeft - trackLeft);
          if (diff < smallestDiff) {
            smallestDiff = diff;
            nearest = i;
          }
        });
        setActivePage(nearest);
        setCanScrollPrev(trackLeft > 8);
        setCanScrollNext(trackLeft < track.scrollWidth - track.clientWidth - 8);
      });
    };
    handleScroll();
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pages]);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
    };
    track.setPointerCapture(e.pointerId);
    track.classList.add("cursor-grabbing");
  }, []);
  const onPointerMove = useCallback((e) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft =
      drag.current.startScroll - (e.clientX - drag.current.startX);
  }, []);
  const onPointerUp = useCallback((e) => {
    const track = trackRef.current;
    drag.current.active = false;
    if (track) {
      track.classList.remove("cursor-grabbing");
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {}
    }
  }, []);
  return (
    <section
      id="certification"
      className="relative flex flex-col items-center py-20 sm:py-24 overflow-hidden bg-stone-50 dark:bg-stone-800 transition-colors duration-500"
    >
      <style>{`
        .cert-track::-webkit-scrollbar { display: none; }
        .cert-track { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-400 transition-colors duration-300">
            Recognized & credentialed
          </span>
          <h2 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 transition-colors duration-300">
            Certifications
          </h2>
          <p className="mt-4 max-w-md text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed transition-colors duration-300">
            Courses and credentials that back up the skills I bring to every
            project. Tap any certificate to view it full size.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mt-14 sm:mt-16 w-full"
        >
          <div className="relative md:px-14 lg:px-16">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canScrollPrev}
              aria-label="Previous certificates"
              className={`
                hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                h-11 w-11 items-center justify-center rounded-full
                bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-300
                transition-[box-shadow,opacity,color] duration-300
                disabled:opacity-0 disabled:pointer-events-none
                hover:text-emerald-700 dark:hover:text-emerald-400
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600
                ${RAISED_SM} ${RAISED_SM_HOVER}
              `}
            >
              <ChevronLeft size={18} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canScrollNext}
              aria-label="Next certificates"
              className={`
                hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                h-11 w-11 items-center justify-center rounded-full
                bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-300
                transition-[box-shadow,opacity,color] duration-300
                disabled:opacity-0 disabled:pointer-events-none
                hover:text-emerald-700 dark:hover:text-emerald-400
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600
                ${RAISED_SM} ${RAISED_SM_HOVER}
              `}
            >
              <ChevronRight size={18} strokeWidth={2.25} />
            </button>

            {/*
              FIX 1 — cut-off top/bottom:
              overflow-x-auto on this track implicitly makes overflow-y
              "auto" too (per the CSS spec, you can't have overflow-x set
              and overflow-y stay "visible"), so the neumorphic drop-shadow
              on each card was being clipped top and bottom. Adding
              vertical padding (py-4 sm:py-5) gives the shadow room to
              breathe inside the scroll container instead of being sliced.
            */}
            <div
              ref={trackRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Certificates"
              tabIndex={0}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") goNext();
                if (e.key === "ArrowLeft") goPrev();
              }}
              className="cert-track flex overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab select-none focus-visible:outline-none rounded-3xl py-4 sm:py-5 -my-4 sm:-my-5"
            >
              {pages.map((pageCerts, pageIndex) => (
                <div
                  key={pageIndex}
                  ref={(el) => (pageRefs.current[pageIndex] = el)}
                  className="grid w-full shrink-0 snap-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 px-1"
                >
                  {pageCerts.map((cert, i) => {
                    const globalIndex = pageIndex * perView + i;
                    return (
                      <CertificateCard
                        key={cert.title}
                        cert={cert}
                        index={globalIndex}
                        total={certificates.length}
                        onView={setLightboxCert}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Dots — one per page, matching exactly what's on screen */}
          {pageCount > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToPage(index)}
                  aria-label={`Go to certificates page ${index + 1}`}
                  aria-current={activePage === index}
                  className={`
                    h-2 rounded-full transition-[width,box-shadow,background-color] duration-300
                    bg-stone-100 dark:bg-stone-800
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600
                    ${
                      activePage === index
                        ? `w-6 bg-emerald-600 dark:bg-emerald-500 ${RAISED_SM}`
                        : `w-2 ${INSET_XS}`
                    }
                  `}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <CertificateLightbox
        cert={lightboxCert}
        onClose={() => setLightboxCert(null)}
      />
    </section>
  );
}
