'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Blocks, Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#services', label: t('nav.services') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0B2447]/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Blocks className="h-8 w-8 text-[#A5D7E8]" />
            <span className="text-xl font-bold text-white">BlockService</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
            <LanguageToggle />
          </div>

          <div className="hidden lg:block">
            <Button 
              variant="outline" 
              className="border-[#A5D7E8] text-[#A5D7E8] hover:bg-[#A5D7E8] hover:text-[#0B2447]"
            >
              {t('nav.getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-[#19376D] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4"
            >
              <div className="flex flex-col space-y-4 bg-[#0B2447]/95 backdrop-blur-sm rounded-lg p-4">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-200 hover:text-[#A5D7E8] transition-colors duration-300 py-2 px-4 rounded-md hover:bg-[#19376D]/50"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center justify-between py-2 px-4">
                  <LanguageToggle />
                  <Button 
                    variant="outline" 
                    className="border-[#A5D7E8] text-[#A5D7E8] hover:bg-[#A5D7E8] hover:text-[#0B2447]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.getStarted')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="text-gray-200 hover:text-[#A5D7E8] transition-colors duration-300"
    >
      {children}
    </a>
  );
}