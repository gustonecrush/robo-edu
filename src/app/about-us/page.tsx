'use client'

import Brands from "@/components/brands";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { Bounce, Slide } from "react-awesome-reveal";
import { TbBrandInstagram, TbBrandTwitter } from "react-icons/tb";
import { MdFacebook } from "react-icons/md";
import { ImInstagram } from "react-icons/im";
import { FiBookmark } from "react-icons/fi";
import Marquee from "react-fast-marquee";

export default function AboutUs() {
    return (
        <main className="flex min-h-full flex-col w-full">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <MemberSection />
            <Brands />
            <Footer />
        </main>
    );
}



function HeroSection() {
    return (
        <section className="w-full h-fit px-3 py-16 bg-primeColor flex items-center justify-center flex-col text-center gap-2">
            <Slide direction="up">
                <h1 className="capitalize text-4xl md:text-6xl text-secondColor font-bold">Bertumbuh, Berkembang, Bersama Anak Disabilitas Tunagrahita</h1>
            </Slide>
            <Slide direction="up">
                <p className="capitalize text-sm text-gray-200 md:text-base md:max-w-4xl">
                    With us achieving dreams in building your education, together say “Yes” to extraordinary dreams
                </p>
            </Slide>
            <Slide direction="up">
                <Button className="w-fit ml-3 mt-6 bg-secondColor hover:bg-secondColor text-white">Get To Know About Robot Edu</Button>
            </Slide>
            <div className="flex flex-row gap-5 mt-6 w-full items-center justify-center text-gray-200 text-3xl">
                <Bounce><MdFacebook /></Bounce>
                <Bounce><ImInstagram /></Bounce>
                <Bounce><TbBrandTwitter /></Bounce>
            </div>
        </section>
    )
}

function AboutSection() {
    return (
        <section className="w-full h-fit px-3 md:px-20 py-10 bg-white  z-50 flex items-center justify-center flex-col text-center gap-3">
            <h1 className='font-bold text-black text-2xl md:text-4xl'>Visi & Misi Robo Edu</h1>
            <h2 className='text-secondColor md:text-xl'>Platform Pendukung  <br />Anak Tunagrahita</h2>
            <div className="flex flex-col md:flex-row gap-2 w-full">
                <Slide direction="left" className="md:w-full">
                    <div className="flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-5 shadow-md md:w-full md:flex-1 md:h-[200px]">
                        <div className="flex flex-row items-center justify-between">
                            <div className="bg-secondColor text-white rounded-full font-bold text-base flex items-center justify-center w-fit px-5 py-0">Visi</div>
                            <FiBookmark className="text-secondColor text-xl" />
                        </div>
                        <p className="text-sm text-justify md:text-base">Menjadi E-Learning yang bermanfaat untuk anak disabilitas tunagrahita sedang dalam pengembangan pola pikir nya, khusus nya dalam materi CALISTUNG untuk mengejar keterlambatan berpikir dari anak normal.</p>
                    </div>
                </Slide>
                <Slide direction="right" className="md:w-full">
                    <div className="flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-5 shadow-md md:w-full md:flex-1 md:h-[200px]">
                        <div className="flex flex-row items-center justify-between">
                            <div className="bg-secondColor text-white rounded-full font-bold text-base flex items-center justify-center w-fit px-5 py-0">Misi</div>
                            <FiBookmark className="text-secondColor text-xl" />
                        </div>
                        <ol className="text-sm text-justify md:text-base ml-3 list-decimal flex flex-col gap-2">
                            <li>Menjadi wadah yang bermanfaat untuk seluruh anak disabilitas tunagrahita dari berbagai daerah di Indonesia dengan berbasis E-Learning.</li>
                            <li>Menjadi wadah yang membantu anak tunagrahita dalam pembelajaran CALISTUNG melalui metode VAKT.</li>
                        </ol>
                    </div>
                </Slide>
            </div>
        </section>
    )
}

function MemberSection() {
    const members = [
        { name: 'Munawir Nasir, S.E.,M.M', status: 'Dosem Pendamping', img: 'member-1.png' },
        { name: 'Rasya Islami Dwi Julitha', status: 'Manajemen', img: 'member-2.png' },
        { name: 'Ragil Prasetyo Meyer', status: 'Manajemen', img: 'member-3.png' },
        { name: 'Nur Fadilah Aolia', status: 'Ilmu Komunikasi', img: 'member-4.png' },
        { name: 'Asran', status: 'Teknik Informatika', img: 'member-5.png' },
        { name: 'A. Dirga Ramdanil', status: 'Komunikasi Penyiaran Islam', img: 'member-6.png' },
    ]
    return (
        <section className="w-full h-fit px-3 md:px-20 py-10 bg-white  z-50 flex items-center justify-center flex-col text-center gap-3">
            <h1 className='font-bold text-black text-2xl md:text-4xl'>Our Team</h1>
            <h2 className='text-secondColor md:text-xl'>Tim Dibalik <br />Platform Robo Edu</h2>

            <Marquee className="flex gap-2 w-full" speed={30}>
                {
                    members.map((member, index) => (
                        <div key={index} className="flex flex-col border border-gray-300 rounded-lg px-4 py-5 shadow-md w-[200px] items-center justify-center text-center ml-5">
                            <Image
                                alt={member.name}
                                width={0}
                                height={0}
                                src={`/members/${member.img}`}
                                className={'w-[150px] h-[150px] object-cover rounded-md'}
                            />
                            <p className="text-sm text-center text-bold mt-2">{member.name}</p>
                            <p className="text-sm text-center">({member.status})</p>
                        </div>
                    ))
                }
            </Marquee>
        </section>
    )
}