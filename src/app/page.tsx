'use client'

import Brands from "@/components/brands";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bounce, Slide } from "react-awesome-reveal";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col w-full">
      <Navbar />
      <HeroSection />
      <ValuesSection />
      <AboutSection />
      <Brands />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="w-full h-fit px-3 py-16 bg-primeColor flex items-center justify-center flex-col text-center gap-2">
      <Slide direction="up">
        <h1 className="uppercase text-4xl text-secondColor font-bold">ROBO EDU</h1>
      </Slide>
      <Slide direction="up">
        <p className="capitalize text-sm text-gray-200">
          E-learning yang menghadirkan pendekatan berbasis VAKT (Visual, Auditory, Kinesthetic, dan Tactile) dengan sentuhan khusus dari budaya lokal. Melalui program ini, kami bertekad meningkatkan kemampuan CALISTUNG (membaca, menulis, dan menghitung) siswa tunagrahita sedang di SLB YPAC Makassar
        </p>
      </Slide>
      <Bounce delay={500}>
        <Image
          alt={'Logo Robo Edu'}
          width={0}
          height={0}
          src={'/maskot/maskot.png'}
          className={'w-full h-fit mt-7'}
        />
      </Bounce>
      <Slide direction="up">
        <Button className="w-fit ml-3 bg-secondColor hover:bg-secondColor text-white">Courses</Button>
      </Slide>
    </section>
  )
}

function ValuesSection() {
  const coreValues = [
    { img: 'illustration-1.png', value: 'Meningkatkan kemampuan menulis', },
    { img: 'illustration-2.png', value: 'Meningkatkan kemampuan membaca', },
    { img: 'illustration-3.png', value: 'Meningkatkan kemampuan menghitung', },
  ]
  return (
    <section className="w-full h-fit px-3 py-16 bg-white flex items-center justify-center flex-col text-center gap-5">
      {
        coreValues.map((coreValue, index) => (
          <Slide direction="up" key={index} duration={500 * index} delay={200 * index}>
            <div className="flex items-center justify-center flex-col w-[230px] rounded-lg shadow-md h-fit px-3 py-10 gap-4">
              <Image
                key={index}
                alt={coreValue.value}
                title={coreValue.value}
                width={0}
                height={0}
                src={`/illustrations/${coreValue.img}`}
                className={'w-20 h-fit'}
                priority
              />
              <p className="text-center text-sm font-semibold leading-[100%]">{coreValue.value}</p>
            </div>
          </Slide>

        ))
      }
    </section>
  )
}

function AboutSection() {
  return (
    <section className="w-full h-fit px-3 py-10 bg-white  z-50 flex items-center justify-center flex-col text-center gap-3">
      <h1 className='font-bold text-black text-2xl'>Who Are We</h1>
      <h2 className='text-secondColor'>Platform Edukasi <br />Anak Tunagrahita</h2>
      <p className='text-gray-700 text-sm'>
        Fokus dan tujuan dari Robo Edu adalah membantu anak tunagrahita sedang yang memiliki IQ 30-50 dalam pengembangan pola pikirnya melalui metode VAKT (Visual, Auditif, Kinestetik, Taktil)
      </p>
    </section>
  )
}