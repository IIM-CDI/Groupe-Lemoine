"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/job-offers/offerCard";
import OfferDetail from "@/components/job-offers/offerDetail";
import { Job } from "@/types/offer";

export default function Offers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [type, setType] = useState<string>("");
  const [experience, setExperience] = useState<string>("");

  useEffect(() => {
    fetch("/api/job-offers")
      .then(res => res.json())
      .then(data => {
        setJobs(data.data ?? []);
        setSelectedJob(data.data?.[0] ?? null);
      })
      .catch(err => console.error("Fetch /api/job-offers failed:", err));
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchContrat = !type || job.type.toLowerCase() === type.toLowerCase();
    const matchExp = !experience || job.experience === experience;
    return matchContrat && matchExp;
  });

  return (
    <div className="flex flex-col p-12 gap-12 min-h-screen bg-cover bg-[url('/images/offers-bg.png')] items-center justify-center font-san">
      <h1 className="text-6xl italic text-black">Trouver votre futur emploi</h1>

      <div className="flex gap-8 text-black">
        <select className="border border-neutral-400">
          <option>Location</option>
        </select>

        <select
          onChange={(e) => setType(e.target.value)}
          className="border border-neutral-400"
        >
          <option value="">Type</option>
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="stage">Stage</option>
          <option value="alternance">Alternance</option>
          <option value="freelance">Freelance</option>
          <option value="autre">Autre</option>
        </select>

        <select
          onChange={(e) => setExperience(e.target.value)}
          className="border border-neutral-400"
        >
          <option value="">Experience</option>
          <option value="De 0 à 2 ans">De 0 à 2 ans</option>
          <option value="De 3 à 5 ans">De 3 à 5 ans</option>
          <option value="De 6 à 10 ans">De 6 à 10 ans</option>
          <option value="Plus de 10 ans">Plus de 10 ans</option>
        </select>
      </div>

      <div className="flex gap-4 w-full max-w-6xl">
        <div className="flex flex-col gap-6 flex-1 max-h-screen overflow-y-scroll">
          {filteredJobs.map((job) => (
            <OfferCard
              key={job.id}
              title={job.title}
              type={job.type}
              experience={job.experience}
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