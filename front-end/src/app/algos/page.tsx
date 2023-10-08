'use client'; // This is a client component 👈🏽

import { useState } from 'react';
import DATA from './algos.json';
import NavBar from '@/components/NavBar';
import SearchComponent from '@/components/SearchBar';
import { SiPython } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandCpp } from 'react-icons/tb';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase/clientApp';
import Loading from '@/components/Loading';

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    if(user) {
        console.log(user.displayName);
    } else if(loading) { 
        return (
            <Loading />
        );
    } else {
        router.push('/auth');
        return;
    }
    
    
    let algos = [];
    for (let i = 0; i < 20; i++) {
        algos.push(DATA.algos[i].name);
    }

    
    const goType = ({name}: {name:string}) => {
        for (let i = 0; i < 20; i++) {
            if(name == DATA.algos[i].name) {
                useRouter().push('/type');
                return;
            }
        }
    }

    return (
        <main className="default flex-row items-center justify-center flex-wrap">
            <div className="flex flex-col items-center  w-[60%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8">
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
                <div className="flex flex-col h-[100%] overflow-y-auto mt-2">
                    <ul
                        role="list"
                        className="divide-y divide-gray-100 p-[20px]"
                    >
                        {algos.filter((algo) => {
                                if (searchTerm == '') {
                                    return algo;
                                } else if (
                                    algo
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                ) {
                                    return algo;
                                }
                            }).map((algo, id) => (
                                <li
                                    key={id}
                                    className="flex items-center justify-between gap-x-6 py-5"
                                >
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <h2>{algo}</h2>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <div className="flex flex-row text-sm leading-6 text-gray-900 ">
                                            <div className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                                                <SiPython className="h-8 w-auto " />
                                            </div>
                                            <div className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                                                <FaJava className="h-8 w-auto " />
                                            </div>
                                            <div className="flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium m-2 my-hover hover:cursor-pointer hover:text-violet-200">
                                                <TbBrandCpp className="h-8 w-auto " />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <NavBar current="Algo"></NavBar>
        </main>
    );
}
