import { timeAgo } from '@/utils/timeAgo';
import { Job } from '@/types/offer';

interface OfferDetailProps {
  job: Job;
}

export default function OfferDetail({ job }: OfferDetailProps) {
  return (
    <div className="p-6 bg-neutral-100 text-black flex flex-col gap-4 max-w-full">
      <h2 className="text-3xl font-bold">{job.title}</h2>
        <div className='flex gap-4'>
            <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{job.type}</span>
            <span className="text-md bg-neutral-200 w-max text-neutral-600 text-xs px-3 py-1 rounded-md">{job.experience}</span>
        </div>
        <p><strong>Lieu :</strong> {job.location}</p>
      <p className="text-lg text-black whitespace-pre-wrap">{job.description}</p>
      <p className="mt-2 text-gray-500">{timeAgo(job.createdAt)}</p>
    </div>
  );
}