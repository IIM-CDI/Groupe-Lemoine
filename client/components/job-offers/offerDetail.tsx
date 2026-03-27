import { timeAgo } from '@/utils/timeAgo';
import { Job } from '@/types/offer';

interface OfferDetailProps {
  job: Job;
}

export default function OfferDetail({ job }: OfferDetailProps) {
  return (
    <div className="p-6 bg-neutral-100 text-black flex flex-col gap-4 max-w-full">
      <h2 className="text-3xl font-bold">{job.title}</h2>
      <p className="text-lg text-black whitespace-pre-wrap">{job.description}</p>

      <div className="flex gap-4 text-black mt-4">
        <p><strong>Lieu :</strong> {job.location}</p>
        <p><strong>Type :</strong> {job.type}</p>
        <p><strong>Expérience :</strong> {job.experience}</p>
      </div>

      <p className="mt-2 text-gray-500">
        {timeAgo(job.createdAt)}
      </p>
    </div>
  );
}