'use client'; // This is a client component 👈🏽

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FaLaptopCode } from 'react-icons/fa';
import { HiFastForward, HiBell, HiX } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';
import { auth } from '../../firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Type', href: '/type' },
    { name: 'Leaderboard', href: '/leaderboard' },
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

    const getDroppy = () => {
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                            >
                                Your Profile
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                )}
                            >
                                Settings
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                onClick={signOut}
                                href="#"
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
            return <FaUser className="h-8 w-8 rounded-full" />
        }
        const url: string = user.photoURL !== null ? user.photoURL : '';
        return <img src={url} className='h-8 w-8 rounded-full'/>
    }

    return (
        <div className="top-0 w-screen left-0 absolute">
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <HiX
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <HiFastForward
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <FaLaptopCode
                                            className="h-8 w-auto text-red-400 cursor-pointer hover:text-red-300"
                                            alt="AlgoRun"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.name == current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={
                                                        item.name == current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ring-2 ring-white ring-offset-2 ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                {getProfilePic()}
                                            </Menu.Button>
                                        </div>
                                        {getDroppy()}
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.name == current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={
                                            item.name == current
                                                ? 'page'
                                                : undefined
                                        }
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
