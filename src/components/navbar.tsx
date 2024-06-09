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
import { Button } from "./ui/button";
import axios from "axios";
import Toast from "./toast/Toast";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [showMenu, setShowMenu] = React.useState(false)
    const [showContactUs, setShowContactUs] = React.useState(false)
    const tokenUser = Cookies.get('Token')
    const router = useRouter()
    const roleUser = Cookies.get('Role')

    const handleLogoutUser = async (e: any) => {
        e.preventDefault()

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/logout';

        try {
            const response = await axios.post(baseUrl, {}, {
                headers: {
                    Authorization: `Bearer ${tokenUser}`
                }
            })
            Toast.fire({
                icon: 'success',
                title: `Berhasil logout, terima kasih telah menggunakan Robo Edu!`,
            });
            Cookies.remove('IsAlreadyHaveLogin')
            Cookies.remove('Token')
            Cookies.remove('IsAlreadyHaveAccount')
            Cookies.remove('IsAlreadyHaveRegistered')
            Cookies.remove('RoleUser')
            Cookies.remove('Role')
            Cookies.remove('IDUser')

            router.push(`/`)
            console.log({ response })
        } catch (error) {
            console.error({ error })
        }
    }
    return (
        <section className="w-full bg-primeColor flex flex-col relative">
            <header className="w-full bg-primeColor border-b border-b-gray-200 relative">
                <nav className="w-full h-fit py-1 px-3 md:px-20 flex justify-between items-center">
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
                            className={'w-16 md:w-24 h-fit'}
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
                            <Link href='/home' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><GoHomeFill />Home</Link>
                        </li>
                        {
                            roleUser == 'contributor' && tokenUser && <li><Link href='/dashboard/contributor' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoLaptopSharp />Contributor</Link></li>}{roleUser != 'contributor' && tokenUser && <li><Link href='/courses' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoLaptopSharp />Courses</Link></li>
                        }

                        <li><Link href='/about-us' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoInformationCircle />About Us</Link></li>
                        <li><div onClick={(e) => { setShowContactUs(!showContactUs); setShowMenu(!showMenu) }} className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoMdContact />Contact Us</div></li>
                        {
                            tokenUser && <>    <li><Link href='#' className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><PiGearFill />Edit Profile</Link></li>
                                <li><div onClick={(e) => handleLogoutUser(e)} className='gap-3 flex items-center !text-left justify-between px-5 py-3 hover:scale-110 hover:cursor-pointer duration-1000'><IoMdLogOut />Logout</div></li></>
                        }

                    </ul>
                </section>
            }
            {
                showContactUs && <section className="w-full bg-primeColor flex flex-col gap-5 items-start justify-center text-secondColor z-50 absolute top-20 right-0 border border-gray-200 rounded-lg px-5 py-4">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-secondColor font-bold text-base">Contact Us</h2>
                        <MdOutlineClose onClick={(e) => setShowContactUs(!showContactUs)} className="text-2xl text-secondColor hover:cursor-pointer" />
                    </div>

                    <div className="flex flex-col gap-2 w-full items-center justify-center mb-7 text-center">
                        <h2 className="text-secondColor font-bold text-lg leading-[100%]">Interested To <br />Cooperate With Us?</h2>
                        <Button className="w-fit ml-3 bg-secondColor hover:bg-secondColor text-white">Send Us Message</Button>
                    </div>

                </section>
            }
        </section>
    )
}