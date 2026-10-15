import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    id: "metric-one",
    value: "58%",
    label: "Increase in pick up point use",
    className: "metric--lime",
  },
  {
    id: "metric-two",
    value: "23%",
    label: "Decreased in customer phone calls",
    className: "metric--blue",
  },
  {
    id: "metric-three",
    value: "27%",
    label: "Increase in pick up point use",
    className: "metric--dark",
  },
  {
    id: "metric-four",
    value: "40%",
    label: "Decreased in customer phone calls",
    className: "metric--orange",
  },
];

const headline = "WELCOME ITZFIZZ";

export default function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const metricsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;

    if (!section || !track || !road || !car || !trail) return;

    const ctx = gsap.context(() => {
      const getTravel = () => {
        // End with the car's nose/body slightly beyond the viewport edge.
        const image = car.querySelector("img");
        const carWidth = image?.getBoundingClientRect().width ?? 0;
        return window.innerWidth - car.getBoundingClientRect().left - carWidth * 0.22;
      };

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.45)}`,
          scrub: 0.65,
          pin: track,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(car, { x: getTravel, duration: 1 }, 0);
      timeline.to(
        trail,
        {
          width: () => {
            const carWidth = car.getBoundingClientRect().width;
            const startLeft = car.offsetLeft;
            const endLeft = startLeft + getTravel();

            return `${endLeft + carWidth * 0.22}px`;
          },
          duration: 1,
        },
        0,
      );

      // Letter reveals are tied to the same scroll timeline, so they reverse
      // naturally when the user scrolls upward.
      lettersRef.current.forEach((letter, index) => {
        if (!letter) return;
        const startAt = 0.025 + (index / headline.length) * 0.77;
        timeline.to(
          letter,
          { opacity: 1, y: 0, duration: 0.075 },
          startAt,
        );
      });

      // The four cards enter in two staggered rows, matching the reference.
      const cardStarts = [0.23, 0.58, 0.43, 0.78];
      metricsRef.current.forEach((card, index) => {
        if (!card) return;
        timeline.to(
          card,
          { opacity: 1, y: 0, scale: 1, duration: 0.15 },
          cardStarts[index],
        );
      });
    }, section);

    const carImage = car.querySelector("img");
    const refreshAfterImage = () => ScrollTrigger.refresh();
    if (carImage?.complete) refreshAfterImage();
    else carImage?.addEventListener("load", refreshAfterImage);

    return () => {
      carImage?.removeEventListener("load", refreshAfterImage);
      ctx.revert();
    };
  }, []);

  return (
    <main className="page-shell">
      <section className="hero-section" ref={sectionRef} aria-label="Itzfizz scroll animation">
        <div className="hero-track" ref={trackRef}>
          <div className="metric-layer" aria-label="Impact metrics">
            {metrics.map((metric, index) => (
              <article
                key={metric.id}
                ref={(node) => {
                  if (node) metricsRef.current[index] = node;
                }}
                className={`metric-card ${metric.className}`}
              >
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>

          <div className="road" ref={roadRef}>
            <div className="green-trail" ref={trailRef} />
            <h1 className="hero-headline" aria-label={headline}>
              {headline.split("").map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  aria-hidden="true"
                  ref={(node) => {
                    if (node) lettersRef.current[index] = node;
                  }}
                  className={character === " " ? "headline-space" : ""}
                >
                  {character === " " ? "\u00a0" : character}
                </span>
              ))}
            </h1>
            <div className="car-motion" ref={carRef}>
              <img
                className="hero-car"
                // Original asset from the supplied reference demo.
                src="https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png"
                alt="Orange sports car viewed from above"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}