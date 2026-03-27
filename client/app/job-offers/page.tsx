"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/job-offers/offerCard";
import OfferDetail from "@/components/job-offers/offerDetail";
import { fetchStrapi } from "@/lib/strapi";

export default function Offers() {
  type Job = {
    id: number;
    title: string;
    description: string;
    location: string;
    type: string;
    experience: string;
    createdAt: string;
  };
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  useEffect(() => {
    fetchStrapi("/api/job-offers")
      .then((data) => {
        console.log("response: =", data);
        console.log("data: =", data?.data);
        setJobs(data?.data ?? []);
        setSelectedJob(data?.data?.[0]);
      });
  }, []);
  return (
    <div className="flex flex-col p-12 gap-12 min-h-screen bg-cover bg-[url('/images/offers-bg.png')] items-center justify-center  font-san">
      <h1 className="text-6xl italic text-black">Trouver votre futur emploi</h1>
      <div className="flex gap-8 text-black">
        <select className="border border-neutral-400 ">
          <option>Location</option>
      </select>
      <select className="border border-neutral-400">
          <option>Type</option>
      </select>
      <select className="border border-neutral-400">
          <option>Experience</option>
      </select>
      </div>
      <div className="flex gap-4 w-full max-w-6xl">
        <div className="flex flex-col gap-6 flex-1 max-h-screen overflow-y-scroll">
        {jobs.map((job) => (
          <OfferCard
            key={job.id}
            title={job.title}
            description={job.description}
            location={job.location}
            date={job.createdAt}
            onClick={() => setSelectedJob(job)}
          />
        ))}
        </div>
        <div className="bg-neutral-100 flex-1 border border-neutral-400 overflow-y-scroll">
        {selectedJob && <OfferDetail job={selectedJob} />}
        </div>
      </div>


     
    </div>
  );
}
