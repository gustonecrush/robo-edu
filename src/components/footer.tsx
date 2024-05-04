import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import { PiMapPinBold, PiPhoneBold } from "react-icons/pi";
import { TbBrandInstagram, TbBrandTwitter } from "react-icons/tb";

export default function Footer() {
    return (
        <footer className="bg-primeColor px-3 py-4 w-full">
            <div className="flex flex-col gap-2">
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
                <p className="text-sm text-gray-200">E-learning yang menghadirkan pendekatan berbasis VAKT dengan sentuhan  budaya lokal</p>
            </div>
            <div className="flex flex-row gap-3 w-full mt-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-bold text-gray-200">Explore</h2>
                    <ul className="text-gray-200 text-xs flex flex-col gap-1">
                        <li className='flex flex-row gap-0 items-center'><Link href={'/#'} title="Link">Home</Link></li>
                        <li className='flex flex-row gap-0 items-center'><Link href={'/#'} title="Link">Courses</Link></li>
                        <li className='flex flex-row gap-0 items-center'><Link href={'/#'} title="Link">About Us</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-bold text-gray-200">Contact</h2>
                    <ul className="text-gray-200 text-xs flex flex-col gap-1">
                        <li className='flex flex-row gap-0 items-center'><Link href={'/#'} title="Link"><PiMapPinBold /> Makasar, Indonesia</Link></li>
                        <li className='flex flex-row gap-0 items-center'><Link href={'/#'} title="Link"><PiPhoneBold /> 081345644255</Link></li>
                        <li className='flex flex-row gap-0 items-center'><Link href={'/#'} title="Link"><HiOutlineMail /> ypacm@gmail.com</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-bold text-gray-200">Social Media</h2>
                    <div className="flex gap-1 text-gray-200 text-sm">
                        <Link href={'/#'} title="Link"><TbBrandTwitter /></Link><Link href={'/#'} title="Link"><TbBrandInstagram /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}