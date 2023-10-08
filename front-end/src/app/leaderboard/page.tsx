'use client';

import ListGroup from '../../components/ListGroup';
import NavBar from '../../components/NavBar';
import Image from 'next/image';

import { auth } from '../../../firebase/clientApp'
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '@/components/Loading';

export default function Leaderboard() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

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

    return (
        <main className="default items-center justify-center flex-col px-[20%]">
            <NavBar current='Leaderboard'></NavBar>
            <h1 className='text-4xl'>Leaderboard</h1>
            <div className="flex flex-col w-[50%]">
                <ListGroup />
            </div>
        </main>
    );
}
