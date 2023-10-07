'use client';

import ListGroup from '../components/ListGroup';
import NavBar from '../components/NavBar';
import { auth } from '../../firebase/clientApp'
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';


export default function Home() {
    const [user, loading, error] = useAuthState(auth);

    const router = useRouter();
    if(user) {
        console.log(user.displayName);
    } else if(!loading) {
        router.push('/auth');
        return;
    }

    return (
        <main className="default ">
            <NavBar current='Home'></NavBar>
        </main>
    );
}
