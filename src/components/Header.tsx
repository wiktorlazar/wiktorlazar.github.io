import { useState, useEffect, useRef } from 'react';

const sections = ['Today', 'Projects', 'Writing'];

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);

  // Motyw
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Tło po scrollu
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy od góry
  useEffect(() => {
    const observedSections: HTMLElement[] = Array.from(document.querySelectorAll('[data-section]'));

    const handleScroll = () => {
      let closest: string | null = null;
      let minDistance = Infinity;

      observedSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance && rect.bottom > 0) { // uwzględniamy tylko widoczne sekcje
          minDistance = distance;
          closest = section.dataset.section || null;
        }
      });

      if (closest) setActiveSection(closest);
      else setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // inicjalne wywołanie
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Karuzela – centrowanie aktywnego
  useEffect(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const activeIndex = sections.findIndex((sec) => sec === activeSection);

    if (activeIndex === -1) return;

    const containerWidth = container.offsetWidth;
    const childWidth = children[activeIndex].offsetWidth;
    const offsetLeft = children[activeIndex].offsetLeft;
    const scrollTo = offsetLeft - containerWidth / 2 + childWidth / 2;

    container.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, [activeSection]);

  // Obsługa kliknięcia w sekcję
  const handleClickSection = (sec: string) => {
    const target = document.querySelector(`[data-section="${sec}"]`) as HTMLElement | null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const boxStyle = {
    backgroundColor: scrolled ? 'rgba(0,0,0,0.04)' : 'transparent',
    border: '0.1px solid rgba(0,0,0,0.1)',
    borderRadius: '50%',
    backdropFilter: scrolled ? 'blur(24px)' : 'none',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <header className="sticky top-[10px] z-50 flex justify-center">
      <div className="w-full h-[50px] flex items-center px-3 gap-3">
        {/* LEFT — LOGO */}
     <a
  href="https://github.com/wiktorlazar"
  target="_blank"
  rel="noopener noreferrer"
  className="relative flex items-center justify-center w-10 h-10 rounded-full group"
>
  {/* Gradientowa ramka */}
  <span
    className="absolute inset-0 rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    style={{
      background: 'conic-gradient(from 0deg, #ff00cc, #3333ff, #00ffcc, #ff00cc)',
      animation: 'spin 2s linear infinite',
    }}
  />

  {/* Logo */}
  <img
    src="https://github.com/wiktorlazar.png"
    alt="Profile"
    className="relative w-full h-full object-cover rounded-full border-[1px] border-transparent"
  />
</a>


{/* CENTER — NAVIGATION CAROUSEL */}
<div
  ref={carouselRef}
  className="mx-auto flex items-center gap-6 px-4 h-[40px] rounded-[12px] transition-all duration-200 whitespace-nowrap overflow-hidden"
  style={{
    backgroundColor: scrolled
      ? theme === 'dark'
        ? 'rgba(255,255,255,0.06)' // jaśniejsze w dark
        : 'rgba(0,0,0,0.04)'       // delikatne w light
      : 'transparent',
    backdropFilter: scrolled ? 'blur(24px)' : 'none',
    border: scrolled
      ? theme === 'dark'
        ? '0.1px solid rgba(255,255,255,0.1)'
        : '0.1px solid rgba(0,0,0,0.1)'
      : '0px',
  }}
>
  {sections.map((sec) => {
    const isActive = sec === activeSection;
    return (
      <span
        key={sec}
        onClick={() => handleClickSection(sec)}
        className="cursor-pointer p-1 font-satoshi font-medium inline-block transition-all duration-300"
        style={{
          color: theme === 'dark'
            ? `rgba(255,255,255,${isActive ? 1 : 0.3})`
            : `rgba(0,0,0,${isActive ? 0.64 : 0.3})`,
          transform: `scale(${isActive ? 1 : 0.85})`,
          minWidth: '70px',
          textAlign: 'center',
        }}
      >
        {sec}
      </span>
    );
  })}
</div>

       {/* RIGHT — THEME TOGGLE */}
<button
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  style={boxStyle}
  className="relative flex items-center justify-center"
>
  {/* Słońce */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute w-5 h-5 transition-all duration-500 ease-in-out transform ${
      theme === 'dark' ? 'opacity-1 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 18.364l-1.414-1.414M6.05 6.05L4.636 7.464M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  </svg>

  {/* Księżyc */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute w-5 h-5 transition-all duration-500 ease-in-out transform ${
      theme === 'dark' ? 'opacity-0 scale-75 rotate-90' : 'opacity-1 scale-100 rotate-0'
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3C16.4183 3 20 6.5817 20 11C20 15.4183 16.4183 19 12 19C7.5817 19 4 15.4183 4 11C4 6.5817 7.5817 3 12 3Z"
    />
  </svg>
</button>
      </div>
    </header>
  );
}