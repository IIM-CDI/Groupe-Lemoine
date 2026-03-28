'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    '/images/slider-1.jpg',
    '/images/slider-2.jpg',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <>
      <main>
        {/* ============ HERO SECTION AVEC VIDÉO ============ */}
        <section id="home" className="relative w-full h-screen overflow-hidden">
          {/* Header OVERLAY - Z-50 pour rester visible */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          {/* Vidéo de fond - Z-0 pour rester en arrière */}
          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5
          </video>

          {/* Overlay noir semi-transparent - Z-10 au-dessus de la vidéo */}
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

         

          {/* Scroll indicator - Z-20 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* ============ SECTION "QUI SOMMES-NOUS" ============ */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="animate-fade-in-left">
                <img
                  src="/images/about-image.jpg"
                  alt="Groupe Lemoine - Usine"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Right: Text */}
              <div className="animate-fade-in-right">
                <h2 className="font-display text-5xl font-bold text-blue-600 mb-6">
                  Plus de 45 ans de savoir-faire à la française
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Fondé en 1978 par Philippe et Jeanne Lemoine, le Groupe Lemoine a développé un savoir-faire unique dans la fabrication de produits soin et d'hygiène à base de coton.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  En quelques années, la petite entreprise familiale est devenue leader sur son marché en Europe, et dans le monde, avec plus de 300 clients à l'international et 10 usines sur les 5 continents.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Une excellence reconnue, qui repose non seulement sur sa capacité d'innovation mais aussi sur son engagement fort en matière de développement durable.
                </p>

                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION PRODUCTION (SLIDER) ============ */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Slider */}
              <div className="relative">
                {/* Image */}
                <div className="relative w-full h-80 overflow-hidden rounded-2xl bg-gray-200">
                  <img
                    src={sliderImages[currentSlide]}
                    alt={`Production ${currentSlide + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2 justify-center mt-4">
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Text */}
              <div>
                <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
                  Chaque année, dans les usines du groupe
                </h2>
                <div className="space-y-4 text-gray-700 text-lg">
                  <p className="flex items-start gap-4">
                    <span className="text-2xl"></span>
                    <span>
                      <strong>30 milliards</strong> de bâtonnets ouatés, soit <strong>57 078 bâtonnets par minute</strong>
                    </span>
                  </p>
                  <p className="flex items-start gap-4">
                    <span className="text-2xl"></span>
                    <span>
                      <strong>175 millions</strong> de sachets disques à démaquiller
                    </span>
                  </p>
                  <p className="flex items-start gap-4">
                    <span className="text-2xl"></span>
                    <span>
                      <strong>8 millions</strong> de sachets de coton hydrophile
                    </span>
                  </p>
                  <p className="flex items-start gap-4 pt-4 border-t border-gray-300">
                    <span className="text-2xl"></span>
                    <span className="font-bold text-blue-600">
                      Soit une production de <strong>10 produits par seconde</strong> !
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="bg-blue-600 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  Groupe Lemoine
                </h3>
                <p className="text-blue-100 text-sm">
                  Excellence dans l'industrie textile depuis 1978
                </p>
              </div>

              {/* Nous Contacter */}
              <div>
                <h4 className="font-display font-bold text-white mb-4">Nous Contacter</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Contacts</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Donnez-nous votre avis</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Offres d'emploi</Link></li>
                </ul>
              </div>

              {/* Entreprise */}
              <div>
                <h4 className="font-display font-bold text-white mb-4">Entreprise</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li><Link href="#" className="hover:text-white transition">À propos du Groupe</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Notre histoire</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Nos valeurs</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Gouvernance</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-blue-100 text-sm mb-4">
                  <Link href="mailto:compliance@groupe-lemoine.com" className="hover:text-white transition">
                    compliance@groupe-lemoine.com
                  </Link>
                </p>
                <p className="text-blue-100 text-sm">
                  +33 6 77 85 21 64
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-blue-500 pt-8 text-center text-blue-100 text-sm">
              <p>© 2025 Groupe Lemoine. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}