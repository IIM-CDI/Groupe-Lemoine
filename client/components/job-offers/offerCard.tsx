export default function OfferCard({title, description, location, type, experience}: {title: string, description: string, location: string, type:string, experience:string}) {
    return (
        <div className="flex gap-6 border border-neutral-400 max-w-5xl p-6 justify-center bg-zinc-50 font-sans dark:bg-black hover:cursor-pointer hover:bg-neutral-900">
            <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-lg">{description}</p>
            </div>
            <div className="flex flex-col flex-1 items-end">
            <p className="text-lg">{location}</p>
            <p className="text-lg">{type}</p>
            <p className="text-lg">{experience}</p>
            </div>
        </div>
    )
}