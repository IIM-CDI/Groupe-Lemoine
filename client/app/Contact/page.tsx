'use client';
import { useState, useEffect } from 'react';
import { fetchStrapi } from '@/lib/strapi';
import ContactForm from '@/components/forms/ContactForm';
import { useRef } from 'react';

export type faq = { id: number; question: string; answer: string };

export default function Contact() {
  const [data, setData] = useState<faq[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  fetchStrapi('/api/faqs').then((res) => {
    console.log(res)
    setData(Array.isArray(res) ? res : res.data ?? [])
  });
}, []);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="">
      <div className=" h-screen py-40 justify-self-center-safe">
        <h1 className="text-3xl font-semibold text-center mb-8"> Foire Aux Quaetions</h1>
        {data?.map((item: faq) => (
          <div
            key={item.id}
            className="border-b-2 border-(--primary) last:border-b-0 overflow-hidden py-2 max-w-4xl "
          >
            <div className="flex justify-between gap-8 items-start cursor-pointer text-xl py-4">
              <h2 className="font-semibold">{item.question}</h2>
              <span
                onClick={() => toggle(item.id)}
                className={`transition-transform duration-300 text-4xl text-(--secondary) ${openId === item.id ? 'rotate-45' : ''}`}
              >
                +
              </span>
            </div>
            <p
              className={`overflow-hidden transition-all duration-300 text-lg  ${openId === item.id ? 'max-h-96' : 'max-h-0'}`}
            >
              {item.answer}
            </p>
          </div>
        ))}
        <div className="flex flex-row h-12 justify-around items-end text-2xl mt-6">
          <h2 className='w-full text-center font-bold bg-(--primary-bg) rounded-3xl p-2.5'>Contactez nous!</h2>
          <button
           className='bg-(--primary) text-white p-2.5 rounded rounded-3xl w-full hover:cursor-pointer hover:bg-(--secondary)'
           onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
          >Formulaire de contact</button>
        </div>
      </div>
      <div ref={formRef}>
      <ContactForm/>

      </div>
    </div>
  );
}
