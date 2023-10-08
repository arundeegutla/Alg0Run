'use client'; // This is a client component 👈🏽
import { User } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';
import { Play } from '@/app/models';


const plays = [
    {
        name: 'Binary Indexed Tree',
        time: 'Yesterday',
        language: 'C++',
        socre: 10,
    },
    {
        name: 'Ternary Search',
        time: 'Yesterday',
        language: 'C++',
        socre: 10,
    },
    {
        name: 'Hello World',
        time: 'Yesterday',
        language: 'C++',
        socre: 10,
    },
    {
        name: 'Sliding Window',
        time: 'Yesterday',
        language: 'Python',
        socre: 10,
    },
];


export default function RecentPlays({
    className,
}: {
    className: string;
}) {
    
    return (
        <div className={className}>
            <div className="flex flex-col items-start w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8">
                <h2 className="font-semibold">Recent Plays</h2>
                {plays.map((play) => (
                    <li
                        key={play.name}
                        className="flex w-full justify-between py-5"
                    >
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {play.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {play.language}
                                </p>
                            </div>
                        </div>

                        <div className="flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                                {play.time}
                            </p>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
}
