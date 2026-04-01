'use client';
import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type Region = 'tous' | 'europe' | 'amerique' | 'asie';

const sites = [
  // France
  { name: 'Flers', coordinates: [-0.57, 48.75] as [number, number], region: 'europe' },
  { name: 'Caligny', coordinates: [-0.62, 48.72] as [number, number], region: 'europe' },
  { name: 'Argentan', coordinates: [0.02, 48.74] as [number, number], region: 'europe' },
  { name: 'Boulogne-Billancourt', coordinates: [2.24, 48.84] as [number, number], region: 'europe' },
  // Europe
  { name: 'Allemagne', coordinates: [10.45, 51.16] as [number, number], region: 'europe' },
  { name: 'Pays-Bas', coordinates: [5.29, 52.13] as [number, number], region: 'europe' },
  { name: 'Estonie', coordinates: [25.01, 58.60] as [number, number], region: 'europe' },
  { name: 'Espagne', coordinates: [-3.70, 40.42] as [number, number], region: 'europe' },
  // Amérique
  { name: 'Mexique', coordinates: [-102.55, 23.63] as [number, number], region: 'amerique' },
  // Asie
  { name: 'Philippines', coordinates: [121.77, 12.88] as [number, number], region: 'asie' },
];

const regionColors: Record<string, string> = {
  europe: '#00579E',
  amerique: '#4A90D9',
  asie: '#A8C8F0',
};

const filters: { label: string; value: Region }[] = [
  { label: 'Tous les sites', value: 'tous' },
  { label: 'Amérique', value: 'amerique' },
  { label: 'Europe', value: 'europe' },
  { label: 'Asie', value: 'asie' },
];

export default function WorldMap() {
  const [activeRegion, setActiveRegion] = useState<Region>('tous');

  const visibleSites = activeRegion === 'tous'
    ? sites
    : sites.filter((s) => s.region === activeRegion);

  return (
    <section className="px-6 font-display" style={{ backgroundColor: '#EEF2F1', marginTop: '80px', paddingTop: '60px', paddingBottom: '48px' }}>
      {/* Titre */}
      <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-8">
        Notre implantation géographique
      </h2>

      {/* Filtres */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveRegion(f.value)}
            style={
              activeRegion === f.value
                ? { backgroundColor: '#00579E', color: 'white', border: '1px solid #00579E' }
                : { backgroundColor: 'white', color: '#00579E', border: '1px solid #d1d5db' }
            }
            className="px-5 py-2 rounded-full text-sm font-medium transition hover:opacity-90"
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Carte */}
      <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden" style={{ backgroundColor: '#BEE3F8' }}>
        <ComposableMap
          projectionConfig={{ scale: 147 }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="white"
                  stroke="#999"
                  strokeWidth={0.4}
                />
              ))
            }
          </Geographies>

          {visibleSites.map((site) => (
            <Marker key={site.name} coordinates={site.coordinates}>
              <circle
                r={5}
                fill={regionColors[site.region]}
                stroke="white"
                strokeWidth={1.5}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Légende */}
      <div className="flex justify-center gap-8" style={{ marginTop: '32px', paddingBottom: '24px' }}>
        <span className="flex items-center gap-2 text-sm text-gray-700">
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#00579E', display: 'inline-block', flexShrink: 0 }} />
          Europe
        </span>
        <span className="flex items-center gap-2 text-sm text-gray-700">
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4A90D9', display: 'inline-block', flexShrink: 0 }} />
          Amérique
        </span>
        <span className="flex items-center gap-2 text-sm text-gray-700">
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#A8C8F0', display: 'inline-block', flexShrink: 0 }} />
          Asie
        </span>
      </div>
    </section>
  );
}
