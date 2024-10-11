import Link from 'next/link';

export default function Navbar(){

    return(
        <div className="bg-primary h-16 flex items-center justify-between shadow-xl px-2">
             <div className="text-white font-bold text-lg">PMS</div>
                <ul className="flex space-x-4">
                    <li>
                    <Link href="/" className="text-white hover:text-white">Home</Link>
                    </li>
                    <li>
                    <Link href="/about" className="text-white hover:text-white">About</Link>
                    </li>
                    <li>
                    <Link href="/calendar" className="text-white hover:text-white">Calendar</Link>
                    </li>
                </ul>
        </div>
    )
}