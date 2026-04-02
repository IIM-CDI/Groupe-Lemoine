'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { ExpertiseData, Category, Product, Detail, Certification, Partenaire } from '@/types/products';
import { fetchStrapi } from '@/lib/strapi';

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;



export default function ExpertisePage() {
  const [data, setData] = useState<ExpertiseData | null>(null);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);

  useEffect(() => {
    fetchStrapi(
      '/api/products-page?populate[Category][populate][products][populate]=image&populate[Category][populate][Details]=*&populate[Certifications][populate]=Image&populate[Partenaires][populate]=image',
    ).then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-20 text-center">Loading...</div>;

  const currentCategory = data.Category[activeCategoryIdx];
  const products = currentCategory.products;
  const details = currentCategory.Details;

  const leftDetails = details.slice(0, 4);
  const rightDetails = details.slice(4);

  const handleCategoryChange = (idx: number) => {
    setActiveCategoryIdx(idx);
    setSelectedProductIdx(0);
  };

  return (
    <section className="bg-[#f0f0f0] py-16 px-4 md:px-20 font-sans text-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-4xl mb-6 font-bold">{data.title}</h1>
        <div className="flex justify-center gap-3 mb-6">
          {data.Category.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(idx)}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                activeCategoryIdx === idx
                  ? 'bg-white border-blue-400'
                  : 'bg-gray-400 border-gray-400'
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-center text-(--secondary)">
          {currentCategory.category}
        </h2>
        <p className="max-w-2xl mx-auto text-sm text-center text-gray-600">
          {currentCategory.product_description}
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-16 max-w-4xl mx-auto">
        {products.map((product, idx) => (
          <div
            key={product.id}
            onClick={() => setSelectedProductIdx(idx)}
            className="cursor-pointer group"
          >
            <div className="aspect-square relative flex items-center justify-center bg-(--primary-bg) rounded-t">
              {product.image?.[0]?.url ? (
                <img
                  src={`${STRAPI}${product.image[0].url}`}
                  alt={product.product_name}
                  className={`object-contain w-full h-full transition-transform duration-300  ${
                    selectedProductIdx === idx
                      ? 'scale-110'
                      : 'group-hover:scale-105'
                  }`}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded" />
              )}
            </div>
            <div
              className={`text-center py-2 px-1 text-xs font-bold uppercase rounded-b shadow-sm transition-colors ${
                selectedProductIdx === idx
                  ? 'bg-(--secondary) text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {product.product_name}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
        <div className="space-y-6 ">
          {leftDetails.map((detail) => (
            <div key={detail.id} className="text-left">
              <h3 className="font-bold text-lg mb-1 text-(--primary)">
                {detail.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                {detail.description}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Image
          className='w-full rounded'
            src="/images/cotton.png"
            alt="cotton"
            width={500}
            height={500}
          />
          <div className="grid grid-cols-2 gap-4">
            {rightDetails.map((detail) => (
              <div
                key={detail.id}
                className="bg-(--primary) p-4 rounded text-center text-white"
              >
                <p className="text-xs font-bold uppercase mb-1">
                  {detail.title}
                </p>
                <p className="text-sm text-white">{detail.description}</p>
              </div>
            ))}
          </div>

          <div className=" p-4 rounded border border-(--primary)">
            <p className="text-sm font-bold uppercase text-center mb-3 text-(--secondary) ">
              {data.certification}
            </p>
            <div className="flex justify-center gap-4">
              {data.Certifications.map((cert) => (
                <div key={cert.id} className="w-12 h-12 relative">
                  {cert.Image?.url && (
                    <img
                      src={`${STRAPI}${cert.Image.url}`}
                      alt={cert.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-10">
        <h2 className="text-2xl text-center mb-8 text-(--secondary) font-semibold">
          Nos entreprises partenaires
        </h2>
        <div className="overflow-hidden relative">
          <div className="flex gap-12 animate-carousel whitespace-nowrap">
            {[...data.Partenaires, ...data.Partenaires].map((partner, idx) => (
              <div key={idx} className="inline-flex items-center shrink-0">
                {partner.image?.[0]?.url && (
                  <img
                    src={`${STRAPI}${partner.image[0].url}`}
                    alt={partner.name}
                    className="h-12 w-auto object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
