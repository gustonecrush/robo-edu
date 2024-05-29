'use client'

import Brands from "@/components/brands";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { Course } from "@/types/course";
import { CountingCourse, ReadingCourse, WritingCourse } from "@/dummies";
import { FaPlay } from "react-icons/fa";
import { formatTime } from "@/utils/time";
import axios from "axios";
import { Module, Video } from "@/types/robo-edu";
import { extractUUID } from "@/utils/uuid";
import { HashLoader } from 'react-spinners';

export default function Courses() {
    const path = usePathname()
    const moduleId = extractUUID(path)
    const [isLoading, setIsLoading] = React.useState(false)
    let [courseSelected, setCourseSelected] = React.useState<Course>(ReadingCourse)

    const [modules, setModules] = React.useState<Module[]>([])
    const handleFetchModlues = async () => {
        setIsLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/get-module?module_id=${moduleId}`;
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
    const [isLoadingVideos, setIsLoadingVideo] = React.useState(false)
    const handleFetchVideos = async (id = '') => {
        setIsLoadingVideo(true)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/get-video?module_id=${moduleId}`;
        try {
            const response = await axios.get(baseUrl)
            if (response.status == 200) {
                setVideos(response.data.data)
                console.log({ response })
                setIsLoadingVideo(false)
            }

        } catch (error) {
            console.error({ error })
            setIsLoadingVideo(false)
        }
    }

    React.useEffect(() => {
        if (path.includes('membaca')) {
            setCourseSelected(ReadingCourse);
        } else if (path.includes('menulis')) {
            setCourseSelected(WritingCourse);
        } else {
            setCourseSelected(CountingCourse);
        }
        handleFetchVideos()
        handleFetchModlues()
    }, [path])

    return (
        <main className="flex min-h-full flex-col w-full">
            <Navbar />
            {isLoadingVideos ? <div className="w-full flex flex-col gap-2 py-10 items-center justify-center">
                <HashLoader color="#FF8E06" size={32} />
            </div> : <CourseSection course={courseSelected} videos={videos} modules={modules} isLoadingVideos={setIsLoadingVideo} />
            }

            <Brands />
            <Footer />
        </main>
    );
}

function CourseSection({ course, videos, modules, isLoadingVideos }: { course: Course, videos: Video[], modules: Module[], isLoadingVideos: any }) {
    const [selectedMenu, setSelectedMenu] = React.useState('Deskripsi Materi')
    const [selectedVideo, setSelectedVideo] = React.useState(0)
    const [selectedVideoFile, setSelectedVideoFile] = React.useState<Video | null>(null)
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling animation
        });
    };
    const [isLoading, setIsLoading] = React.useState(isLoadingVideos)

    return <section className="w-full h-fit px-3 justify-center py-5 flex-col flex gap-5 items-center">


        <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="font-bold">
                {videos[selectedVideo]?.name}
            </h1>

            {
                selectedVideoFile ? <video width="320" height="240" controls preload="none" className='rounded-xl'>
                    <source src={process.env.NEXT_PUBLIC_BASE_URL + '/storage/' + selectedVideoFile?.file} type="video/mp4" />
                </video> : <Image
                    src={`/dummies/${course.video_course[selectedVideo]?.cover_video}`}
                    width={0}
                    height={0}
                    alt={course.video_course[selectedVideo]?.judul_video}
                    className="w-full h-[300px] object-cover rounded-lg"
                />
            }
            <p className="text-sm"> {videos?.[selectedVideo]?.desc}</p>
        </div>



        <div className="flex w-full flex-row justify-between border-t py-3 text-sm border-t-black border-b border-b-black">
            <div onClick={(e) => { setSelectedMenu('Deskripsi Materi') }} className={`hover:cursor-pointer ${selectedMenu == 'Deskripsi Materi' && 'text-secondColor'} w-full flex items-center justify-center`}>
                <p>Deskripsi Materi</p>
            </div>
            <div onClick={(e) => { setSelectedMenu('Detail Materi') }} className={`hover:cursor-pointer ${selectedMenu == 'Detail Materi' && 'text-secondColor'} w-full flex items-center justify-center`}>
                <p>Detail Materi</p>
            </div>
        </div>

        <div className="flex w-full flex-col gap-3 px-5 py-4 border-2 rounded-lg border-gray-200">
            {
                modules.map((item, index) => (
                    <div key={index} className="flex justify-between items-center w-full">
                        <p className="font-bold text-sm">{item.name}</p>
                        <div className="flex gap-1">
                            <Image
                                src='/icons/durasi.png'
                                width={0}
                                height={0}
                                className='w-4'
                                alt="Ikon Durasi"
                            />
                            <p className="text-xs">by {item?.contributor.username}</p>
                        </div>
                    </div>
                ))
            }

            <div className="flex justify-between bg-gray-300 rounded-full items-center w-full px-4 py-2">
                <div className="flex gap-1">
                    <Image
                        src='/icons/video.png'
                        width={0}
                        height={0}
                        className='w-4'
                        alt="Ikon Durasi"
                    />
                    <p className="text-xs">{videos.length} Video Pembelajaran</p>
                </div>
                <div className="flex gap-1">
                    <Image
                        src='/icons/materi.png'
                        width={0}
                        height={0}
                        className='w-4'
                        alt="Ikon Durasi"
                    />
                    <p className="text-xs">{course.soal_course.length} Soal</p>
                </div>
            </div>

        </div>

        <div className="w-full flex flex-col gap-0">

            {isLoading ? <div className="px-5 flex w-full items-center justify-center mt-4">
                <div className="w-full flex flex-col gap-2 py-5 items-center justify-center">
                    <HashLoader color="#FF8E06" size={40} />
                </div>
            </div> :
                videos?.map((video, index) => (
                    <div key={index} className="w-full py-3 px-5 flex-row flex gap-2 border border-black hover:cursor-pointer group" onClick={(e) => { setSelectedVideo(index); scrollToTop(); setSelectedVideoFile(video) }}>
                        <div className="!w-[150px] flex items-center justify-center overflow-clip relative">
                            <video width="320" height="240" controls preload="none" className='rounded-xl' poster="/dummies/dummy1.png">
                                <source src={process.env.NEXT_PUBLIC_BASE_URL + '/storage/' + video?.file} type="video/mp4" />
                            </video>
                        </div>
                        <div className="flex flex-col justify-between text-sm ">
                            <p className="group-hover:text-secondColor duration-1000">{video.name}</p>
                            <p>{video.duration}</p>
                        </div>
                    </div>
                ))
            }
        </div>

    </section>
}
