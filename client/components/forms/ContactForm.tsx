'use client';
import { useState, useEffect } from 'react';
import { fetchStrapi } from '@/lib/strapi';
import { ContactFormContent } from '@/types/contact';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [content, setContent] = useState<ContactFormContent | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    fetchStrapi('/api/contact-form').then(setContent);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (!content) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
      <p className="text-gray-500 mb-6">{content.description}</p>

      {status === 'success' && (
        <p className="text-green-600 font-medium mb-4">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 font-medium mb-4">Something went wrong. Please try again.</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{content.name_label}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={content.name_placeholder}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{content.email_label}</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={content.email_placeholder}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{content.message_label}</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={content.message_placeholder}
            rows={5}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? 'Sending...' : content.button_label}
        </button>
      </form>
    </div>
  );
}