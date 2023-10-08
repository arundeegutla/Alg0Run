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

const info = [
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
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
];


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
                <RecentPlays className='profile my-blur my-hover rounded-2xl' plays={[]}></RecentPlays>
            </div>
            <div>
                <Friends className='profile my-blur my-hover rounded-2xl' friends={[]}></Friends>
            </div>
            <NavBar current='Home'></NavBar>
        </main>
    );
}
