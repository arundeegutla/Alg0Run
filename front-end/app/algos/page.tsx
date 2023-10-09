'use client'; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import SearchComponent from '@/components/SearchBar';
import { SiPython } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandCpp } from 'react-icons/tb';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import api from '@/firebase/api';
import Loading from '@/components/Loading';
import { Algo } from '@/firebase/models';
import RootLayout from '../layout';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const [algos, setAlgos] = useState([] as Algo[]);

  useEffect(() => {
    api.getAllAlgos().then((res) => {
      if (res.data.error === "") {
        setAlgos(res.data.results);
      }
    })
  }, [setAlgos]);

  if (user) {
    console.log(user.displayName);
  } else if (loading) {
    return (
      <Loading />
    );
  } else {
    router.push('/auth');
    return;
  }

  return (
    <RootLayout>
      <div style={{ height: "90vh" }} className="flex-row items-center justify-center flex-wrap">
        <div style={{ minWidth: "200px" }} className="flex flex-col items-center  w-[60%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8">
          <div className="top">
            <h1
              className="head text-4xl"
              style={{ textAlign: 'center' }}
            >
              Algorithms
            </h1>
          </div>
          <SearchComponent
            onChange={(event: any) => {
              setSearchTerm(event.target.value);
            }}
          />
          <div style={{ overflow: "scroll" }} className="flex flex-col h-[100%] mt-2">
            <ul
              role="list"
              className="divide-y divide-gray-100 p-[20px]"
            >
              {algos.filter((algo) => algo.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((algo) => (
                  <li
                    key={algo.id}
                    className="flex items-center justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <h2>{algo.name}</h2>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div className="flex flex-row text-sm leading-6 text-gray-900 ">
                        <a href={"/algos/python__" + algo.id} className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                          <SiPython className="h-8 w-auto " />
                        </a>
                        <a href={"/algos/java__" + algo.id} className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                          <FaJava className="h-8 w-auto " />
                        </a>
                        <a href={"/algos/cpp__" + algo.id} className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                          <TbBrandCpp className="h-8 w-auto " />
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
