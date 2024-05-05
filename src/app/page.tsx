'use client'

import Brands from "@/components/brands";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { Bounce, Slide } from "react-awesome-reveal";

export default function Home() {
  const [isAlreadyHaveAccount, setIsAlreadyHaveAccount] = React.useState(false)
  const [isAlreadyHaveRegistered, setIsAlreadyHaveRegistered] = React.useState(false)
  const [isAlreadyHaveLogin, setIsAlreadyHaveLogin] = React.useState(false)

  function LoginSection() {
    return (
      <section className="w-full h-fit px-3 md:px-64 pb-10 py-14 bg-white z-50 flex items-center justify-center flex-col text-center gap-1">
        <h1 className='font-bold text-black text-2xl md:text-4xl'>Masuk ke Robo Edu</h1>
        <p className='text-gray-700 text-sm md:text-xl'>
          Masuk ke Robo Edu dan belajar banyak hal dengan course yang tersedia!
        </p>
        <form action="" className="flex flex-col gap-2 mt-6 w-full px-5">
          <Input className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan Username" />
          <Input className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan Password" />
          <Slide direction="up">
            <Button type="button" onClick={(e) => setIsAlreadyHaveLogin(true)} className="w-full bg-secondColor hover:bg-secondColor active:ring-secondColor text-white">Masuk</Button>
          </Slide>
        </form>
      </section>
    )
  }

  function RegisterSection() {
    return (
      <section className="w-full h-fit px-3 md:px-64 pb-10 py-14 bg-white z-50 flex items-center justify-center flex-col text-center gap-1">
        <h1 className='font-bold text-black text-2xl md:text-4xl'>Daftar Akun</h1>
        <p className='text-gray-700 text-sm md:text-xl'>
          Daftarkan dirimu dan akses seluruh course yang ada!
        </p>
        <form action="" className="flex flex-col gap-2 mt-6 w-full px-5">
          <Input className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan Namamu" />
          <Input className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan Email" />
          <Input className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan Username" />
          <Input className="w-full active:ring-secondColor focus:ring-secondColor" placeholder="Masukkan Password" />
          <Slide direction="up">
            <Button className="w-full bg-secondColor hover:bg-secondColor active:ring-secondColor text-white">Daftar</Button>
          </Slide>
          <Slide direction="up">
            <Button onClick={(e) => { setIsAlreadyHaveAccount(true); setIsAlreadyHaveRegistered(true) }} type="button" className="w-full bg-primeColor hover:bg-primeColor active:ring-primeColor text-white">Sudah Punya Akun</Button>
          </Slide>
        </form>
      </section>
    )
  }

  return (
    <main className="flex min-h-full flex-col w-full">
      <Navbar />
      <HeroSection />
      {isAlreadyHaveLogin && <ValuesSection />}
      {!isAlreadyHaveRegistered && <RegisterSection />
      }
      {isAlreadyHaveAccount && !isAlreadyHaveLogin && <LoginSection />}
      <AboutSection />
      <Brands />
      <Footer />
    </main>
  );
}



function HeroSection() {
  return (
    <section className="w-full h-fit px-3 md:px-20 py-16 bg-primeColor flex items-center justify-center flex-col md:flex-row text-center gap-2 md:gap-5">
      <div className="flex flex-col  gap-2 md:gap-5 md:text-left w-fit">
        <Slide direction="up">
          <h1 className="uppercase text-4xl md:text-6xl text-secondColor font-bold">ROBO EDU</h1>
        </Slide>
        <Slide direction="up">
          <p className="capitalize text-sm md:text-base md:max-w-4xl text-gray-200">
            E-learning yang menghadirkan pendekatan berbasis VAKT (Visual, Auditory, Kinesthetic, dan Tactile) dengan sentuhan khusus dari budaya lokal. Melalui program ini, kami bertekad meningkatkan kemampuan CALISTUNG (membaca, menulis, dan menghitung) siswa tunagrahita sedang di SLB YPAC Makassar
          </p>
        </Slide>
        <div className="md:flex hidden gap-3">
          <Slide direction="up">
            <Button className="w-fit bg-secondColor hover:bg-secondColor text-white">Courses</Button>
          </Slide>
          <Slide direction="up">
            <Button className="w-fit bg-transparent hover:bg-secondColor border-secondColor border text-white">Tutorials</Button>
          </Slide>
        </div>
      </div>

      <Bounce delay={500}>
        <Image
          alt={'Logo Robo Edu'}
          width={0}
          height={0}
          src={'/maskot/maskot.png'}
          className={'w-full md:w-[600px] h-fit mt-7'}
        />
      </Bounce>
      <Slide direction="up">
        <Button className="w-fit ml-3 md:hidden bg-secondColor hover:bg-secondColor text-white">Courses</Button>
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
    <section className="w-full h-fit px-3 py-16 bg-white flex items-center justify-center md:flex-row flex-col text-center gap-5">
      {
        coreValues.map((coreValue, index) => (
          <Slide direction="up" key={index} duration={500 * index} delay={200 * index}>
            <div className="flex items-center justify-center flex-col w-[230px] md:w-[280px] rounded-lg shadow-md h-fit px-3 py-10 gap-4">
              <Image
                key={index}
                alt={coreValue.value}
                title={coreValue.value}
                width={0}
                height={0}
                src={`/illustrations/${coreValue.img}`}
                className={'w-20 md:w-36 h-fit'}
                priority
              />
              <p className="text-center text-sm md:text-base font-semibold leading-[100%]">{coreValue.value}</p>
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
      <h1 className='font-bold text-black text-2xl md:text-4xl'>Who Are We</h1>
      <h2 className='text-secondColor md:text-xl'>Platform Edukasi <br className="md:hidden" />Anak Tunagrahita</h2>
      <p className='text-gray-700 text-sm md:text-base md:max-w-4xl md:mx-auto'>
        Fokus dan tujuan dari Robo Edu adalah membantu anak tunagrahita sedang yang memiliki IQ 30-50 dalam pengembangan pola pikirnya melalui metode VAKT (Visual, Auditif, Kinestetik, Taktil)
      </p>
    </section>
  )
}