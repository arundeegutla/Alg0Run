'use client'; // This is a client component 👈🏽
import { User } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi'

declare global {
    type MyUser = {
        metadata: User | undefined | null;
        score: number;
    };
}

export default function ProfileComponent({
    profile,
    className,
}: {
    profile: MyUser;
    className: string;
}) {
    const getProfilePic = () => {
        if (!profile || !profile.metadata || !profile.metadata.photoURL)
            return <FaUser className="h-40 aspect-square rounded-full" />;
        const url: string =
            profile.metadata.photoURL !== null ? profile.metadata.photoURL : '';
        return <img src={url} className="h-40 aspect-square rounded-full" />;
    };

    const getName = () => {
        if (!profile || !profile.metadata || !profile.metadata.displayName)
            return 'No Name';
        return profile.metadata.displayName;
    };

    return (
        <div className={className}>
            <div className="flex flex-row items-center w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8">
                <div>{getProfilePic()}</div>
                <div className="flex flex-col justify-center items-start ml-3">
                    <div>
                        <h1>Hi, {getName()}</h1>
                    </div>

                    <div>
                        <div className="block">
                            <div className="flex flex-row justify-center items-center ">
                                <div className='flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium mb-2'>
                                    <GiTrophyCup className="h-8 w-auto "/>
                                    <h2 className='m-1'>{profile.score}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
