'use client'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Toast from '@/components/toast/Toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Slide } from 'react-awesome-reveal'
import { IoMdAdd } from 'react-icons/io'
import Cookies from 'js-cookie'
import { HashLoader } from 'react-spinners';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { LucideUploadCloud, X } from 'lucide-react'
import { IoPlay } from 'react-icons/io5'
import { BsTrash2Fill } from 'react-icons/bs'
import { MdEdit, MdEditNote, MdOutlineDelete } from 'react-icons/md'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

function Page() {
    const pathname = usePathname()
    const roleUser = pathname.includes('contributor') ? 'contributor' : 'student'
    return (
        <main className="flex min-h-full flex-col w-full">
            <Navbar />
            <HeroSection role={roleUser} />
            <ModuleSection />
            <Footer />
        </main>
    )
}

function HeroSection({ role }: { role: string }) {
    return (
        <section className="w-full h-fit px-3 py-24 bg-primeColor flex items-center justify-center flex-col text-center gap-2">
            <Slide direction="up">
                <h1 className="capitalize text-4xl md:text-6xl text-secondColor font-bold">{role}</h1>
            </Slide>
            <Slide direction="up">
                <p className="capitalize text-sm text-gray-200 md:text-base max-w-3xl">
                    Ayo jadi kontributor di Robo Edu! Bantu anak berkebutuhan khusus belajar dengan modul dan video yang inspiratif. Bersama, kita dapat memberikan dukungan yang berarti untuk masa depan mereka.
                </p>
            </Slide>
            <Slide direction="up">
                <Button className="w-fit ml-3 mt-6 bg-secondColor hover:bg-secondColor text-white">Ayo jadi bagian Robo Edu!</Button>
            </Slide>
        </section>
    )
}

type Category = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

type Contributor = {
    id: number;
    username: string;
}

type Module = {
    id: string;
    name: string;
    category: Category;
    contributor: Contributor;
    created_at: string;
    updated_at: string;
}

