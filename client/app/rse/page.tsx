export default function RSE() {
  return (
    <main className="bg-[#EEF2F1] font-display">

      {/* espace pour le header flottant */}
      <div className="h-32" />

      {/* ===== TITRE ===== */}
      <section className="text-center px-6 pt-12 pb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '48px' }}>
          Notre engagement RSE
        </h1>
        <p className="text-sm text-gray-700 max-w-xl mx-auto leading-relaxed">
          Chez Groupe Lemoine, la responsabilité n&apos;est pas un engagement de façade. C&apos;est une conviction qui guide nos
          décisions au quotidien envers nos collaborateurs, nos territoires et notre planète.
        </p>
      </section>

      {/* ===== 3 COLONNES CERTIFICATIONS ===== */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-stretch">

          {/* Colonne 1 : Qualité & conformité */}
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-primary-500 rounded-lg px-6 py-3 text-center self-start w-full">
              <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Qualité &amp; conformité</h2>
            </div>
            <div className="bg-primary-500 rounded-lg flex flex-col items-center gap-16 px-6 py-8 pb-10 flex-1">
              <img src="/images/images-rse/BRC.png" alt="BRC Consumer Products Certified" className="w-28 object-contain" />
              <img src="/images/images-rse/Forestforallforever.png" alt="Forest for All Forever" className="w-28 object-contain" />
              <img src="/images/images-rse/smeta.png" alt="SMETA" className="w-28 object-contain" />
            </div>
          </div>

          {/* Colonne 2 : Environnement & textile responsable */}
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-white border border-gray-200 rounded-lg px-6 py-3 text-center self-start w-full">
              <h2 className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Environnement &amp; textile<br />responsable</h2>
            </div>
            <div className="bg-white rounded-lg flex flex-col items-center gap-8 px-6 py-8 pb-10 flex-1">
              <img src="/images/images-rse/organictetextile.png" alt="Global Organic Textile Standard" className="w-28 object-contain" />
              <img src="/images/images-rse/nordicecolabel.png" alt="Nordic Ecolabel" className="w-28 object-contain" />
              <img src="/images/images-rse/ifshpc.png" alt="IFS HPC" className="w-28 object-contain" />
              <img src="/images/images-rse/membredelacommunauteducoqvert.png" alt="Membre de la communauté du coq vert" className="w-28 object-contain" />
            </div>
          </div>

          {/* Colonne 3 : Responsabilité sociétale */}
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-primary-500 rounded-lg px-6 py-3 text-center self-start w-full">
              <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Responsabilité sociétale</h2>
            </div>
            <div className="bg-primary-500 rounded-lg flex flex-col items-center gap-6 px-6 py-8 pb-10 flex-1">
              <img src="/images/images-rse/commitedecovadis2024.png" alt="EcoVadis Committed 2024" className="w-32 object-contain" />
              <img src="/images/images-rse/commitedecovadisfeb2025.png" alt="EcoVadis Committed Feb 2025" className="w-32 object-contain" />
              <img src="/images/images-rse/ecovadisbronze.png" alt="EcoVadis Bronze Top 35% 2024" className="w-32 object-contain" />
              <img src="/images/images-rse/ecovadisgold.png" alt="EcoVadis Gold Top 5% May 2025" className="w-32 object-contain" />
            </div>
          </div>

        </div>
      </section>

      {/* ===== GROUPE LEMOINE & FILIALES ===== */}
      <section className="bg-[#EEF2F1] px-6 py-16 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="bg-white rounded-lg px-8 py-4 self-start">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Groupe Lemoine &amp; filiales
            </h2>
          </div>
          <div className="bg-white rounded-lg px-16 py-16 flex flex-wrap justify-center items-center gap-14">
            <img src="/images/images-rse/logolemoinebleurouge.png" alt="Lemoine" className="h-24 object-contain" />
            <img src="/images/images-rse/logolemoinebleufrance.png" alt="Lemoine France" className="h-24 object-contain" />
            <img src="/images/images-rse/logolemoineorange.png" alt="Lemoine Poland" className="h-24 object-contain" />
            <img src="/images/images-rse/logolemoinegermany.png" alt="Lemoine Germany" className="h-24 object-contain" />
            <img src="/images/images-rse/logolemoinerouge.png" alt="Lemoine Spain" className="h-24 object-contain" />
            <img src="/images/images-rse/logolemoineestonia.png" alt="Lemoine Estonia" className="h-24 object-contain" />
            <img src="/images/images-rse/logolemoinevert.png" alt="Lemoine" className="h-24 object-contain" />
            <img src="/images/images-rse/albasa.png" alt="Albasa - Algodon de Brasil S.A." className="h-24 object-contain" />
          </div>
        </div>
      </section>


    </main>
  );
}
