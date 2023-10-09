'use client'; // This is a client component 👈🏽
import { User } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';
import { Play } from '@/firebase/api';



export default function RecentPlays({
    plays,
    className,
}: {
    plays: Play[];
    className: string;
}) {
    
    plays.sort((a, b) => {
        return b.playDetails.date_completed - a.playDetails.date_completed;
    });

    const here_plays = plays.slice(0, 4);

    return (
        <div className={className}>
            <div className="flex flex-col items-start w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8">
                <h2 className="font-semibold">Recent Plays</h2>
                {here_plays.map((play) => (
                    <li
                        key={play.algoId}
                        className="flex w-full justify-between py-5"
                    >
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {play.playDetails.language}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {play.playDetails.code_length}
                                </p>
                            </div>
                        </div>

                        <div className="flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                                {play.playDetails.score}
                            </p>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
}
