import Image from "next/image";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const fetchData = async (pathname) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/products?filters[slug][$eq]=${pathname}&populate=*`,
      {
        method: "GET",
        // headers: {
        //   Authorization:
        //     "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
        // },
      }
    );
    const data = await res.json();
    return data.data[0];
  } catch (error) {
    console.log(error);
  }
};

export default ({ params }) => {
  const [swiper, setSwiper] = React.useState(null);

  React.useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (params && params.slug) {
        const fetchedData = await fetchData(params.slug);
      }
    };

    fetchDataAndUpdateState();
  }, [params]);

  return (
    <div>
      <div className="title_banner2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Best seller
        </span>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
        autoplay={{ delay: 3000 }}
      >
        {/* <SwiperSlide>
          <Image
            src="/assets/images/cake15.jpg"
            alt="picture"
            width={200}
            height={200}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/images/cake1.jpg"
            alt="picture"
            width={200}
            height={200}
          />
        </SwiperSlide> */}
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/cookie10.jpg"
              alt="Cookie"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>Milk Cookie</p>
              <p>$5.00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/cake2.jpg"
              alt="Cake"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>Animal Cake</p>
              <p>$16.00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/macaron9.jpg"
              alt="Macaron"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>Yello Macaron</p>
              <p>$6.00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/cake6.jpg"
              alt="Cake"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>Strawberry Cake</p>
              <p>$9.00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/macaron2.jpg"
              alt="Macaron"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>Christmas Macaron</p>
              <p>$6.00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/cookie4.jpg"
              alt="Cookie"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>Candy Cake</p>
              <p>$12.00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/macaron8.jpg"
              alt="Macaron"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>Chicken Macaron</p>
              <p>$6.00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="product-slide">
            <Image
              src="/images/cake13.jpg"
              alt="Cake"
              width={200}
              height={200}
            />
            <div className="product-info">
              <p>White Dog Cake</p>
              <p>$27.00</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
