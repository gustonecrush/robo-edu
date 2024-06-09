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
} from "@/components/ui/accordion2"

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
    type Category = {
        id: string;
        name: string;
    }

    const [categories, setCategories] = React.useState<Category[]>([])
    const [categoryIdSelected, setCategoryIdSelected] = React.useState<string>('')

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get-category`)
            console.log('CATEGORIES : ', response)

            setCategories(response.data.data)
        } catch (error) {
            console.error('ERROR CATEGORIES : ', error)
        }
    }

    const [modul, setModul] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [contributor, setContributor] = React.useState('')

    const idUser = Cookies.get('IDUser')
    const [idModule, setIdModule] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [isLoadingVideo, setIsLoadingVideo] = React.useState(false)
    const [isUploading, setIsUploading] = React.useState(false)

    const [modules, setModules] = React.useState<Module[]>([])
    const handleFetchModlues = async (idCategory: string) => {
        setIsLoading(true)
        const id = Cookies.get('IDUser')
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/get-module?category_id=` + idCategory;
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
        fetchCategories()
    }, [])

    return (
        <section className="w-full h-fit px-3 py-16 bg-white flex items-center justify-center flex-col text-center gap-5">
            <div className="flex flex-col gap-5">
                <h1 className='font-bold text-black text-2xl'>Robo Edu E-Learning</h1>
                <h2 className='text-secondColor -mt-5 text-sm'>Platform Edukasi Anak Tunagrahita</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
                {
                    categories.map((category, index) => (
                        <div key={index} className="flex items-center justify-center flex-col w-[230px] md:w-[280px] rounded-lg shadow-md h-fit px-3 py-6 gap-4" onClick={(e) => handleFetchModlues(category.id)}>
                            <Image
                                key={index}
                                alt={category.name}
                                title={category.name}
                                width={0}
                                height={0}
                                src={`/illustrations/${category.name == 'Menghitung' ? 'illustration-2.png' : category.name == 'Membaca' ? 'illustration-1.png' : 'illustration-3.png'}`}
                                className={'w-28 md:w-36 h-fit'}
                                priority
                            />
                            <p className="text-center text-sm md:text-base font-semibold leading-[100%]">{category.name}</p>
                        </div>

                    ))
                }
            </div>

            <section className="w-full h-fit px-3 md:px-64 pb-10 pt-4 bg-white z-50 flex items-center justify-start flex-col text-left gap-1">
                <div className="w-full flex gap-2 justify-between items-center px-5">
                    <div className="flex flex-col gap-0 text-center w-full ">
                        <h1 className='font-bold text-black text-center text-2xl md:text-4xl'>Modul Pembalajaran</h1>
                        <p className='text-secondColor text-center text-sm md:text-xl'>
                            Ayo tumbuh dan belajar bersama Robo Edu!
                        </p>
                    </div>
                </div>
                {isLoading ? <div className="px-5 flex w-full items-center justify-center mt-10">
                    <div className="w-full flex flex-col gap-2 py-10 items-center justify-center">
                        <HashLoader color="#FF8E06" size={32} />
                    </div>
                </div> : modules.length > 0 ? <Accordion type="single" collapsible className="w-full px-5">
                    {
                        modules.map((module, index) => (
                            <AccordionItem key={index} value={module.id}>
                                <AccordionTrigger >
                                    <Link href={`/courses/${module.id}`} className="flex flex-col gap-0 items-start text-left w-full justify-start">
                                        <p className='font-medium '>
                                            {module.name}
                                        </p>
                                        <p className="text-sm font-normal text-gray-700 !no-underline">
                                            {module.category.name}
                                        </p>
                                    </Link>
                                </AccordionTrigger>

                            </AccordionItem>
                        ))
                    }
                </Accordion> : <div className="w-full flex items-center justify-center flex-col gap-1 mt-10">
                    <Image src={'/maskot/maskot.png'} alt={'maskot Robo Edu'} width={0} height={0} className="w-56" /><h1 className='font-normal text-primeColor text-center text-xl'>Tidak ada Modul Yang Tersedia pada Kategori ini</h1></div>}
            </section>

        </section>
    )
}

function ModuleSection({ id }: { id: string }) {
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
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/get-module?category_id=` + id;
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
        <section className="w-full h-fit px-3 md:px-64 pb-10 pt-4 bg-white z-50 flex items-center justify-start flex-col text-left gap-1">
            <div className="w-full flex gap-2 justify-between items-center px-5">
                <div className="flex flex-col gap-0 text-center w-full ">
                    <h1 className='font-bold text-black text-center text-2xl md:text-4xl'>Modul Pembalajaran</h1>
                    <p className='text-secondColor text-center text-sm md:text-xl'>
                        Tambahkan modulmu sendiri!
                    </p>
                </div>
            </div>
            {isLoading ? <div className="px-5 flex w-full items-center justify-center mt-10">
                <div className="w-full flex flex-col gap-2 py-10 items-center justify-center">
                    <HashLoader color="#FF8E06" size={32} />
                </div>
            </div> : modules.length > 0 ? <Accordion type="single" collapsible className="w-full px-5">
                {
                    modules.map((module, index) => (
                        <AccordionItem key={index} value={module.id}>
                            <AccordionTrigger >
                                <Link href={`/courses/${module.id}`} className="flex flex-col gap-0 items-start text-left w-full justify-start">
                                    <p className='font-medium '>
                                        {module.name}
                                    </p>
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        {module.category.name}
                                    </p>
                                </Link>
                            </AccordionTrigger>

                        </AccordionItem>
                    ))
                }
            </Accordion> : <h1 className='font-bold text-black text-center text-2xl md:text-4xl'>Tidak ada Modul Yang Tersedia pada Kategori ini</h1>}
        </section>
    )
}