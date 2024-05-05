'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { IoMdContact, IoMdLogOut } from "react-icons/io";
import { IoInformationCircle, IoLaptopSharp } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { PiGearFill } from "react-icons/pi";

export default function Navbar() {
    const [showMenu, setShowMenu] = React.useState(false)
    return (
        <section className="w-full bg-primeColor flex flex-col relative">
            <header className="w-full bg-primeColor border-b border-b-gray-200 relative">
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
                        {
                            showMenu ? <MdOutlineClose onClick={(e) => setShowMenu(!showMenu)} className="text-2xl text-secondColor hover:cursor-pointer" /> : <GiHamburgerMenu onClick={(e) => setShowMenu(!showMenu)} className="text-2xl text-secondColor hover:cursor-pointer" />
                        }
                    </div>
                </nav>

            </header>
            {
                showMenu &&
                <section className="w-fit bg-primeColor flex items-center justify-center text-secondColor z-50 absolute top-20 right-0 border border-gray-200 rounded-lg">
                    <ul>
                        <li>
                            <Link href='/' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><GoHomeFill />Home</Link>
                        </li>
                        <li><Link href='/courses' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoLaptopSharp />Courses</Link></li>
                        <li><Link href='/about-us' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoInformationCircle />About Us</Link></li>
                        <li><Link href='#' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoMdContact />Contact Us</Link></li>
                        <li><Link href='#' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><PiGearFill />Edit Profile</Link></li>
                        <li><Link href='#' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoMdLogOut />Logout</Link></li>
                    </ul>
                </section>
            }
        </section>
    )
}