'use client';

import ListGroup from '../components/ListGroup';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';

import { auth } from '../../firebase/clientApp'
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '@/components/Loading';
import Friends from '../components/Friends'
import RecentPlays from '@/components/RecentPlays';

export default function Home() {
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
        <main className="default flex-row items-stretch flex-wrap">
            <div className='flex flex-col items-stretch flex-wrap'>
                <Profile className='profile my-blur my-hover rounded-2xl' profile={{metadata: user, score: 10}}></Profile>
                <Friends className='profile my-blur my-hover rounded-2xl' friends={[]}></Friends>
            </div>
            <div>
                <Friends className='profile my-blur my-hover rounded-2xl' friends={[]}></Friends>
            </div>
            {/* <RecentPlays className='profile my-blur my-hover rounded-2xl' plays={[]}></RecentPlays> */}
            <NavBar current='Home'></NavBar>
        </main>
    );
}
