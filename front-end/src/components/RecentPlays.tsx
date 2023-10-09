'use client'; // This is a client component 👈🏽

import { Play, PlayDetails } from '@/firebase/models';
import ALGOS from "@/firebase/algos.json" ;

function getSeconds(playDetails: PlayDetails) {
    return ((playDetails.date_completed as unknown) as { _seconds: number })._seconds * 1000
}

export default function RecentPlays({
    plays,
    className,
}: {
    plays: Play[];
    className: string;
}) {

    const nameMap = new Map<string, string>(ALGOS.map(x => [x.id, x.name]));
    
    plays.sort((a, b) => {
        return getSeconds(b.playDetails) - getSeconds(a.playDetails);
    });

    const here_plays = plays.slice(0, Math.min(plays.length, 5));

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
                                    {nameMap.get(play.algoId)} - {play.playDetails.language} - {(play.playDetails.accuracy * 100).toFixed(2)}%
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {new Date(getSeconds(play.playDetails)).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                                {play.playDetails.score.toFixed(0)} pts
                            </p>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
}
