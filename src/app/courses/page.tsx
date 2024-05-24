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
import Link from "next/link";
import Cookies from 'js-cookie'
import { HashLoader } from 'react-spinners';
import { Module } from "@/types/robo-edu";
import axios from "axios";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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

function CourseSection() {
    const coreValues = [
        { img: 'illustration-1.png', link: '/courses/belajar-membaca', value: 'Belajar menulis', },
        { img: 'illustration-2.png', link: '/courses/belajar-menulis', value: 'Belajar membaca', },
        { img: 'illustration-3.png', link: '/courses/belajar-menghitung', value: 'Belajar menghitung', },
    ]
    return (
        <section className="w-full h-fit px-3 py-16 bg-white flex items-center justify-center flex-col text-center gap-5">
            <div className="flex flex-col gap-5">
                <h1 className='font-bold text-black text-2xl'>Robo Edu E-Learning</h1>
                <h2 className='text-secondColor -mt-3'>Platform Edukasi Anak Tunagrahita</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
                {
                    coreValues.map((coreValue, index) => (
                        <Slide direction="up" key={index} duration={500 * index} delay={200 * index}>
                            <div className="flex items-center justify-center flex-col w-[230px] md:w-[280px] rounded-lg shadow-md h-fit px-3 py-6 gap-4">
                                <Image
                                    key={index}
                                    alt={coreValue.value}
                                    title={coreValue.value}
                                    width={0}
                                    height={0}
                                    src={`/illustrations/${coreValue.img}`}
                                    className={'w-28 md:w-36 h-fit'}
                                    priority
                                />
                                <p className="text-center text-sm md:text-base font-semibold leading-[100%]">{coreValue.value}</p>
                                <Link href={coreValue.link} className="w-fit rounded-full bg-secondColor hover:bg-secondColor text-white px-5 py-1">Mulai</Link>
                            </div>
                        </Slide>

                    ))
                }
            </div>

        </section>
    )
}

function ModuleSection() {
    const [modul, setModul] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [contributor, setContributor] = React.useState('')

    const idUser = Cookies.get('IDUser')
    const [idModule, setIdModule] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [isLoadingVideo, setIsLoadingVideo] = React.useState(false)
    const [isUploading, setIsUploading] = React.useState(false)

    const [modules, setModules] = React.useState<Module[]>([])
    const handleFetchModlues = async () => {
        setIsLoading(true)
        const id = Cookies.get('IDUser')
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/get-module`;
        try {
            const response = await axios.get(baseUrl)
            setModules(response.data.data)
            console.log({ response })
            setIsLoading(false)
        } catch (error) {
            console.error({ error })
            setIsLoading(false)
        }
    }
    const [showFormModule, setShowFormModule] = React.useState(false)
    const [showFormVideo, setShowFormVideo] = React.useState(false)

    React.useEffect(() => {
        handleFetchModlues()
    }, [])

    return (
        <section className="w-full h-fit px-3 md:px-64 pb-10 py-14 bg-white z-50 flex items-center justify-start flex-col text-left gap-1">
            <div className="w-full flex gap-2 justify-between items-center px-5">
                <div className="flex flex-col gap-0 text-left w-full ">
                    <h1 className='font-bold text-black text-left text-2xl md:text-4xl'>Modul Pembalajaran</h1>
                    <p className='text-gray-700 text-left text-sm md:text-xl'>
                        Tambahkan modulmu sendiri!
                    </p>
                </div>
            </div>
            {isLoading ? <div className="px-5 flex w-full items-center justify-center mt-10">
                <div className="w-full flex flex-col gap-2 py-10 items-center justify-center">
                    <HashLoader color="#FF8E06" size={32} />
                </div>
            </div> : modules.length > 0 && <Accordion type="single" collapsible className="w-full px-5">
                {
                    modules.map((module, index) => (
                        <AccordionItem key={index} value={module.id}>
                            <AccordionTrigger >
                                <div className="flex flex-col gap-0 items-start text-left w-full justify-start">
                                    <p className='font-medium '>
                                        {module.name}
                                    </p>
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        {module.category.name}
                                    </p>
                                </div>
                            </AccordionTrigger>

                        </AccordionItem>
                    ))
                }
            </Accordion>}
        </section>
    )
}