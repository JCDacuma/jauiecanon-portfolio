import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const NavbarContext = createContext(null);
const SECTIONS = ["home", "about", "skills", "works"];
const NAV_ITEMS = ["Home", "About", "Skills", "Works"];

export default function NavbarProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollPos = window.scrollY + 100;
        setIsScrolled(window.scrollY > 80);

        for (const id of SECTIONS) {
          const el = document.getElementById(id);
          if (
            el &&
            scrollPos >= el.offsetTop &&
            scrollPos < el.offsetTop + el.offsetHeight
          ) {
            setActiveSection(id);
            break;
          }
        }
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }, []);

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <NavbarContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, isDarkMode, toggleTheme }}
    >
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 py-1 z-50 backdrop-blur-md shadow-sm transition-colors duration-300 ${
          isScrolled
            ? "bg-emerald-900/90 dark:bg-emerald-950/90"
            : "bg-emerald-800/5 dark:bg-emerald-900/10"
        } text-stone-900 dark:text-stone-100`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <img
              src="/logo/logo.svg"
              alt="Logo"
              className="w-12 h-12 object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
            />

            <div className="hidden md:flex items-center space-x-8 md:mr-20">
              {NAV_ITEMS.map((item) => {
                const id = item.toLowerCase();
                const active = activeSection === id;
                return (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`text-base font-medium transition-colors ${
                      active
                        ? "text-emerald-400 dark:text-emerald-400 font-semibold"
                        : "text-slate-300 dark:text-slate-100 hover:text-white dark:hover:text-emerald-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                );
              })}

              <button
                type="button"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                onClick={toggleTheme}
                className="rounded-full p-2 text-white hover:bg-emerald-700/20 dark:hover:bg-emerald-700/50 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDarkMode ? "sun" : "moon"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden absolute right-2">
              <button
                type="button"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                onClick={toggleTheme}
                className="rounded-lg p-2 hover:bg-emerald-700/30 dark:hover:bg-emerald-700/50 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                type="button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
                className="rounded-lg hover:bg-emerald-700/30 dark:hover:bg-emerald-700/50 p-2 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <X size={23} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <Menu size={23} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden pb-4 overflow-hidden"
              >
                {NAV_ITEMS.map((item) => {
                  const id = item.toLowerCase();
                  const active = activeSection === id;
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(id)}
                      className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${
                        active
                          ? "bg-emerald-700/40 dark:bg-emerald-700/60 text-emerald-600 dark:text-emerald-300 font-semibold"
                          : "text-stone-700 dark:text-stone-300 hover:bg-emerald-700/20 dark:hover:bg-emerald-700/30 hover:text-emerald-800 dark:hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context)
    throw new Error("useNavbar must be used within a NavbarProvider");
  return context;
}
