'use client';

import Link from 'next/link';
import WorldMap from '../components/WorldMap';

export default function Home() {
  return (
    <>
      <main>
        {/* ============ HERO ============ */}
        <section id="home" className="relative w-full h-screen overflow-hidden">
          <div className="absolute top-0 left-0 right-0 z-50" />
          <video
            autoPlay muted loop
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ transform: 'scale(1.35)' }}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ============ QUI SOMMES-NOUS ============ */}
        <section className="py-12 md:py-20 px-4 md:px-8" style={{ backgroundColor: '#EEF2F1' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">

              {/* Image */}
              <div>
                <img
                  src="/images/about-image.jpg"
                  alt="Groupe Lemoine - Usine"
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Texte */}
              <div>
                <h2 className="mb-6 uppercase leading-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '28px', color: '#111827' }}>
                  PLUS DE{' '}
                  <span style={{ backgroundColor: '#00579E', color: 'white', padding: '0 4px' }}>45 ANS</span>
                  {' '}DE SAVOIR-FAIRE<br />
                  <span style={{ backgroundColor: '#00579E', color: 'white', padding: '0 4px' }}>À LA FRANÇAISE !</span>
                </h2>
                <p className="mb-6 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontStyle: 'italic', fontWeight: 400, fontSize: '16px', color: '#374151' }}>
                  Fondé en 1978 par Philippe et Jeanne Lemoine, le Groupe Lemoine a développé un savoir-faire unique dans la fabrication de produits de soin et d&apos;hygiène à base de coton.
                </p>
                <p className="mb-6 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px', color: '#374151' }}>
                  En quelques années, la petite entreprise familiale est devenue
                </p>
                <div className="flex flex-col gap-3 items-center md:items-start font-display mb-6">
                  <h3 className="bg-[#CF102D] text-white px-5 py-3 font-bold text-center w-full md:w-80">
                    LEADER SUR SON MARCHÉ EN EUROPE
                  </h3>
                  <h3 className="bg-[#CF102D] text-white px-5 py-3 font-bold text-center w-full md:w-80">
                    N°2 DANS LE MONDE
                  </h3>
                </div>
                <p className="mb-8 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px', color: '#374151' }}>
                  Une expertise reconnue, qui repose non seulement sur sa capacité d&apos;innovation mais aussi sur son engagement fort en matière de développement durable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CHIFFRES CLÉS ============ */}
        <section style={{ backgroundColor: '#EEF2F1', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">

            {/* 30 milliards */}
            <div style={{ backgroundColor: 'rgba(0, 87, 158, 1)' }} className="text-white flex flex-col justify-center px-6 md:px-10 py-8 md:py-12 rounded-lg">
              <span className="text-3xl md:text-5xl font-bold mb-2">30 milliards</span>
              <span className="text-base md:text-lg">de bâtonnets ouatés produit par an</span>
            </div>

            {/* 10 gammes */}
            <div style={{ backgroundColor: 'rgba(217, 217, 217, 1)' }} className="flex flex-row justify-center items-center gap-4 md:gap-6 px-6 md:px-10 py-8 md:py-12 rounded-lg">
              <span className="text-5xl md:text-7xl font-bold text-gray-900">10</span>
              <span className="text-base md:text-lg text-gray-700">gammes de produits</span>
            </div>

            {/* 900 + Rejoignez nous */}
            <div style={{ backgroundColor: 'rgba(0, 87, 158, 1)' }} className="text-white flex flex-col justify-center items-center px-6 md:px-10 py-8 md:py-12 sm:col-span-2 lg:col-span-1 lg:row-span-2 gap-6 rounded-lg">
              <div className="flex flex-col items-center">
                <span className="text-6xl md:text-8xl font-bold">900</span>
                <span className="text-base md:text-lg mt-2 text-center">employés à temps plein</span>
              </div>
              <Link
                href="#"
                style={{ backgroundColor: 'rgba(238, 242, 241, 1)' }}
                className="text-gray-800 px-8 py-3 text-base font-medium hover:opacity-90 transition"
              >
                Rejoignez nous !
              </Link>
            </div>

            {/* 180 millions */}
            <div style={{ backgroundColor: 'rgba(217, 217, 217, 1)' }} className="text-gray-900 flex flex-col justify-center px-6 md:px-10 py-8 md:py-12 rounded-lg">
              <span className="text-3xl md:text-5xl font-bold mb-2 text-gray-900">180 millions</span>
              <span className="text-base md:text-lg text-gray-700">de sachets disques à démaquiller</span>
            </div>

            {/* > 20 000 */}
            <div style={{ backgroundColor: 'rgba(0, 87, 158, 1)' }} className="text-white flex flex-col justify-center items-center px-6 md:px-10 py-8 md:py-12 rounded-lg">
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }} className="text-4xl md:text-6xl">&gt; 20 000</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }} className="text-base md:text-lg mt-2 text-center">de tonnes de cottons achetés</span>
            </div>

          </div>
        </section>

        {/* ============ SECTION CARTE ============ */}
        <WorldMap />

      </main>
    </>
  );
}
