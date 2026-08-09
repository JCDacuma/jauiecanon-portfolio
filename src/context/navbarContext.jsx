import { createContext, useState, useContext, useEffect } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navbarContext = createContext();

export default function NavbarProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [touchedScrolled, setTouchedScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "works"];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > screen.availHeight / 1.2) {
        setTouchedScrolled(true);
      } else {
        setTouchedScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <navbarContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 py-1 z-50 backdrop-blur-md shadow-sm transition-colors duration-300 ${
          touchedScrolled
            ? "bg-emerald-900/90 text-stone-100"
            : "bg-emerald-800/5 text-stone-100"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex flex-col items-center">
              <img
                src="/logo/logo.svg"
                alt="Logo"
                className="w-12 h-12  object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 md:mr-20">
              {["Home", "About", "Skills", "Works"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-base font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-emerald-400 font-semibold"
                      : "text-stone-100 hover:text-emerald-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="absolute right-2 md:hidden rounded-lg hover:bg-emerald-700/50 p-2 text-stone-200 transition-colors"
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
                    <X size={23} color="#e7e5e4" />
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
                    <Menu size={23} color="#e7e5e4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
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
                {["Home", "About", "Skills", "Works"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${
                      activeSection === item.toLowerCase()
                        ? "bg-emerald-700/60 text-emerald-300 font-semibold"
                        : "text-stone-300 hover:bg-emerald-700/30 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      {children}
    </navbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(navbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
