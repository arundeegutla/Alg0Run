'use client'; // This is a client component 👈🏽
import { User } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';

const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    }
];

export default function Profile({
    friends,
    className,
}: {
    friends: MyUser[];
    className: string;
}) {
    return (
        <div className={className}>
            <div className="flex flex-col w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-4">
                <h2 className='font-semibold'>Friends</h2>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    {people.map((person) => (
                        <li className='py-3'>
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={person.imageUrl}
                                        alt="Neil image"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {person.name}
                                    </p>
                                </div>
                                <div className='flex flex-row items-center text-amber-500 my-blur transparent-dark rounded-md px-3 py-1 text-sm font-medium'>
                                    <GiTrophyCup className="h-4 w-auto "/>
                                    <h3 className='m-1'>{Math.floor(Math.random() * 1000) + 1}</h3>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
