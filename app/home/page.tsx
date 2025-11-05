'use client'; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import SearchComponent from '@/components/SearchBar';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/clientApp';
import api from '@/firebase/api';
import Loading from '@/components/Loading';
import { Algo } from '@/firebase/models';
import RootLayout from '../layout';

import dynamic from 'next/dynamic';

const SiPython = dynamic(() => import('react-icons/si').then((mod) => mod.SiPython), {
  ssr: false, // Set to false to disable server-side rendering
});

const FaJava = dynamic(() => import('react-icons/fa').then((mod) => mod.FaJava), {
  ssr: false, // Set to false to disable server-side rendering
});

const TbBrandCpp = dynamic(() => import('react-icons/tb').then((mod) => mod.TbBrandCpp), {
  ssr: false, // Set to false to disable server-side rendering
});

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

  // Show loading only during initial auth check
  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <RootLayout>
      <div style={{ height: "90vh" }} className="flex flex-row items-center justify-center flex-wrap m-auto w-full">
        <div className="flex flex-col items-center h-[100%] rounded-2xl bg-white/[0.6] text-black p-8 min-w-[50%]">
          <div className="top">
            <h1 className="head text-4xl" style={{ textAlign: 'center' }}>
              Algorithms
            </h1>
          </div>
          <SearchComponent
            placeholder="Search"
            onChange={(event: any) => {
              setSearchTerm(event.target.value);
            }}
          />
          <div className="flex flex-col h-[100%] mt-2 scrollbar-hide overflow-auto">
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
                        <a href={"/algos/run?lang=python&id=" + algo.id} className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                          <div style={{ fontSize: "35px" }}><SiPython /></div>
                        </a>
                        <a href={"/algos/run?lang=java&id=" + algo.id} className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                          <div style={{ fontSize: "35px" }}><FaJava /></div>
                        </a>
                        <a href={"/algos/run?lang=cpp&id=" + algo.id} className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                          <div style={{ fontSize: "35px" }}><TbBrandCpp /></div>
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
