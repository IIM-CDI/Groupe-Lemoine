import { timeAgo } from '@/utils/timeAgo';


export default function OfferCard({title, type, experience, travail, description, location, date, onClick}: {title: string, type: string, experience: string, travail: string, description: string, location: string, date: string, onClick: () => void}) {
    return (
        <div onClick={onClick} className="flex flex-col gap-12 text-black border rounded-md border-neutral-400 max-w-7xl p-6 justify-center bg-neutral-100 font-sans hover:cursor-pointer hover:bg-neutral-300">
        <div className="flex gap-4 flex-1 justify-between">
          <div className="flex flex-2/3 flex-col gap-6">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className='flex gap-4'>
                <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{type}</span>
                <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{experience}</span>
                <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{travail}</span>
            </div>
            <p className="text-md line-clamp-4 overflow-hidden ">{description}</p>
          </div>
      
          <p className="text-sm flex justify-end flex-1/3 text-neutral-500">{location}</p>
        </div>
        <div className="flex flex-col flex-1 items-end">
         
          <p className="text-sm text-neutral-500">{timeAgo(date)}</p>
        </div>
      </div>
    )
}