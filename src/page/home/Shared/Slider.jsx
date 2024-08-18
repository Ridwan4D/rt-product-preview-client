import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
    const slideImages = [
        {
            img: "https://i.ibb.co/rc0b5t9/download-2.jpg"
        },
        {
            img: "https://i.ibb.co/PT6b8N0/226090945.jpg"
        },
        {
            img: "https://i.ibb.co/kBJTvx3/images-5.jpg"
        }
    ]
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                //   navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper">
                {
                    slideImages.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                src={slide.img}
                                alt={`slide ${idx + 1}`}
                                className="w-full max-h-[500px] h-[40vh] md:h-auto"
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </>
    );
};

export default Slider;