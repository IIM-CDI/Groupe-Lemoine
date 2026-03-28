'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-linear-to-b from-black to-transparent py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Left */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo-vertical-lemoine.png"
              alt="Lemoine"
              className="h-16 object-contain"
              width={20}
              height={20}
            />
          </Link>

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
            <Link href="#" className="text-white text-sm hover:text-gray-100">Carrières</Link>
            <Link href="#" className="text-white text-sm hover:text-gray-100">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white p-2 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden bg-black bg-opacity-90 px-4 py-4 space-y-2 rounded-b-lg">
            <Link href="#" className="block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold text-center">
              Groupe Lemoine
            </Link>
            <Link href="#" className="block text-white text-sm py-2 px-4 hover:bg-white hover:bg-opacity-10 rounded">Customer&apos;s partner</Link>
            <Link href="#" className="block text-white text-sm py-2 px-4 hover:bg-white hover:bg-opacity-10 rounded">Dispositifs Sanitaires</Link>
            <Link href="#" className="block text-white text-sm py-2 px-4 hover:bg-white hover:bg-opacity-10 rounded">Peaudouce</Link>
            <Link href="#" className="block text-white text-sm py-2 px-4 hover:bg-white hover:bg-opacity-10 rounded">Carrières</Link>
            <Link href="#" className="block text-white text-sm py-2 px-4 hover:bg-white hover:bg-opacity-10 rounded">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
}