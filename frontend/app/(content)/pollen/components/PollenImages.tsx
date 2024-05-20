/* eslint-disable @next/next/no-img-element */

const images = {
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
    "Meadow foxtail": [
        <PollenImage
            key={1}
            src="https://www.paldat.org/pic/1022701.jpg"
            c="Sam, S."
            l="Alopecurus pratensis - inflorescence picture"
        />,

        <PollenImage
            key={2}
            src="https://www.paldat.org/pic/2014059.jpg"
            c="Auer, W."
            l="Alopecurus pratensis - hydrated pollen"
        />,
    ],
}

function PollenImage({ l: imageLabel, src, c: photographerCredit }: any) {
    return (
        <figure>
            <figcaption>{imageLabel}</figcaption>
            <a href={src} target="_blank">
                <div className="img-container">
                    <img src={src} alt={`${imageLabel} picture`} />
                </div>
            </a>
            <figcaption>
                Photographer: {photographerCredit} <br />
                PalDat (2000 onwards, www.paldat.org).
            </figcaption>
        </figure>
    )
}

export default images
