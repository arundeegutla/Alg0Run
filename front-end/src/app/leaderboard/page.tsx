import ListGroup from '../../components/ListGroup';
import NavBar from '../../components/NavBar';
import Image from 'next/image';

export default function Home() {
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
