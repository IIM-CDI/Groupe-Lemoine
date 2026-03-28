'use client';

import { useState, useEffect } from 'react';
import { fetchStrapi } from '@/lib/strapi';
import { CandidateFormContent } from '@/types/candidate';
import PhoneInput from 'react-phone-number-input/input';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CandidateForm() {
  const [content, setContent] = useState<CandidateFormContent | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState<{
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    cv: File | null;
    motivation: File | null;
    message: string;
  }>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    cv: null,
    motivation: null,
    message: '',
  });
  useEffect(() => {
    fetchStrapi('/api/candidate-form').then(setContent);
  }, []);

  const [value, setValue] = useState();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', form.nom);
    formData.append('prenom', form.prenom);
    formData.append('email', form.email);
    formData.append('telephone', form.telephone);

    if (form.cv) formData.append('cv', form.cv);
    if (form.motivation) formData.append('motivation', form.motivation);

    setStatus('loading');

    try {
      const res = await fetch('/api/candidate', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error();
      }
      setForm(form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (!content) {
    return <p>Loading....</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-3xl">
      <h2 className="text-2xl font-bold mb-2 text-black">{content.title}</h2>
      <p className="text-gray-400 text-lg mb-6">{content.description}</p>

      {status === 'success' && (
        <p className="text-green-600 font-medium mb-4">Message envoyé!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 font-medium mb-4">Essayez plus tard</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              {content.nom_label}
              <span className="text-red-500">*</span>
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
            type="tel"
            name="telephone"
            country="FR"
            value={form.telephone}
            onChange={setValue}
            placeholder={content.telephone_placeholder}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            {content.message_label}
          </label>
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
          className="w-full bg-[var(--primary)] text-white rounded-3xl py-3 font-medium hover:bg-[var(--secondary)] disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? 'Envoi en cours…' : content.button_label}
        </button>
      </form>
    </div>
  );
}
