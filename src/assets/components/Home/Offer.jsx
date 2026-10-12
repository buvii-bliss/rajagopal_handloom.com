
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../../Data/Product";
import logo from "../../img/logo.png";
const slides = [
  {
    eyebrow: "SPECIAL OFFERS",
    title: "Timeless Elegance at Special Prices",
    description:
      "Adorn yourself with the finest handloom sarees, crafted with tradition and care. Limited time offers, don't miss out!",
    category: "Sarees",
  },
  {
    eyebrow: "WOVEN WITH LOVE",
    title: "Tradition Meets Modern Elegance",
    description:
      "Discover beautiful handloom creations with exquisite designs and timeless craftsmanship.",
    category: "Wedding",
  },
  {
    eyebrow: "CELEBRATE IN STYLE",
    title: "Make Every Occasion Special",
    description:
      "Explore our handpicked festive collections and find something truly special for every celebration.",
    category: "New Arrivals",
  },
  {
    eyebrow: "EXCLUSIVE COLLECTION",
    title: "Beautiful Weaves, Beautiful Savings",
    description:
      "Find your favourite traditional styles and bring home the beauty of authentic handloom.",
    category: "Offers",
  },
];

export default function Offer() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const currentSlide = slides[active];

  const offerProducts = products.filter((product) => {
    const category = (product.category || "").toLowerCase();

    if (active === 0) {
      return (
        category.includes("saree") ||
        category.includes("silk") ||
        category.includes("wedding")
      );
    }

    if (active === 1) {
      return category.includes("wedding");
    }

    if (active === 2) {
      return category.includes("new arrivals");
    }

    return (
      category.includes("offer") ||
      category.includes("saree") ||
      category.includes("silk")
    );
  });

  const displayProducts = [
    ...offerProducts,
    ...products.filter((product) => !offerProducts.includes(product)),
  ].slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const shopOffers = () => {
    navigate("/menu", {
      state: { selectedCategory: currentSlide.category },
    });
  };

  const openCollection = () => {
    navigate("/menu", {
      state: { selectedCategory: currentSlide.category },
    });
  };

  return (
    <section className="w-full px-3 py-5 sm:px-5 lg:px-8">
      <div className="offer-banner relative mx-auto max-w-[1700px] overflow-hidden rounded-xl">
        {/* Decorative background */}
        <div className="offer-glow" />
        <div className="offer-pattern" />

        {/* Top brand */}
        <div className="relative z-10 px-5 pt-6 sm:px-9 sm:pt-8 lg:px-14 lg:pt-8">
        <div className="offer-brand">
  <img src={logo} alt="Rajagopal Handloom" height={20} className="offer-brand-logo"/>
</div>
        </div>

        {/* Main carousel content */}
        <div
          className="offer-content relative z-10 grid items-center gap-7 px-5 pb-14 pt-7 sm:px-9 lg:grid-cols-[0.95fr_1.25fr] lg:gap-8 lg:px-14 lg:pb-20 lg:pt-8"
          key={active}
        >
          {/* Left content */}
          <div className="offer-copy">
            <div className="mb-4 flex items-center gap-3">
              <span className="offer-rule" />
              <span className="offer-eyebrow">{currentSlide.eyebrow}</span>
              <span className="offer-rule" />
            </div>

            <h2 className="offer-heading">
              {currentSlide.title}
            </h2>

            <p className="offer-description">
              {currentSlide.description}
            </p>

            <button
              onClick={shopOffers}
              className="offer-cta group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5.2 5l.5 2H21l-2.1 7.1a2 2 0 0 1-1.9 1.4H8a2 2 0 0 1-1.9-1.5L3.4 3H1V1h4l.2 1H23l-3 12.7a4 4 0 0 1-3.9 2.8H8a4 4 0 0 1-3.9-3.1L1.1 5h4.1Z" />
              </svg>

              <span>Shop Exclusive Offers</span>

              <span className="text-xl transition-transform group-hover:translate-x-1">
                ›
              </span>
            </button>
          </div>

          {/* Right product cards */}
          <div className="offer-products">
            {displayProducts.map((product, index) => (
              <button
                type="button"
                key={product.id}
                onClick={openCollection}
                className={`offer-product-card offer-card-${index + 1}`}
                aria-label={`Explore ${product.name}`}
              >
                <div className="offer-product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />

                  <span className="offer-ribbon">
                    Special
                    <br />
                    Offer
                  </span>
                </div>

                <div className="offer-product-info">
                  <h3 title={product.name}>{product.name}</h3>

                  <div className="offer-price-row">
                    {product.originalPrice &&
                      Number(product.originalPrice) >
                        Number(product.price) && (
                        <span className="offer-old-price">
                          ₹
                          {Number(product.originalPrice).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}

                    <span className="offer-current-price">
                      ₹
                      {Number(product.price || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Previous arrow */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous offer"
          className="offer-arrow offer-arrow-left"
        >
          ‹
        </button>

        {/* Next arrow */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next offer"
          className="offer-arrow offer-arrow-right"
        >
          ›
        </button>

        {/* Carousel indicators */}
        <div className="offer-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to offer ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              className={`offer-dot ${
                active === index ? "offer-dot-active" : ""
              }`}
            />
          ))}
        </div>

        {/* Bottom gold border */}
        <div className="offer-bottom-border" />
      </div>

      <style>{`
        .offer-banner {
          color: #fff7e6;
          background:
            radial-gradient(ellipse at 70% 18%, rgba(145, 28, 37, .45), transparent 38%),
            linear-gradient(115deg, #350204 0%, #59060b 48%, #360306 100%);
          box-shadow: 0 12px 35px rgba(67, 4, 9, .18);
          isolation: isolate;
        }

        .offer-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .45;
          background:
            radial-gradient(circle at 90% 20%, rgba(225, 175, 64, .16), transparent 20%),
            radial-gradient(circle at 8% 90%, rgba(170, 25, 39, .3), transparent 30%);
        }

        .offer-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .1;
          background-image:
            repeating-linear-gradient(45deg, transparent 0 30px, rgba(230, 184, 84, .08) 31px, transparent 32px 60px);
          mask-image: linear-gradient(90deg, transparent, black 60%, black);
        }

        .offer-brand {
          display: flex;
          width: fit-content;
          flex-direction: column;
          align-items: center;
          color: #f4c75e;
          line-height: 1;
        }

        .offer-brand-name {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(2.2rem, 4vw, 4.2rem);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1;
          text-shadow: 0 2px 1px #6b3009, 0 0 18px rgba(235, 180, 52, .18);
        }

        .offer-brand-subtitle {
          margin-top: 7px;
          font-family: Georgia, serif;
          font-size: 12px;
          letter-spacing: .42em;
        }

        .offer-brand-caption {
          margin-top: 7px;
          font-size: 7px;
          letter-spacing: .25em;
        }

        .offer-content {
          animation: offerFadeIn .55s ease both;
        }

        @keyframes offerFadeIn {
          from { opacity: .4; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .offer-copy {
          min-width: 0;
          padding-left: 0;
        }

        .offer-eyebrow {
          color: #f2ca68;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .32em;
          text-align: center;
          white-space: nowrap;
        }

        .offer-rule {
          width: 40px;
          height: 1px;
          flex-shrink: 0;
          background: linear-gradient(90deg, transparent, #e8bd55);
        }

        .offer-rule:last-child {
          transform: rotate(180deg);
        }

        .offer-heading {
          max-width: 620px;
          color: #fff8e9;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 37px;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -.025em;
          text-wrap: balance;
        }

        .offer-description {
          max-width: 540px;
          margin-top: 16px;
          color: #f7e6d5;
          font-size: 15px;
          line-height: 1.8;
        }

        .offer-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
          padding: 13px 22px;
          border: 1px solid #dcb44d;
          border-radius: 999px;
          color: #fff0c9;
          background: rgba(47, 0, 4, .35);
          font-family: Georgia, serif;
          font-size: 15px;
          font-weight: 700;
          transition: background .25s, box-shadow .25s, transform .25s;
        }

        .offer-cta:hover {
          transform: translateY(-2px);
          background: #a46d13;
          box-shadow: 0 5px 20px rgba(0, 0, 0, .2);
        }

        .offer-products {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .offer-product-card {
          min-width: 0;
          overflow: hidden;
          border: 3px solid #d7ad4d;
          border-radius: 12px;
          background: #fff3dc;
          box-shadow: 0 10px 25px rgba(0, 0, 0, .25);
          color: #641217;
          text-align: center;
          transition: transform .3s, box-shadow .3s;
        }

        .offer-product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 32px rgba(0, 0, 0, .32);
        }

        .offer-card-1,
        .offer-card-3 {
          transform: translateY(12px) rotate(-1deg);
        }

        .offer-card-3 {
          transform: translateY(8px) rotate(1deg);
        }

        .offer-card-1:hover {
          transform: translateY(2px) rotate(0);
        }

        .offer-card-3:hover {
          transform: translateY(0) rotate(0);
        }

        .offer-product-image {
          position: relative;
          height: clamp(155px, 19vw, 285px);
          overflow: hidden;
          background: #ead7b7;
        }

        .offer-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .45s;
        }

        .offer-product-card:hover .offer-product-image img {
          transform: scale(1.05);
        }

        .offer-ribbon {
          position: absolute;
          top: 0;
          left: 0;
          padding: 9px 10px;
          border-radius: 0 0 8px 0;
          color: #55100b;
          background: #f5d681;
          font-family: Georgia, serif;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.2;
        }

        .offer-product-info {
          padding: 11px 7px 13px;
          background: linear-gradient(180deg, #fff8eb, #f8e8cc);
        }

        .offer-product-info h3 {
          overflow: hidden;
          color: #671419;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(11px, 1vw, 16px);
          font-weight: 700;
          line-height: 1.35;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .offer-price-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 9px;
        }

        .offer-old-price {
          color: #9c9182;
          font-size: 12px;
          text-decoration: line-through;
        }

        .offer-current-price {
          color: #971e22;
          font-size: clamp(14px, 1.25vw, 21px);
          font-weight: 900;
        }

        .offer-arrow {
          position: absolute;
          z-index: 20;
          top: 54%;
          display: flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border: 1px solid #e4bd63;
          border-radius: 50%;
          color: #f5d47e;
          background: rgba(44, 0, 3, .45);
          font-family: Georgia, serif;
          font-size: 30px;
          line-height: 1;
          transition: background .2s, color .2s;
        }

        .offer-arrow:hover {
          color: #40050a;
          background: #f0c65f;
        }

        .offer-arrow-left { left: 14px; }
        .offer-arrow-right { right: 14px; }

        .offer-indicators {
          position: absolute;
          z-index: 20;
          bottom: 17px;
          left: 50%;
          display: flex;
          align-items: center;
          gap: 10px;
          transform: translateX(-50%);
        }

        .offer-dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: rgba(255, 235, 207, .45);
          transition: width .25s, background .25s;
        }

        .offer-dot-active {
          width: 30px;
          background: #f2ce71;
        }

        .offer-bottom-border {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #b47a24, #f4d37d, #9b6419, transparent);
        }

        @media (min-width: 1024px) {
          .offer-content {
            padding-left: 7.5%;
            padding-right: 7.5%;
          }

          .offer-arrow-left { left: 20px; }
          .offer-arrow-right { right: 20px; }
        }

        @media (max-width: 1023px) {
          .offer-products {
            gap: 10px;
          }

          .offer-product-image {
            height: clamp(150px, 27vw, 250px);
          }

          .offer-heading {
            max-width: 700px;
          }
        }

        @media (max-width: 639px) {
          .offer-banner {
            border-radius: 12px;
          }

          .offer-brand {
            margin: 0 auto;
          }

          .offer-brand-name {
            font-size: 2.55rem;
          }

          .offer-brand-subtitle {
            font-size: 10px;
          }

          .offer-brand-caption {
            font-size: 6px;
          }

          .offer-content {
            gap: 23px;
            padding: 25px 20px 58px;
          }

          .offer-copy {
            text-align: center;
          }

          .offer-copy > div:first-child {
            justify-content: center;
            gap: 8px;
          }

          .offer-eyebrow {
            font-size: 10px;
            letter-spacing: .2em;
          }

          .offer-rule {
            width: 22px;
          }

          .offer-heading {
            font-size: clamp(2rem, 9vw, 2.8rem);
            line-height: 1.1;
          }

          .offer-description {
            margin: 13px auto 0;
            font-size: 13px;
            line-height: 1.65;
          }

          .offer-cta {
            gap: 8px;
            margin-top: 19px;
            padding: 11px 16px;
            font-size: 13px;
          }

          .offer-products {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 7px;
          }

          .offer-product-card,
          .offer-card-1,
          .offer-card-3 {
            transform: none;
            border-width: 2px;
            border-radius: 8px;
          }

          .offer-product-card:hover,
          .offer-card-1:hover,
          .offer-card-3:hover {
            transform: translateY(-3px);
          }

          .offer-product-image {
            height: clamp(105px, 34vw, 175px);
          }

          .offer-ribbon {
            top: 0;
            left: 0;
            padding: 5px 4px;
            font-size: 8px;
          }

          .offer-product-info {
            padding: 7px 4px 9px;
          }

          .offer-product-info h3 {
            display: -webkit-box;
            overflow: hidden;
            font-size: 10px;
            line-height: 1.3;
            white-space: normal;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .offer-price-row {
            flex-direction: column;
            gap: 2px;
            margin-top: 5px;
          }

          .offer-old-price {
            font-size: 9px;
          }

          .offer-current-price {
            font-size: 12px;
          }

          .offer-arrow {
            top: 48%;
            width: 30px;
            height: 30px;
            font-size: 22px;
          }

          .offer-arrow-left { left: 5px; }
          .offer-arrow-right { right: 5px; }

          .offer-indicators {
            bottom: 15px;
            gap: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .offer-content {
            animation: none;
          }

          .offer-product-card,
          .offer-product-image img,
          .offer-cta,
          .offer-dot {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
