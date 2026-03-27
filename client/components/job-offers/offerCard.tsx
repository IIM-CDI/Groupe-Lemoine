function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diff < 60) return "à l'instant";
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} minutes`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} heures`;
    if (diff < 2592000) return `il y a ${Math.floor(diff / 86400)} jours`;
    if (diff < 31536000) return `il y a ${Math.floor(diff / 2592000)} mois`;
  
    return `il y a ${Math.floor(diff / 31536000)} ans`;
  }
  
  console.log(timeAgo("2026-03-25T14:30:00Z"));


export default function OfferCard({title, description, location, date, onClick}: {title: string, description: string, location: string, date: string, onClick: () => void}) {
    return (
        <div onClick={onClick} className="flex flex-col gap-12 text-black border border-neutral-400 max-w-7xl p-6 justify-center bg-neutral-100 font-sans hover:cursor-pointer hover:bg-neutral-200">
        <div className="flex gap-4 flex-1 justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-lg line-clamp-3 overflow-hidden">{description}</p>
          </div>
      
          <p className="text-md">{timeAgo(date)}</p>
        </div>
        <div className="flex flex-col flex-1 items-end">
          <p className="text-lg">{location}</p>
        </div>
      </div>
    )
}