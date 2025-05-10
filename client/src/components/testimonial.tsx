import { useEffect } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

export default function Testimonial() {
  useEffect(() => {
    const keenSlider = new KeenSlider("#keen-slider", {
      loop: true,
      slides: {
        origin: "center",
        perView: 1.2,
        spacing: 20,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 2.5,
            spacing: 30,
          },
        },
      },
    });

    document.getElementById("keen-slider-previous")?.addEventListener("click", () => keenSlider.prev());
    document.getElementById("keen-slider-next")?.addEventListener("click", () => keenSlider.next());

    return () => keenSlider.destroy();
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 lg:max-w-2xl leading-tight">
            What Our Clients Say
          </h2>
          <div className="mt-6 flex gap-4 lg:mt-0">
            <button
              id="keen-slider-previous"
              className="rounded-full border border-blue-600 p-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
              aria-label="Previous slide"
            >
              &#8592;
            </button>
            <button
              id="keen-slider-next"
              className="rounded-full border border-blue-600 p-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>
        </div>

        <div className="-mx-6 lg:mx-0">
          <div id="keen-slider" className="keen-slider">
            {reviews.map((review, index) => (
              <div key={index} className="keen-slider__slide">
                <blockquote className="flex h-full flex-col justify-between bg-white p-8 shadow-lg rounded-xl">
                  <div>
                    <div className="flex gap-1 text-yellow-400">{Array(review.rating).fill("★").join("")}</div>
                    <h3 className="mt-4 text-2xl font-semibold text-blue-600">{review.title}</h3>
                    <p className="mt-3 text-gray-700">{review.text}</p>
                  </div>
                  <footer className="mt-6 text-sm font-medium text-gray-700">&mdash; {review.author}</footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    rating: 5,
    title: "Game-Changer for Compliance",
    text: "PlayPolicyChecker helped us identify violations we didn’t even know existed. It saved us from a potential app suspension. Absolutely essential for Android developers!",
    author: "Liam Turner, Lead Developer at AppHive",
  },
  {
    rating: 5,
    title: "Peace of Mind, Finally",
    text: "As a solo developer, I used to dread Google Play policy updates. Now I just run a scan and get actionable insights. The peace of mind is worth every penny.",
    author: "Ayesha Khan, Indie App Creator",
  },
  {
    rating: 4,
    title: "Solid Tool with Great Potential",
    text: "The tool is impressive and improving fast. It flagged key compliance risks and helped us improve our privacy practices. Looking forward to future features.",
    author: "Jasper Lee, CTO at NextWave Mobile",
  },
  {
    rating: 5,
    title: "Efficient and Accurate",
    text: "We integrated PlayPolicyChecker into our QA process. It's fast, accurate, and has made our review cycles much smoother.",
    author: "Isabella Martinez, QA Manager at SoftForge",
  },
  {
    rating: 5,
    title: "Must-Have for App Teams",
    text: "Google Play policy compliance used to be a black box. This tool brings much-needed clarity. It’s become a core part of our app launch checklist.",
    author: "Raj Patel, Product Owner at Cloudware Studios",
  },
];

