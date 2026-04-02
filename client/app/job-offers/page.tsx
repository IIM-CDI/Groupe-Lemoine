"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/job-offers/offerCard";
import OfferDetail from "@/components/job-offers/offerDetail";
import { normalizeString } from "@/utils/normalizeString";
import { Job } from "@/types/offer";

export default function Offers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [type, setType] = useState<string>("");
  const [travail, setTravail] = useState<string>("");
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
    const matchTravail = !travail || normalizeString(job.travail) === normalizeString(travail);
    const matchExp = !experience || job.experience === experience;
    return matchContrat && matchExp && matchTravail;
  });

  return (
    <div className="flex flex-col p-12 gap-12 min-h-screen py-40 bg-cover bg-[url('/images/offers-bg.png')] items-center justify-center">
     <h1 className="text-6xl text-black">
        A la recherche de votre <br />
        <span className="italic block text-right translate-x-30">
          futur emploi ?
        </span>
      </h1>
      <p className=" max-w-3xl w-full text-center">
        <strong>Le Groupe Lemoine</strong> recrute pour accompagner sa croissance et relever de nouveaux défis dans un environnement en constance évolution. Nous recherchons des <strong>talents engagés, curieux</strong> et prets à contribuer à des projets concrets et porteurs de sens. Rejoignez <strong>une équipe dynamique</strong> ou l&apos;initiative, la collaboration et l&apos;évolution professionnelle sont au couer de notre vision. 
      </p>

      <div className="flex gap-8 text-black">
        <select 
        onChange={(e) => setTravail(e.target.value)}
        className="border border-neutral-400 px-4 py-2"
        >
          <option value="">Type de travail</option>
          <option value="presentiel">Présentiel</option>
          <option value="teletravail">Télétravail</option>
          <option value="hybride">Hybride</option>
        </select>

        <select
          onChange={(e) => setType(e.target.value)}
          className="border border-neutral-400 px-4 py-2"
        >
          <option value="">Contrat</option>
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="stage">Stage</option>
          <option value="alternance">Alternance</option>
          <option value="freelance">Freelance</option>
          <option value="autre">Autre</option>
        </select>

        <select
          onChange={(e) => setExperience(e.target.value)}
          className="border border-neutral-400 px-4 py-2"
        >
          <option value="">Experience</option>
          <option value="De 0 à 2 ans">De 0 à 2 ans</option>
          <option value="De 3 à 5 ans">De 3 à 5 ans</option>
          <option value="De 6 à 10 ans">De 6 à 10 ans</option>
          <option value="Plus de 10 ans">Plus de 10 ans</option>
        </select>
      </div>

      <div className="flex gap-4 w-full max-w-6xl">
        <div className="flex flex-col gap-6 flex-1 max-h-[75vh] overflow-y-scroll no-scrollbar">
          {filteredJobs.map((job) => (
            <OfferCard
              key={job.id}
              title={job.title}
              type={job.type}
              experience={job.experience}
              description={job.description}
              travail={job.travail}
              location={job.location}
              date={job.createdAt}
              onClick={() => setSelectedJob(job)}
            />
          ))}
        </div>
        {selectedJob && <OfferDetail job={selectedJob} />}
      </div>
    </div>
  );
}