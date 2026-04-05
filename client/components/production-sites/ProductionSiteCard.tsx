import { ProductionSite } from "@/types/ProductionSite"
import { strapiMediaSrc } from "@/lib/strapiMedia"
// import Image from 'next/image';
type Production = ProductionSite

export default function ProductionSites({image, title, subtitle, description}: ( Production )) {
    return (
        <div className="flex flex-col h-full gap-4 text-black max-w-sm p-6 justify-center ">
          {image?.url && (
            <img
              className="aspect-[12/6]"
              src={strapiMediaSrc(image.url)}
              alt={title}
            />
          )}
          <h2 className="text-2xl p-2 text-white font-bold bg-blue-600">{title}</h2>
          <p className="text-md font-bold line-clamp-4 overflow-hidden ">{subtitle}</p>
          <p className="text-sm flex justify-end flex-1/3 text-neutral-500">{description}</p>
      </div>
    )
}