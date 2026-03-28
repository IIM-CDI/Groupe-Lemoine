'use client';
import { useState, useEffect } from 'react';
import { fetchStrapi } from '@/lib/strapi';
import { ContactFormContent } from '@/types/contact';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [content, setContent] = useState<ContactFormContent | null>(null);
  const [form, setForm] = useState({ name: '', email: '', sujet: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    fetchStrapi('/api/contact-form').then(setContent);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', sujet: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (!content) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-10 m-10 ">
      <h2 className="text-3xl font-bold mb-2 text-(--secondary)">{content.title}</h2>
      <p className="text-gray-400 text-lg mb-6">{content.description}</p>

      {status === 'success' && (
        <p className="text-green-600 font-medium mb-4">Message envoyé!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 font-medium mb-4">Essayez plus tard</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <div>
          <label className="block text-sm font-semibold mb-1">
            {content.nom_label}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={content.nom_placeholder}
            required
            className="input-field"
          />
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
            {content.sujet_label}
          </label>
          <input
            type="text"
            name="sujet"
            value={form.sujet}
            onChange={handleChange}
            placeholder={content.sujet_placeholder}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            {content.message_label}
            <span className="text-red-500">*</span>
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

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[var(--primary)] text-white rounded-3xl py-3 font-medium hover:bg-[var(--secondary)] disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? 'Sending...' : content.button_label}
        </button>
      </form>
    </div>
  );
}
