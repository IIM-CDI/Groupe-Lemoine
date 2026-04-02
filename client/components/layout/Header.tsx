'use client';
import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  { label: 'Home', href: '/', img: '/images/header-home.png' },
  { label: 'Notre expertise', href: '#', img: '/images/header-notreexpertise.png' },
  { label: 'Sites de production', href: '#', img: '/images/header-sites.png' },
  { label: 'Carrière', href: '/job-offers', img: '/images/header-carrière.png' },
  { label: 'RSE', href: '#', img: '/images/header-rse.png' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: '24px',
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '639px',
          backgroundColor: 'white',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: '6px',
          overflow: 'visible',
          pointerEvents: 'auto',
          position: 'relative',
        }}
      >
        {/* Barre principale */}
        <div className="flex justify-between items-center px-10" style={{ height: '81px' }}>

          {/* Logo + Titre gauche */}
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <img
              src="/images/logo-vertical-lemoine.png"
              alt="Lemoine"
              style={{ width: '68px', height: '68px', objectFit: 'contain' }}
            />
            <h1 style={{ fontSize: '32px', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#1f2937' }}>Home</h1>
          </Link>

<<<<<<< HEAD
          {/* Icônes droite */}
          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700">
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
=======
          {/* Nav Center - Desktop */}
          <nav className="hidden md:flex items-center bg-linear-to-r from-blue-600 to-blue-500 rounded-full px-8 py-3 gap-6">
            <Link 
              href="#" 
              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition"
            >
              Groupe Lemoine
            </Link>
            <Link href="#" className="text-white text-sm hover:text-gray-100">Customer&apos;s partner</Link>
            <Link href="#" className="text-white text-sm hover:text-gray-100">Dispositifs Sanitaires</Link>
            <Link href="#" className="text-white text-sm hover:text-gray-100">Peaudouce</Link>
            <Link href="/job-offers" className="text-white text-sm hover:text-gray-100">Carrières</Link>
            <Link href="#" className="text-white text-sm hover:text-gray-100">Contact</Link>
          </nav>
>>>>>>> 70b95ba37c47e4055d2cc0bafa29a687acce4496

            {/* Menu déroulant */}
            {isOpen && (
              <nav
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 28px)',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid rgba(0,0,0,0.2)',
                  borderRadius: '6px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                  zIndex: 10,
                }}
              >
                <div style={{ padding: '8px' }}>
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-6 px-10 py-3 hover:bg-gray-50 transition"
                    >
                      <img src={item.img} alt={item.label} style={{ width: '89px', height: '58px', objectFit: 'cover', flexShrink: 0, borderRadius: '4px' }} />
                      <span style={{ fontSize: '32px', fontFamily: 'Inter, sans-serif', fontWeight: 400, color: '#1f2937' }}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
