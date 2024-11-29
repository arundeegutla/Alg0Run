'use client'; // This is a client component 👈🏽
import SearchComponent from './SearchBar';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import api from '@/firebase/api';
import { ProfileBasic } from '@/firebase/models';
import AddFriend from './AddFriend';

const FaUser = dynamic(() => import('react-icons/fa').then((mod) => mod.FaUser), {
  ssr: false, // Set to false to disable server-side rendering
});

const GiTrophyCup = dynamic(() => import('react-icons/gi').then((mod) => mod.GiTrophyCup), {
  ssr: false, // Set to false to disable server-side rendering
});

export default function Friends({
  friends,
  className,
}: {
  friends: ProfileBasic[];
  className: string;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className={className}>
        <div className="flex flex-col w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-4">
          <h2 className='font-semibold'>Friends</h2>
          <SearchComponent placeholder="Search" onChange={(event: any) => {
            setSearchTerm(event.target.value);
          }} />
          <ul style={{ paddingTop: "0.5rem" }} className="max-w-md divide-gray-200 dark:divide-gray-700">
            {friends.filter((person) => {
              if (searchTerm == '' || person.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                return person;
              }
            }).map((person, i) => (
              <li key={i} className='py-3'>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div style={{ fontSize: "25px" }}><FaUser /></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {person.username}
                    </p>
                  </div>
                  <div className='flex flex-row items-center text-amber-500 my-blur transparent-dark rounded-md px-3 py-1 text-sm font-medium'>
                    <div style={{ fontSize: "20px" }}><GiTrophyCup /></div>
                    <h3 className='m-1'>{person.totalScore}</h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={className}>
        <AddFriend/>
      </div>
    </div>
  );
}
