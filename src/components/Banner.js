import { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";

// register Swiper custom elements
register();

export default function Banner() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null; // Không render gì nếu component chưa được mount
  }
  return (
    <div>
      <swiper-container>
        <swiper-slide>
          <div>
            <div className="swiper-slide">
              <img className="slide-image" src="https://skins.minimog.co/cdn/shop/files/cake_slide_1.jpg" alt="Cake slide" />
              <div className="swiper-slide-transform">
                <div className="slide-content">
                  <h4 className="heading-title">
                    Little bliss in every bite
                  </h4>
                  <p>
                    Special fluffiness for your loved one! A thoughtful
                    expression through good food and warm experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div className="swiper-slide">
              <img className="slide-image" src="https://skins.minimog.co/cdn/shop/files/cake_slide_2.jpg" alt="Cake slide 2" />
              <div className="swiper-slide-transform">
                <div className="slide-content">
                  <h4 className="heading-title">
                    Little bliss in every bite
                  </h4>
                  <p>
                    Special fluffiness for your loved one! A thoughtful
                    expression through good food and warm experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div className="swiper-slide">
              <img className="slide-image" src="https://skins.minimog.co/cdn/shop/files/cake_slide_3.jpg" />
              <div className="swiper-slide-transform">
                <div className="slide-content">
                  <h4 className="heading-title">
                    Little bliss in every bite
                  </h4>
                  <p>
                    Special fluffiness for your loved one! A thoughtful
                    expression through good food and warm experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  );
}
