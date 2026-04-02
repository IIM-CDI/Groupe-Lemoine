import { useRouter } from "next/navigation";
import { timeAgo } from '@/utils/timeAgo';
import { Job } from '@/types/offer';


interface OfferDetailProps {
  job: Job;
}

export default function OfferDetail({ job }: OfferDetailProps) {
  const router = useRouter();
  return (
    <div className=" flex-1 max-h-[75vh] flex flex-col gap-4 ">
      <div className="p-6 bg-neutral-100 text-black flex flex-col h-full gap-4 max-w-full overflow-y-scroll border rounded-md no-scrollbar">
        <h2 className="text-3xl font-bold">{job.title}</h2>
        <div className='flex justify-between'>
          <div className='flex gap-4 justify-center items-center'>
              <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{job.type}</span>
              <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{job.experience}</span>
              <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{job.travail}</span>
          </div>
          <p className="mt-2 text-gray-500">{timeAgo(job.createdAt)}</p>
        </div>
          <p><strong>Lieu :</strong> {job.location}</p>
          <p className="text-lg text-black whitespace-pre-wrap">{job.description}</p>
      </div>
      <button onClick={() => {
            router.push(`/form-candidate?jobTitle=${encodeURIComponent(job.title)}`);
            }} className='p-3 cursor-pointer text-white bg-blue-500 px-4 rounded-sm hover:bg-blue-600'>Postuler
      </button>
    </div>
  );
}