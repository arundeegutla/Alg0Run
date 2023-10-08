'use client'; // This is a client component 👈🏽

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FaLaptopCode } from 'react-icons/fa';

// Icons
import { AiFillHome } from 'react-icons/ai';
import {MdLeaderboard} from 'react-icons/md'
import { FaUser } from 'react-icons/fa';

// Auth
import { auth } from '../../firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

const navigation = [
    { name: 'Home', href: '/'},
    { name: 'Leaderboard', href: '/leaderboard' }
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar({ current }: { current: string }) {
    const [user, loading, error] = useAuthState(auth);

    const signOut = () => {
        auth.signOut()
            .then(function () {
                useRouter().push('/auth');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getDroppedDown = () => {
        if (!user) return '';
        return (
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-10 top-[-16px] z-10 mt-2 w-48 origin-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <a onClick={signOut} href="#"
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                            >
                                Sign out
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        );
    };

    const getProfilePic = () => {
        if(!user) {
            return <FaUser className="h-8 w-auto rounded-full" />
        }
        const url: string = user.photoURL !== null ? user.photoURL : '';
        return <img src={url} className='h-8 w-auto rounded-full'/>
    }

    const getIcon = (value: string) => {
        if(value == 'Home') {
            return <AiFillHome className="h-8 w-auto text-white cursor-pointer hover:text-red-300"/>
        }
        return <MdLeaderboard className="h-8 w-auto text-white cursor-pointer hover:text-red-300"/>
    }

    return (
        <div className="top-0 left-0 absolute w-16">
            <Disclosure as="nav" className="my-blur transparent-dark">
                {({ open }) => (
                    <>
                        <div className="my-auto max-w-7xl pb-6 pt-4 h-screen ">
                            <div className="relative flex flex-col justify-between h-[100%] items-center">
                                <div>
                                    {/* LOGO */}
                                    <div className="flex items-center justify-center">
                                        <FaLaptopCode
                                            className="h-8 w-auto text-red-400 cursor-pointer hover:text-red-300 mb-4"
                                            alt="AlgoRun"
                                        />
                                    </div>

                                    <div className="block">
                                        <div className="flex flex-col">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.name == current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium mb-2'
                                                    )}
                                                    aria-current={
                                                        item.name == current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {getIcon(item.name)}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Menu as="div" className="relative focus:outline-0">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ring-2 ring-white ring-offset-2 ring-offset-gray-800 focus:outline-0">
                                            {getProfilePic()}
                                        </Menu.Button>
                                    </div>
                                    {getDroppedDown()}
                                </Menu>
                            </div>
                        </div>

                    </>
                )}
            </Disclosure>
        </div>
    );
}
