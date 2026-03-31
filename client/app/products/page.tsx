'use client';
import { useState, useEffect } from 'react';
import { fetchStrapi } from '@/lib/strapi';
import Image from 'next/image';

export type Product = {
  id: number;
  product_name: string;
  product_description: string;
  image: { url: string }[];
};

export type ExpertiseData = {
  title: string;
  description: string;
  douceur: string;
  douceur_description: string;
  epaisseur: string;
  epaisseur_description: string;
  certification: string;
  Category: {
    id: number;
    category: string;
    product_description: string;
    products: Product[];
  }[];
};

export default function ExpertisePage() {
  const [data, setData] = useState<ExpertiseData | null>(null);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);

  useEffect(() => {
    fetchStrapi(
      '/api/products-page?populate[Category][populate][products][populate]=image'
    ).then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-20 text-center">Loading...</div>;

  const currentCategory = data.Category[activeCategoryIdx];
  const products = currentCategory.products;
  const activeProduct = products[selectedProductIdx];

  const handleCategoryChange = (idx: number) => {
    setActiveCategoryIdx(idx);
    setSelectedProductIdx(0);
  };

  return (
    <section className="bg-[#f0f0f0] py-16 px-4 md:px-20 font-sans text-gray-800">

      <div className="text-center mb-8">
        <h1 className="text-4xl mb-6">{data.title}</h1>

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

        <p className="max-w-2xl mx-auto text-sm text-gray-600">
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
            <div className="aspect-square relative flex items-center justify-center">
              {product.image?.[0]?.url ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product.image[0].url}`}
                  alt={product.product_name}
                  className={`object-contain transition-transform duration-300 ${
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
              className={`text-center py-2 px-1 text-xs font-bold uppercase rounded shadow-sm transition-colors ${
                selectedProductIdx === idx
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {product.product_name}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">
              {activeProduct.product_name}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {activeProduct.product_description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 p-4 rounded text-center">
              <span className="block font-bold text-sm uppercase mb-1">
                {data.douceur}
              </span>
              <p className="text-xs text-gray-500">{data.douceur_description}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded text-center">
              <span className="block font-bold text-sm uppercase mb-1">
                {data.epaisseur}
              </span>
              <p className="text-xs text-gray-500">{data.epaisseur_description}</p>
            </div>
          </div>

          <div className="bg-gray-200 p-4 rounded flex items-center justify-between">
            <span className="text-sm font-bold uppercase">
              {data.certification}
            </span>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[8px] font-bold">FSC</div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[8px] font-bold">GOTS</div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[8px] font-bold">BIO</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}