type Video = {
    id: string;
    name: string;
    desc: string;
    module: Module;
    file: string;
    duration: string;
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

    const [categories, setCategories] = React.useState<Category[]>([])
    const handleFetchCategories = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/get-category';
        try {
            const response = await axios.get(baseUrl)
            setCategories(response.data.data)
            console.log({ response })
        } catch (error) {
            console.error({ error })
        }
    }

    console.log({ idUser })

    const [modules, setModules] = React.useState<Module[]>([])
    const handleFetchModlues = async () => {
        setIsLoading(true)
        const id = Cookies.get('IDUser')
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/get-module?user_id=${id}`;
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

    const [videos, setVideos] = React.useState<Video[]>([])
    const handleFetchVideos = async (id = '') => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/get-video?module_id=${id}`;
        try {
            const response = await axios.get(baseUrl)
            setVideos(response.data.data)
            console.log({ response })
            setIsLoadingVideo(false)
        } catch (error) {
            console.error({ error })
            setIsLoadingVideo(false)
        }
    }

    const handleShowVideos = (id: string) => {
        setIdModule(id)
        setIsLoadingVideo(true)
        handleFetchVideos(id)
    }

    const handleUploadModul = async (e: any) => {
        e.preventDefault()

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/create-module';
        const modulData = new FormData()
        modulData.append('name', modul)
        modulData.append('category', category)
        modulData.append('contributor', idUser?.toString() || '')

        try {
            const response = await axios.post(baseUrl, modulData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('Token')}`
                }
            })
            Toast.fire({
                icon: 'success',
                title: `Berhasil menambahkan module!`,
            });
            console.log({ response })
            setModul('')
            setCategory('')
            handleFetchModlues()
            handleFetchCategories()
            setShowFormModule(false)
        } catch (error) {
            console.error({ error })
        }
    }


    const [idModuleVideo, setIdModuleVideo] = React.useState('')

    const [nameVideo, setNameVideo] = React.useState('')
    const [descVideo, setDescVideo] = React.useState('')
    const [durationVideo, setDurationVideo] = React.useState('')
    const [file, setFile] = React.useState<any>(null)
    const [modulVideo, setModulVideo] = React.useState(idModuleVideo)

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleUploadVideo = async (e: any) => {
        setIsUploading(true)
        e.preventDefault()

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/upload-video';
        const videoData = new FormData()
        videoData.append('name', nameVideo)
        videoData.append('desc', descVideo)
        videoData.append('duration', durationVideo)
        videoData.append('file', file)
        videoData.append('module', idModuleVideo)

        try {
            const response = await axios.post(baseUrl, videoData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('Token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            Toast.fire({
                icon: 'success',
                title: `Berhasil mengupload video pembelajaran!`,
            });
            console.log({ response })
            setNameVideo('')
            setDescVideo('')
            setDurationVideo('')
            setFile(null)
            setIdModule('')
            handleFetchModlues()
            handleFetchCategories()
            setShowFormVideo(false)
            setIsUploading(false)
        } catch (error) {
            console.error({ error })
            setIsUploading(false)
        }
    }

    const handleDeleteVideo = async (e: any, id: string) => {
        e.preventDefault()
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/delete-video/${id}`;
        try {
            const response = await axios.delete(baseUrl, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('Token')}`
                }
            })
            Toast.fire({
                icon: 'success',
                title: `Berhasil menghapus module!`,
            });
            console.log({ response })
            handleFetchVideos(id)
        } catch (error) {
            console.error({ error })
        }
    }

    const [nameModule, setNameModule] = React.useState('');
    const [categoryModule, setCategoryModule] = React.useState('');
    const [isOpenFormUpdate, setIsOpenFormUpdate] = React.useState(false)
    const [isOpenFormDelete, setIsOpenFormDelete] = React.useState(false)
    const [idModuleUpdate, setIdModuleUpdate] = React.useState('')

    const handleUpdateModule = async (e: any) => {
        e.preventDefault()

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/update-module/${idModuleUpdate}`;

        try {
            const response = await axios.put(baseUrl, ({
                name: nameModule,
                category: categoryModule
            }), {
                headers: {
                    Authorization: `Bearer ${Cookies.get('Token')}`
                }
            })
            Toast.fire({
                icon: 'success',
                title: `Berhasil mengupdate module-mu sobat Robo Edu!`,
            });
            console.log({ response })
            setNameModule('')
            setIdModuleUpdate('')
            setIsOpenFormUpdate(!isOpenFormUpdate)
            handleFetchModlues()
        } catch (error) {
            console.error({ error })
            Toast.fire({
                icon: 'error',
                title: `Gagal mengupdate module, terdapat gangguan server!`,
            });
        }
    }

    const handleDeleteModule = async (e: any) => {
        e.preventDefault()

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/delete-module/${idModuleUpdate}`;

        try {
            const response = await axios.delete(baseUrl, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('Token')}`
                }
            })
            Toast.fire({
                icon: 'success',
                title: `Berhasil menghapus module-mu sobat Robo Edu!`,
            });
            console.log({ response })
            setNameModule('')
            setIdModuleUpdate('')
            setIsOpenFormDelete(!isOpenFormDelete)
            handleFetchModlues()
        } catch (error) {
            console.error({ error })
            Toast.fire({
                icon: 'error',
                title: `Gagal menghapus module, terdapat gangguan server!`,
            });
        }
    }


    const [showFormModule, setShowFormModule] = React.useState(false)
    const [showFormVideo, setShowFormVideo] = React.useState(false)

    React.useEffect(() => {
        handleFetchModlues()
        handleFetchCategories()
    }, [])

    return (
        <section className="w-full h-fit px-3 md:px-64 pb-10 py-14 bg-white z-50 flex items-center justify-start flex-col text-left gap-1">
            <AlertDialog open={isOpenFormDelete}>

                <AlertDialogContent className='w-5/6 rounded-xl py-10'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Anda yakin ingin menghapus module ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Jika anda menghapus modul ini akan berlaku secara permanen selain itu video pembelajaran yang telah diupload juga akan terhapus!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => setIsOpenFormDelete(!isOpenFormDelete)}>Batal</AlertDialogCancel>

                        <Button onClick={(e) => handleDeleteModule(e)} className="w-full bg-secondColor hover:bg-secondColor active:ring-secondColor text-white">Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isOpenFormUpdate}>
                <AlertDialogContent className='w-5/6 rounded-xl py-10'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Module Pembelajaran mu!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ubah module video pembelajaran Robo Edu-mu dengan mudah sekarang juga!
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <form className="flex flex-col gap-2 mt-0 w-full">

                        {
                            isUploading ? <div className="px-5 flex w-full items-center justify-center mt-10">
                                <div className="w-full flex flex-col gap-2 py-5 -mt-10 items-center justify-center">
                                    <HashLoader color="#FF8E06" size={32} />
                                </div>
                            </div> : <>
                                <div className="flex flex-col w-full">
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        Nama
                                    </p>
                                    <Input value={nameModule} onChange={(e) => setNameModule(e.target.value)} className="w-full active:ring-secondColor focus:ring-secondColor" placeholder='Ubah Judul Modulmu' />
                                </div>
                                <div className="flex flex-col w-full">
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        Kategori Modul
                                    </p>
                                    <Select value={categoryModule} onValueChange={(value) => setCategoryModule(value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent side="top">
                                            <SelectGroup>
                                                <SelectLabel>Kategori Modul Pembelajaran</SelectLabel>
                                                {
                                                    categories.map((category, index) => (
                                                        <SelectItem key={index} value={category.id}>{category.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        }


                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={(e) => setIsOpenFormUpdate(!isOpenFormUpdate)}>Batal</AlertDialogCancel>

                            <Button onClick={(e) => handleUpdateModule(e)} className="w-full bg-secondColor hover:bg-secondColor active:ring-secondColor text-white">Update</Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={showFormVideo}>
                <AlertDialogContent className='w-5/6 rounded-xl py-10'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Upload Video Pembelajaran</AlertDialogTitle>
                        <AlertDialogDescription>
                            Segera upload video pembelajaran sebagai media belajar di Robo Edu!
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <form className="flex flex-col gap-2 mt-0 w-full">

                        {
                            isUploading ? <div className="px-5 flex w-full items-center justify-center mt-10">
                                <div className="w-full flex flex-col gap-2 py-5 -mt-10 items-center justify-center">
                                    <HashLoader color="#FF8E06" size={32} />
                                </div>
                            </div> : <>
                                <div className="flex flex-col w-full">
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        Judul
                                    </p>
                                    <Input value={nameVideo} onChange={(e) => setNameVideo(e.target.value)} className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan judul video" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        Description
                                    </p>
                                    <Textarea rows={4} value={descVideo} onChange={(e) => setDescVideo(e.target.value)} className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan description video" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        Durasi
                                    </p>
                                    <Input value={durationVideo} onChange={(e) => setDurationVideo(e.target.value)} className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="HH:MM:DD" />
                                </div>
                                <Input value={idModuleVideo} onChange={(e) => setModulVideo(e.target.value)} type='hidden' />
                                <div className="flex flex-col w-full">
                                    <p className="text-sm font-normal text-gray-700 !no-underline">
                                        Video
                                    </p>
                                    <Input
                                        id="fileVideo"
                                        type="file"
                                        className="col-span-3 cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                </div></>
                        }


                        <AlertDialogFooter>
                            {
                                !isUploading && <AlertDialogCancel onClick={(e) => setShowFormVideo(!showFormVideo)} >Batal</AlertDialogCancel>
                            }

                            <Button onClick={(e) => handleUploadVideo(e)} className="w-full bg-secondColor hover:bg-secondColor active:ring-secondColor text-white">Upload</Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            <div className="w-full flex gap-2 justify-between items-center px-5">
                <div className="flex flex-col gap-0 text-left w-full ">
                    <h1 className='font-bold text-black text-left text-2xl md:text-4xl'>Modul Pembalajaran</h1>
                    <p className='text-gray-700 text-left text-sm md:text-xl'>
                        Tambahkan modulmu sendiri!
                    </p>
                </div>

                <AlertDialog open={showFormModule}>
                    <AlertDialogTrigger asChild>
                        <div onClick={(e) => setShowFormModule(!showFormModule)} className="items-center justify-center flex p-3 bg-primeColor rounded-full hover:bg-secondColor group"><IoMdAdd className='text-secondColor group-hover:text-primeColor group-hover:cursor-pointer text-3xl' /></div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-5/6 rounded-xl py-10'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Tambahkan Modul Pembelajaran</AlertDialogTitle>
                            <AlertDialogDescription>
                                Sebelum mengupload video, buat modul terlebih dahulu untuk mengupload video - video pembelajaran sesuai kategori dan modul agar lebih terstruktur!
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <form className="flex flex-col gap-2 mt-0 w-full">
                            <div className="flex flex-col w-full">
                                <p className="text-sm font-normal text-gray-700 !no-underline">
                                    Modul
                                </p>
                                <Input value={modul} onChange={(e) => setModul(e.target.value)} className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan nama modul" />
                            </div>
                            <Input value={idUser} onChange={(e) => setContributor(e.target.value)} type='hidden' />
                            <div className="flex flex-col w-full">
                                <p className="text-sm font-normal text-gray-700 !no-underline">
                                    Kategori Modul
                                </p>
                                <Select value={category} onValueChange={(value) => setCategory(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        <SelectGroup>
                                            <SelectLabel>Kategori Modul Pembelajaran</SelectLabel>
                                            {
                                                categories.map((category, index) => (
                                                    <SelectItem key={index} value={category.id}>{category.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e) => setShowFormModule(!showFormModule)} >Batal</AlertDialogCancel>
                                <Button onClick={(e) => handleUploadModul(e)} className="w-full bg-secondColor hover:bg-secondColor active:ring-secondColor text-white">Upload</Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            {
                isLoading ? <div className="px-5 flex w-full items-center justify-center mt-10">
                    <div className="w-full flex flex-col gap-2 py-10 items-center justify-center">
                        <HashLoader color="#FF8E06" size={32} />
                    </div>
                </div> :
                    modules.length > 0 ? <Accordion type="single" collapsible className="w-full px-5">
                        {
                            modules.map((module, index) => (
                                <AccordionItem key={index} value={module.id}>
                                    <AccordionTrigger onClick={(e) => handleShowVideos(module.id)} >
                                        <div className="flex flex-col gap-0 items-start text-left w-full justify-start">
                                            <p className='font-medium '>
                                                {module.name}
                                            </p>
                                            <div className="w-fit flex gap-2">
                                                <p className="text-sm font-normal text-gray-700 !no-underline">
                                                    {module.category.name}
                                                </p>
                                                <p onClick={(e) => { setIsOpenFormUpdate(!isOpenFormUpdate); setIdModuleUpdate(module.id) }} className="text-sm flex gap-1 items-center font-normal text-secondColor udernline">
                                                    <MdEditNote />
                                                    <span>Edit Modul</span>
                                                </p>
                                                <p onClick={(e) => { setIsOpenFormDelete(!isOpenFormDelete); setIdModuleUpdate(module.id) }} className="text-sm flex gap-1 items-center font-normal text-red-500 udernline">
                                                    <MdOutlineDelete />

                                                    <span>Hapus Modul</span>
                                                </p>
                                            </div>

                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {
                                            videos?.length > 0 && <Button onClick={(e) => { setShowFormVideo(true); setIdModuleVideo(module.id) }} className="w-full mb-3 mt-0 bg-white border border-gray-400 text-primeColor flex items-center justify-center gap-1 hover:bg-white"><LucideUploadCloud />Upload Video</Button>
                                        }

                                        {
                                            isLoadingVideo && <div className="px-5 flex w-full items-center justify-center mt-10">
                                                <div className="w-full flex flex-col gap-2 py-10 items-center justify-center">
                                                    <HashLoader color="#FF8E06" size={32} />
                                                </div>
                                            </div>
                                        }

                                        {
                                            !isLoadingVideo && videos?.length == 0 && <div className="px-5 flex w-full items-center justify-center mt-10">
                                                <div className="w-full flex flex-col gap-2 items-center justify-center">
                                                    <Image src='/maskot/maskot.png' width={0} height={0} className='w-32 h-fit' alt='Robo Edu Maskot' />
                                                    <p className="text-gray-400 text-sm text-center">
                                                        Video anda belum tersedia, upload videomu sekarang!
                                                    </p>
                                                    <Button onClick={(e) => { setShowFormVideo(true); setIdModuleVideo(module.id) }} className="w-full mb-3 mt-0 bg-white border border-gray-400 text-primeColor flex items-center justify-center gap-1 hover:bg-white"><LucideUploadCloud />Upload Video</Button>
                                                </div>
                                            </div>
                                        }

                                        {

                                            videos.map((video, index) => (
                                                <div key={index} className="flex w-full flex-col px-5 items-center border border-gray-400 py-6 mb-2  rounded-lg relative">
                                                    <video width="320" height="240" controls preload="none" className='rounded-xl'>
                                                        <source src={process.env.NEXT_PUBLIC_BASE_URL + '/storage/' + video?.file} type="video/mp4" />
                                                    </video>
                                                    <div className="flex flex-col gap-0 mt-2">
                                                        <p className='font-medium text-lg'>{video.name}</p>
                                                        <p className='text-gray-500'>{video.desc}</p>
                                                    </div>

                                                    <div className="flex w-fit gap-1 absolute right-2 bottom-2">
                                                        <div className="w-fit flex gap-1 text-white ">
                                                            <div onClick={(e) => handleDeleteVideo(e, video.id)} className="w-fit p-2 bg-secondColor hover:text-secondColor hover:bg-primeColor rounded-full flex items-center justify-center">
                                                                <MdEdit />
                                                            </div>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <div className="w-fit p-2 bg-secondColor hover:text-secondColor hover:bg-primeColor rounded-full flex items-center justify-center">
                                                                        <BsTrash2Fill />
                                                                    </div>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent className='w-4/5 rounded-xl py-12'>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Apakah anda yakin ingin menghapus?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Hal ini tidak dapat kembali seperti semula. Video yang anda hapus akan selama-lamanya terhapus dari module ini dan server!
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                        <AlertDialogAction className='bg-secondColor hover:bg-secondColor active:bg-secondColor text-white' onClick={(e) => handleDeleteVideo(e, video.id)}>Lanjutkan</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }

                    </Accordion> : <div className="px-5 flex w-full items-center justify-center mt-10">
                        <div className="w-full flex flex-col gap-2 items-center justify-center">
                            <Image src='/maskot/maskot.png' width={0} height={0} className='w-32 h-fit' alt='Robo Edu Maskot' />
                            <p className="text-gray-400 text-sm text-center">
                                Modul anda belum tersedia, harap tambahkan modul dengan klik tanda +
                            </p>
                        </div>
                    </div>
            }

        </section>
    )
}

export default Page
