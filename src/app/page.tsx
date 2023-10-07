import ListGroup from '@/components/ListGroup';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-gray-50">
            <div className="flex flex-col bg-green-100 w-[50%]">
                <ListGroup />
            </div>
        </main>
    );
}
