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

export default function Courses() {
    const path = usePathname()
    let [courseSelected, setCourseSelected] = React.useState<Course>(ReadingCourse)

    React.useEffect(() => {
        if (path.includes('membaca')) {
            setCourseSelected(ReadingCourse);
        } else if (path.includes('menulis')) {
            setCourseSelected(WritingCourse);
        } else {
            setCourseSelected(CountingCourse);
        }
    }, [path])

    return (
        <main className="flex min-h-full flex-col w-full">
            <Navbar />
            <CourseSection course={courseSelected} />
            <Brands />
            <Footer />
        </main>
    );
}

function CourseSection({ course }: { course: Course }) {
    const [selectedMenu, setSelectedMenu] = React.useState('Deskripsi Materi')
    const [selectedVideo, setSelectedVideo] = React.useState(0)
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scrolling animation
        });
      };
      
    return <section className="w-full h-fit px-3 justify-center py-5 flex-col flex gap-5 items-center">
        <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="font-bold">
                {course?.video_course[selectedVideo]?.judul_video}
            </h1>
            <Image
                src={`/dummies/${course.video_course[selectedVideo]?.cover_video}`}
                width={0}
                height={0}
                alt={course.video_course[selectedVideo]?.judul_video}
                className="w-full h-[300px] object-cover rounded-lg"
            />
            <p className="text-sm">{course?.video_course[selectedVideo]?.deskripsi_video}</p>
        </div>
        <div className="flex w-full flex-row justify-between border-t py-3 text-sm border-t-black border-b border-b-black">
            <div onClick={(e) => { setSelectedMenu('Deskripsi Materi') }} className={`hover:cursor-pointer ${selectedMenu == 'Deskripsi Materi' && 'text-secondColor'} w-full flex items-center justify-center`}>
                <p>Deskripsi Materi</p>
            </div>
            <div onClick={(e) => { setSelectedMenu('Detail Materi') }} className={`hover:cursor-pointer ${selectedMenu == 'Detail Materi' && 'text-secondColor'} w-full flex items-center justify-center`}>
                <p>Detail Materi</p>
            </div>
        </div>

        <div className="w-full flex flex-col gap-0">
            {
                course.video_course?.map((video, index) => (
                    <div key={index} className="w-full py-3 px-5 flex-row flex gap-2 border border-black hover:cursor-pointer group" onClick={(e) => {setSelectedVideo(index); scrollToTop()}}>
                        <div className="!w-[150px] flex items-center justify-center overflow-clip relative">
                            <Image
                                src={`/dummies/${video?.cover_video}`}
                                width={0}
                                height={0}
                                alt={video?.judul_video}
                                className="w-full h-[80px] object-cover rounded-lg"
                            />
                            <FaPlay className="text-2xl text-secondColor absolute z-50" />
                        </div>
                        <div className="flex flex-col justify-between text-sm ">
                            <p className="group-hover:text-secondColor duration-1000">{video.judul_video}</p>
                            <p>{video.durasi_video}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
}
