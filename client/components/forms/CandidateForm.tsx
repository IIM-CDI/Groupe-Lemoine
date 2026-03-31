'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import PhoneInput from 'react-phone-number-input/input';


type CandidateFormContent = {
  title: string;
  description: string;
  nom_label: string;
  nom_placeholder: string;
  prenom_label: string;
  prenom_placeholder: string;
  email_label: string;
  email_placeholder: string;
  telephone_label: string;
  telephone_placeholder: string;
  message_label: string;
  message_placeholder: string;
  cv_label: string;
  motivation_label: string;
  button_label: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CandidateForm() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("jobTitle");
  const [content, setContent] = useState<CandidateFormContent | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    cv: null as File | null,
    motivation: null as File | null,
    message: '',
  });

  const [phoneValue, setPhoneValue] = useState<string | undefined>('');

  // Simule fetch Strapi / contenu dynamique
  useEffect(() => {
    // Exemple statique si pas de Strapi
    setContent({
      title: 'Formulaire de candidature',
      description: 'Merci de remplir ce formulaire',
      nom_label: 'Nom',
      nom_placeholder: 'Votre nom',
      prenom_label: 'Prénom',
      prenom_placeholder: 'Votre prénom',
      email_label: 'Email',
      email_placeholder: 'Votre email',
      telephone_label: 'Téléphone',
      telephone_placeholder: 'Votre téléphone',
      message_label: 'Message',
      message_placeholder: 'Votre message',
      cv_label: 'CV',
      motivation_label: 'Lettre de motivation',
      button_label: 'Envoyer',
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const formData = new FormData();
    formData.append('nom', form.nom);
    formData.append('prenom', form.prenom);
    formData.append('email', form.email);
    formData.append('telephone', phoneValue ?? '');
    formData.append('message', form.message);

    if (jobTitle) {
      formData.append("jobTitle", jobTitle);
    }

    if (form.cv) formData.append('cv', form.cv);
    if (form.motivation) formData.append('motivation', form.motivation);

    setStatus('loading');

    try {
      const res = await fetch('/api/candidate', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const message =
          data && typeof data.error === 'string'
            ? data.error
            : 'Erreur, essayez plus tard';
        throw new Error(message);
      }

      setStatus('success');
      setForm({ nom: '', prenom: '', email: '', telephone: '', cv: null, motivation: null, message: '' });
      setPhoneValue('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Erreur, essayez plus tard',
      );
    }
  };

  if (!content) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-3xl bg-red-50">
      {jobTitle && (
  <h1 className="text-blue-600 font-semibold mb-4 text-3xl">
    {jobTitle}
  </h1>
)}
      <h2 className="text-2xl font-bold mb-2 text-black">{content.title}</h2>
      <p className="text-gray-400 text-lg mb-6">{content.description}</p>

      {status === 'success' && <p className="text-green-600 font-medium mb-4">Message envoyé!</p>}
      {status === 'error' && (
        <p className="text-red-600 font-medium mb-4">
          {errorMessage || 'Erreur, essayez plus tard'}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              {content.nom_label} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              placeholder={content.nom_placeholder}
              required
              className="input-field"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              {content.prenom_label}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              placeholder={content.prenom_placeholder}
              required
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            {content.email_label}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={content.email_placeholder}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            {content.telephone_label}
            <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            required
            name="telephone"
            country="FR"
            value={phoneValue}
            onChange={setPhoneValue}
            placeholder={content.telephone_placeholder}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">{content.message_label}</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={content.message_placeholder}
            rows={5}
            required
            className="input-field"
          />
        </div>

        <div className="flex gap-3">
          {[
            { name: 'cv', label: content.cv_label },
            { name: 'motivation', label: content.motivation_label },
          ].map(({ name, label }) => (
            <div key={name} className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                {label}
                <span className="text-red-500">*</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer w-full border-2 border-[var(--primary)] rounded-3xl p-3 hover:border-[var(--secondary)] transition-colors">
                <span className="text-[var(--primary)] text-sm">
                  {form[name] ? '✓' : '↑'}
                </span>
                <span className="text-sm text-gray-400 truncate">
                  {form[name] ? form[name].name : 'Choisir…'}
                </span>
                <input
                  required
                  type="file"
                  name={name}
                  onChange={handleChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-(--primary) text-white rounded-3xl py-3 font-medium hover:bg-(--secondary) disabled:opacity-50 transition-colors cursor-pointer"
        >
          {status === 'loading' ? 'Envoi en cours…' : content.button_label}
        </button>
      </form>
    </div>
  );
}