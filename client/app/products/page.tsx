'use client';
import { useState, useEffect } from 'react';
import { fetchStrapi } from '@/lib/strapi';
import Image from 'next/image';

export default function products() {
  return (
    <div className="max-h-100">
      <h1>Title</h1>
      <p>Description</p>

      <div className="">
        <div className="flex flex-row">
            <button>P!</button>
            <button>p2</button>
            <button>p3</button>
            <button>p4</button>
        </div>
        <div className="">
          <Image
            src="/logo-vertical-lemoine.png"
            width={1000}
            height={1000}
            alt="Picture of the author"
          />
          <h2>Coton machin truc</h2>
        </div>
      </div>
    </div>
  );
}
