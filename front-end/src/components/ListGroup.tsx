"use client";

import api from "@/firebase/api";
import { ProfileBasic } from "@/firebase/models";
import { useEffect, useState } from "react";

import dynamic from 'next/dynamic';

const FaUser = dynamic(() => import('react-icons/fa').then((mod) => mod.FaUser), {
  ssr: false, // Set to false to disable server-side rendering
});

const GiTrophyCup = dynamic(() => import('react-icons/gi').then((mod) => mod.GiTrophyCup), {
  ssr: false, // Set to false to disable server-side rendering
});

export default function ListGroup() {

  const [profiles, setProfiles] = useState([] as ProfileBasic[]);

  useEffect(() => {
    api.userLeaderboard().then((res) => {
      if (res.data.error === "") {
        setProfiles(res.data.results);
      }
    })
  }, [setProfiles]);

  profiles.sort((a, b) => b.totalScore - a.totalScore);
  const active_profiles = profiles.filter(x => x.totalScore > 0);

  return (
    <ul className=" divide-gray-200 dark:divide-gray-700 w-[100%]">
      {active_profiles.map((profile, idx) => (
        <li key={idx} style={{ borderBottom: "1px solid black" }} className='py-3'>
          <div className="flex items-center space-x-4">
            <div style={{ width: "20px" }} className="flex-shrink-0">
              <div className="text-lg font-medium text-gray-900">
                {idx + 1}.
              </div>
            </div>
            <div className="flex-shrink-0">
              {!profile.photoURL ? <div style={{ fontSize: "30px" }}><FaUser/></div>
              : <img className="w-8 h-8 rounded-full" src={profile.photoURL}/>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-medium text-gray-900 truncate">
                {profile.username}
              </div>
            </div>
            <div className='flex flex-row items-center text-amber-500 my-blur transparent-dark rounded-md px-3 py-1 text-base font-medium'>
              <div style={{ fontSize: "20px" }}><GiTrophyCup/></div>
              <h3 className='m-1'>{profile.totalScore}</h3>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
