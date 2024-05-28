export default function ImageSlider({ img1, img2, selected }: any) {
    return (
        <div className={`w-full slider-images flex items-center gap-8 mt-4 px-16 ${selected ? "" : "hidden"}`}>
            {img1}
            {img2}
        </div>
    )
}
