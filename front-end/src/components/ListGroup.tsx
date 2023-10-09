"use client";

import api from "@/firebase/api";
import { ProfileBasic } from "@/firebase/models";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";

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

  return (
    <ul className="max-w-md divide-gray-200 dark:divide-gray-700">
      {profiles.map((profile, idx) => (
        <li style={{ borderBottom: "1px solid black" }} className='py-3'>
          <div className="flex items-center space-x-4">
            <div style={{ width: "20px" }} className="flex-shrink-0">
              <div className="text-base font-medium text-gray-900 truncate">
                {idx + 1}.
              </div>
            </div>
            <div className="flex-shrink-0">
              <FaUser suppressHydrationWarning className="h-8 w-auto rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {profile.username}
              </div>
            </div>
            <div className='flex flex-row items-center text-amber-500 my-blur transparent-dark rounded-md px-3 py-1 text-sm font-medium'>
              <GiTrophyCup suppressHydrationWarning className="h-4 w-auto " />
              <h3 className='m-1'>{profile.totalScore}</h3>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
