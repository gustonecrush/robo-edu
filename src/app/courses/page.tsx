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

export default function Courses() {
    return (
        <main className="flex min-h-full flex-col w-full">
            <Navbar />
            <HeroSection />
            <CourseSection />
            <Brands />
            <Footer />
        </main>
    );
}

function HeroSection() {
    return (
        <section className="w-full h-fit px-3 py-16 bg-primeColor flex items-center justify-center flex-col text-center gap-2">
            <Slide direction="up">
                <h1 className="capitalize text-4xl text-secondColor font-bold">Bertumbuh, Berkembang, Bersama Anak Disabilitas Tunagrahita</h1>
            </Slide>
            <Slide direction="up">
                <p className="capitalize text-sm text-gray-200">
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

function CourseSection() {
    const coreValues = [
        { img: 'illustration-1.png', value: 'Belajar menulis', },
        { img: 'illustration-2.png', value: 'Belajar membaca', },
        { img: 'illustration-3.png', value: 'Belajar menghitung', },
    ]
    return (
        <section className="w-full h-fit px-3 py-16 bg-white flex items-center justify-center flex-col text-center gap-5">
            <h1 className='font-bold text-black text-2xl'>Robo Edu E-Learning</h1>
            <h2 className='text-secondColor -mt-3'>Platform Edukasi Anak Tunagrahita</h2>
            {
                coreValues.map((coreValue, index) => (
                    <Slide direction="up" key={index} duration={500 * index} delay={200 * index}>
                        <div className="flex items-center justify-center flex-col w-[230px] rounded-lg shadow-md h-fit px-3 py-6 gap-4">
                            <Image
                                key={index}
                                alt={coreValue.value}
                                title={coreValue.value}
                                width={0}
                                height={0}
                                src={`/illustrations/${coreValue.img}`}
                                className={'w-28 h-fit'}
                                priority
                            />
                            <p className="text-center text-sm font-semibold leading-[100%]">{coreValue.value}</p>
                            <Button className="w-fit rounded-full bg-secondColor hover:bg-secondColor text-white">Mulai</Button>
                        </div>
                    </Slide>

                ))
            }
        </section>
    )
}