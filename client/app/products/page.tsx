'use client';
import { useState, useEffect } from 'react';
import { fetchStrapi } from '@/lib/strapi';
import Image from 'next/image';

export default function products() {
  return (
    <div className="">
      <h1 className="text-center text-(--secondary) text-3xl ">Title</h1>
      <p className="text-center text-lg text-gray-400">Description</p>

      <div className="">
        <div className="flex flex-row place-self-center bg-gray-400 p-4 rounded-full gap-5" >
          <button className="products-button">P1</button>
          <button className="products-button">p2</button>
          <button className="products-button"> p3</button>
          <button className="products-button">p4</button>
        </div>
        <div className="w-screen bg-red-100" >
          <Image
            src="/logo-vertical-lemoine.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
}
