import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
    return (
        <header className="w-full bg-primeColor border-b border-b-gray-200">
            <nav className="w-full h-fit py-1 px-3 flex justify-between items-center">
                <Link
                    href={'/'}
                    className={'w-fit'}
                    title={'Home Link'}
                >
                    <Image
                        alt={'Logo Robo Edu'}
                        width={0}
                        height={0}
                        src={'/logos/logo-robo-edu.png'}
                        className={'w-16 h-fit'}
                    />
                </Link>

                <div className="flex items-center justify-center w-fit h-fit">
                    <GiHamburgerMenu className="text-2xl text-secondColor" />
                </div>
            </nav>
        </header>
    )
}