/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import WattleAcaciaImage from "./localImages/Wattle Acacia.jpg"
import NativeBeechImage from "./localImages/Native beech.png"
import NativePodocarpImage from "./localImages/Native podocarp.png"

const images = {
    // grasses
    Ryegrass: [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1017993.jpg"
            c="Schneider, H."
            l="flowers of Lolium perenne"
        />,

        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1011815.jpg"
            c="Halbritter, H."
            l="Lolium perenne - equatorial view"
        />,
    ],
    "Timothy grass": [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1021583.jpg"
            c="Diethart, B."
            l="Phleum pratense - flowers"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1021588.jpg"
            c="Diethart, B."
            l="Phleum pratense - polar view"
        />,
    ],
    "Meadow foxtail": [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1022701.jpg"
            c="Sam, S."
            l="Alopecurus pratensis - inflorescence picture"
        />,

        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1022707.jpg"
            c="Sam, S."
            l="Alopecurus pratensis - equatorial view"
        />,
    ],
    // trees
    Pine: [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1016879.jpg"
            c="Halbritter, H."
            l="Pinus heldreichii - male cone(s)"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1016882.jpg"
            c="Halbritter, H."
            l="Pinus heldreichii - equatorial view"
        />,
    ],
    Birch: [
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1021409.jpg"
            c="Diethart, B."
            l="Betula pendula - flowers"
        />,
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1012132.jpg"
            c="Halbritter, H."
            l="Betula pendula - polar view"
        />,
    ],

    Oak: [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1021473.jpg"
            c="Diethart, B."
            l="Quercus robur - flowers"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1021478.jpg"
            c="Diethart, B."
            l="Quercus robur - polar view"
        />,
    ],
    "Cypresses and cedars": [
        <PollenImage
            key={1}
            src="https://pollen.tstebler.ch/MediaWiki/images/thumb/2/23/VCupressus_macnabiana.JPG/360px-VCupressus_macnabiana.JPG"
            // c="Stebler, Th."
            l="Cupressus macrocarpa - flowers"
            citation="Pollenwiki (Stebler Th., Cupressus macnabiana , In: Pollen Wiki (May 15, 2024), https://pollen.tstebler.ch/MediaWiki/index.php?title=Cupressus_macnabiana ."
        />,
        <PollenImage
            key={2}
            src="https://pollen.tstebler.ch/MediaWiki/images/a/a9/Cupressus_macnabiana_Shedding.jpg"
            // c="Stebler, Th."
            l="Cupressus macrocarpa - under microscope"
            citation="Pollenwiki (Stebler Th., Cupressus macnabiana , In: Pollen Wiki (May 15, 2024), https://pollen.tstebler.ch/MediaWiki/index.php?title=Cupressus_macnabiana ."
        />,
    ],
    Wattle: [<PollenImage key={1} src={WattleAcaciaImage} c="Kat Holt" l="Wattle (Acacia)" local citation />, <></>],
    Alder: [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1012533.jpg"
            c="Halbritter, H."
            l="Alnus glutinosa - inflorescence(s)"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1022555.jpg"
            c="Sam, S."
            l="Alnus glutinosa - equatorial view"
        />,
    ],
    "Native beech": [<PollenImage key={1} src={NativeBeechImage} c="Kat Holt" l="" local citation />, <></>],
    Elm: [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1017475.jpg"
            c="Halbritter, H."
            l="Ulmus glabra - dry pollen grains"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1017472.jpg"
            c="Halbritter, H."
            l="Ulmus glabra - equatorial view"
        />,
    ],
    "Maples, Sycamores (Acer)": [
        <PollenImage key={1} src="https://www.paldat.org/pic/1022605.jpg" c="Sam, S." l="Acer saccharinum - flowers" />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1022611.jpg"
            c="Sam, S."
            l="Acer saccharinum - equatorial view"
        />,
    ],
    "Native podocarps (Rimu, Totara, Matai, etc.)": [
        <PollenImage key={1} src={NativePodocarpImage} c="Kat Holt" local citation />,
        <></>,
    ],

    Olive: [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1018079.jpg"
            c="Halbritter, H."
            l="Olea europaea - dry pollen grains"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1018075.jpg"
            c="Halbritter, H."
            l="Olea europaea - equatorial view"
        />,
    ],

    // weeds / herbs

    Fathen: [
        <PollenImage key={1} src="https://www.paldat.org/pic/1021676.jpg" c="Diethart, B." l="Chenopodium - flowers" />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1021681.jpg"
            c="Diethart, B."
            l="Chenopodium - hydrated pollen grain"
        />,
    ],
    "Docs & sorrels": [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1012268.jpg"
            c="Halbritter, H."
            l="Rumex acetosella - flowers"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1012269.jpg"
            c="Halbritter, H."
            l="Rumex acetosella - polar view"
        />,
    ],
    Plantain: [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1206736.jpg"
            c="Ulrich, S."
            l="Plantago lanceolata - inflorescence(s)"
        />,
        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/1211845.jpg"
            c="Ulrich, S."
            l="Plantago lanceolata - hydrated pollen"
        />,
    ],
}

function PollenImage({ l: imageLabel, src, c: photographerCredit, local, citation }: any) {
    return (
        <figure>
            <figcaption>{imageLabel}</figcaption>
            {typeof src === "string" ? (
                <a href={src} target="_blank">
                    <div className="img-container">
                        {local ? (
                            <Image src={src} alt={`${imageLabel} picture`} />
                        ) : (
                            <img src={src} alt={`${imageLabel} picture`} />
                        )}
                    </div>
                </a>
            ) : (
                <div className="img-container">
                    {local ? (
                        <Image src={src} alt={`${imageLabel} picture`} />
                    ) : (
                        <img src={src} alt={`${imageLabel} picture`} />
                    )}
                </div>
            )}
            <figcaption>
                {photographerCredit && (
                    <>
                        Photographer: {photographerCredit} <br />
                    </>
                )}
                {citation || "PalDat (2000 onwards, www.paldat.org)."}
            </figcaption>
        </figure>
    )
}

export default images
