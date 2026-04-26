'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="logo">
          TRIPOOLY
        </Link>

        {/* Simplified Search */}
        <div className={`simple-search-container ${isSearchOpen ? 'open' : ''}`}>
          {isSearchOpen ? (
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search stays & packages..." 
                autoFocus
                value={searchParams.get('q') || ''}
                onChange={handleSearch}
                onBlur={() => !searchParams.get('q') && setIsSearchOpen(false)}
              />
              <button className="close-search" onClick={() => { 
                setIsSearchOpen(false); 
                const params = new URLSearchParams(searchParams.toString());
                params.delete('q');
                router.replace(`?${params.toString()}`);
              }}>
                <X size={16} />
              </button>
            </div>
          ) : (
            <button className="search-trigger" onClick={() => setIsSearchOpen(true)}>
              <span>Search stays & packages</span>
              <div className="search-icon-circle">
                <Search size={16} />
              </div>
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <div className="nav-links">
            <Link href="/packages">Packages</Link>
            <Link href="/stays">Stays</Link>
            <Link href="/connections">Connections</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
