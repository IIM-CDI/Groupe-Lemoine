import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#EEF2F1' }} className="font-display">

      {/* Contenu principal */}
      <div className="py-10 flex flex-col md:flex-row items-center md:items-start gap-8 px-6 md:px-20">

        {/* Rectangle gris "Rejoignez nous" avec fleur */}
        <div className="relative shrink-0 w-full md:w-[630px]" style={{ height: '160px' }}>
          <div
            style={{ backgroundColor: 'rgba(217, 217, 217, 1)' }}
            className="w-full h-full rounded-lg flex items-center px-8"
          >
            <span className="italic text-gray-800" style={{ fontSize: '24px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Rejoignez nous !</span>
          </div>
          <img
            src="/images/fleure-footer.png"
            alt="Fleur"
            className="absolute hidden sm:block"
            style={{ right: '16px', bottom: '0px', height: '180px', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Infos Groupe Lemoine */}
        <div className="shrink-0">
          <h3 className="mb-3 text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: '24px' }}>Groupe Lemoine</h3>
          <p className="mb-1 text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px' }}>
            42 Rue de Bellevue, 92100 Boulogne-Billancourt
          </p>
          <p className="mb-1 text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px' }}>+33 1 46 94 60 80</p>
          <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px' }}>contact@groupe-lemoine.com</p>
        </div>

        {/* Liens */}
        <ul className="space-y-2 md:ml-auto">
          {['Nos produits', 'Peaudouce', 'Nous rejoindre', 'Nos marques partenaire', 'RSE'].map((item) => (
            <li key={item} className="flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px', color: '#1f2937', listStyle: 'none' }}>
              <span>·</span>
              <Link href="#" className="hover:underline">{item}</Link>
            </li>
          ))}
        </ul>
      </div>

     
    </footer>
  );
}
