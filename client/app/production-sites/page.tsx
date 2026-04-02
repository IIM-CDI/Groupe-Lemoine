"use client";
import { useEffect, useState } from "react";
import ProductionSiteCard from "@/components/production-sites/ProductionSiteCard";
import { ProductionSite } from "@/types/ProductionSite"

export default function ProductionSites() {
    const [sites, setSites] = useState<ProductionSite[]>([]);

    useEffect(() => {
      fetch("/api/production-sites")
        .then(res => res.json())
        .then(data => {
          setSites(data.data ?? []);
        })
        .catch(err => console.error("Fetch /api/production-sites failed:", err));
    }, []);
    console.log(sites)

  return (
    <div className="flex flex-col p-12 gap-12 min-h-screen bg-cover bg-[url('/images/offers-bg.png')] items-center justify-center">
      <h1 className="text-4xl">Sites de production</h1>
        {sites.map((site) => (
            <ProductionSiteCard 
              key={site.id}
              id={site.id}
              image={site.image}
              title={site.title}
              subtitle={site.subtitle}
              description={site.description}
              
            />
          ))}
    </div>
  );
}