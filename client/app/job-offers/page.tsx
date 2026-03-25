"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/job-offers/offerCard";
import { fetchStrapi } from "@/lib/strapi";

export default function Offers() {
  type Job = {
    id: number;
    title: string;
    description: string;
    location: string;
    type: string;
    experience: string;
  };
  const [jobs, setJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    fetchStrapi("/api/job-offers")
      .then((data) => {
        console.log("response: =", data);
        console.log("data: =", data?.data);
        setJobs(data?.data ?? []);
      });
  }, []);
  return (
    <div className="flex flex-col gap-12 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-6xl italic mt-24">Trouver votre futur emploi</h1>
      <div className="flex gap-8">
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
      {jobs.map((job) => (
        <OfferCard
          key={job.id}
          title={job.title}
          description={job.description}
          location={job.location}
          type={job.type}
          experience={job.experience}
        />
      ))}
     
    </div>
  );
}
