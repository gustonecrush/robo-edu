import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Brands() {
    const brands = [
        { name: 'Kemendikubristekdikti', img: 'logo-1.png' },
        { name: 'PKM', img: 'logo-2.png' },
        { name: 'Simbelmawa', img: 'logo-3.png' },
        { name: 'Universitas Muslim Indonesia', img: 'logo-4.png' },
        { name: 'Yayasan Pembinaan Anak Cacat', img: 'logo-5.png' },
        { name: 'Robo Edu', img: 'logo-6.png' },

    ]
    return (
        <section className="w-full h-fit px-3 justify-center py-5 flex-wrap flex gap-5 items-center">
            <Marquee speed={50}>  <Image
                key={brands[0].name}
                alt={brands[0].name}
                title={brands[0].name}
                width={0}
                height={0}
                src={`/logos/${brands[0].img}`}
                className={'w-10 h-fit ml-5'}
            />
                <Image
                    key={brands[1].name}
                    alt={brands[1].name}
                    title={brands[1].name}
                    width={0}
                    height={0}
                    src={`/logos/${brands[1].img}`}
                    className={'w-16 h-fit ml-5'}
                />
                <Image
                    key={brands[2].name}
                    alt={brands[2].name}
                    title={brands[2].name}
                    width={0}
                    height={0}
                    src={`/logos/${brands[2].img}`}
                    className={'w-20 h-fit ml-5'}
                />
                <Image
                    key={brands[3].name}
                    alt={brands[3].name}
                    title={brands[3].name}
                    width={0}
                    height={0}
                    src={`/logos/${brands[3].img}`}
                    className={'w-10 h-fit ml-5'}
                />
                <Image
                    key={brands[4].name}
                    alt={brands[4].name}
                    title={brands[4].name}
                    width={0}
                    height={0}
                    src={`/logos/${brands[4].img}`}
                    className={'w-10 h-fit ml-10'}
                />
                <Image
                    key={brands[5].name}
                    alt={brands[5].name}
                    title={brands[5].name}
                    width={0}
                    height={0}
                    src={`/logos/${brands[5].img}`}
                    className={'w-24 h-fit ml-5'}
                /></Marquee>

        </section>
    )
}