"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
];

type PortfolioSearchItem = {
  title: string;
  category: string;
  summary: string;
  href: string;
  keywords: string[];
};

const portfolioSearchItems: PortfolioSearchItem[] = [
  {
    title: "Electrical Design & BIM",
    category: "Engineering Projects",
    summary: "Revit MEP, AutoCAD Electrical, lighting, power, MCC and coordinated drawing work.",
    href: "#project-group-design",
    keywords: ["electrical design", "bim", "revit mep", "autocad", "autocad electrical", "mcc", "lighting", "panel layout"],
  },
  {
    title: "Power Systems & Protection",
    category: "Engineering Projects",
    summary: "Load flow, short circuit, voltage stability, N-1 contingency and protection studies.",
    href: "#project-group-power",
    keywords: ["power systems", "protection", "load flow", "short circuit", "voltage stability", "n-1", "etap", "psat"],
  },
  {
    title: "ETAP Relay Coordination",
    category: "Power-System Protection",
    summary: "Six-position overcurrent coordination with approximately 0.4 s grading intervals.",
    href: "#technical-project-02",
    keywords: ["etap", "relay coordination", "overcurrent", "fault analysis", "protection"],
  },
  {
    title: "Revit MEP Electrical Parking Design",
    category: "Electrical Design & BIM",
    summary: "A 12-sheet coordinated package covering seven electrical and low-voltage systems.",
    href: "#technical-project-03",
    keywords: ["revit mep", "electrical design", "bim", "fire alarm", "security", "conduit", "cable tray"],
  },
  {
    title: "AutoCAD Electrical MCC & Panel Layout",
    category: "Electrical Design",
    summary: "Motor-control schematics, component tagging, wire numbering and panel-layout documentation.",
    href: "#technical-project-05",
    keywords: ["autocad electrical", "mcc", "motor control", "panel layout", "schematic", "electrical drawings"],
  },
  {
    title: "Batteries, EVs & Power Conversion",
    category: "Engineering Projects",
    summary: "Battery swapping, battery studies, EV charging, PMSM control and isolated converters.",
    href: "#project-group-battery",
    keywords: ["ev batteries", "battery", "energy storage", "ev charging", "power conversion", "pmsm", "bms"],
  },
  {
    title: "60 V Battery Swapping Station",
    category: "Battery Systems",
    summary: "Physical prototype with protected charging, monitoring, secure bays and thermal cut-off.",
    href: "#technical-project-06",
    keywords: ["battery swapping", "lithium-ion", "charging protection", "thermal monitoring", "prototype validation", "battery safety"],
  },
  {
    title: "EV Charging & Power Conversion",
    category: "Graduate Engineering Projects",
    summary: "CC-CV charging, onboard charging, active power decoupling and DAB or SAB conversion.",
    href: "#technical-project-09",
    keywords: ["ev charging", "cc-cv", "onboard charger", "obc", "active power decoupling", "dab", "sab"],
  },
  {
    title: "Generation Economics & Dispatch",
    category: "Power-System Economics",
    summary: "Constrained dispatch, incremental cost, tariffs, transmission losses and penalty factors.",
    href: "#technical-project-13",
    keywords: ["economic dispatch", "generation economics", "incremental cost", "tariffs", "transmission losses", "penalty factors"],
  },
  {
    title: "Distribution, Lighting & Utilization",
    category: "Electrical Utilization",
    summary: "Lighting, feeders, distribution boards, electric traction and industrial heating calculations.",
    href: "#technical-project-14",
    keywords: ["lighting", "distribution", "feeders", "distribution boards", "electric traction", "industrial heating"],
  },
  {
    title: "Renewable Energy & Sustainability",
    category: "Engineering Projects",
    summary: "Solar PV, wind-turbine design, energy analysis and sustainable-building studies.",
    href: "#project-group-renewable",
    keywords: ["renewable energy", "solar pv", "wind energy", "qblade", "pv", "sustainability", "energy analysis"],
  },
  {
    title: "Professional Experience",
    category: "Industry Experience",
    summary: "Energy analysis, project coordination, supplier management, procurement and technical operations.",
    href: "#experience",
    keywords: ["project coordination", "supplier management", "supplier quality", "procurement", "vendor management", "technical operations", "energy analysis"],
  },
  {
    title: "Engineering Expertise",
    category: "Skills & Tools",
    summary: "Verified electrical, analytical, project and technical operations capabilities.",
    href: "#expertise",
    keywords: ["matlab", "simulink", "excel", "power bi", "power query", "project management", "technical skills"],
  },
  {
    title: "Certifications & Training",
    category: "Professional Development",
    summary: "Honour Roll recognition, electrical design, power distribution, renewable energy, AI, procurement and OSPE membership evidence.",
    href: "#certifications",
    keywords: ["certifications", "training", "honour roll", "academic recognition", "ospe", "professional membership", "generative ai", "procurement", "schneider electric"],
  },
];

const popularSearchKeywords = [
  "Electrical Design",
  "Power Systems",
  "EV Batteries",
  "Project Coordination",
  "Supplier Management",
  "Procurement",
];

type FeaturedMetric = {
  value: string;
  label: string;
  note?: string;
};

type FeaturedMedia = {
  src: string;
  alt: string;
  caption: string;
};

type FeaturedItem = {
  category: string;
  title: string;
  description: string;
  highlights: string[];
  tools: string[];
  metrics?: FeaturedMetric[];
  media?: FeaturedMedia[];
  links?: { label: string; href: string }[];
};

const featuredItems: FeaturedItem[] = [
  {
    category: "Professional Energy Analysis",
    title: "Ontario Electricity Market & Facility Cost Analysis",
    description:
      "Built a three-year Ontario electricity-price forecast and facility billing model using IESO and Hydro One data. The work also supported incentive, solar-supplier and PPA or VPPA analysis for senior decision-making.",
    highlights: ["Ontario market", "Facility billing", "Renewable procurement"],
    tools: ["IESO", "Hydro One", "Forecasting", "Billing models"],
    metrics: [
      { value: "3 years", label: "Electricity-price forecast" },
      { value: "9.89", label: "Forecast MAE", note: "$/MWh" },
      { value: "$50M+", label: "CAD incentives identified" },
      { value: "14 + 11", label: "Solar suppliers + PPA/VPPA studies" },
    ],
  },
  {
    category: "Supplier Quality & Technical Operations",
    title: "Telecom Supplier and Process Improvement",
    description:
      "Combined technical vendor management, issue resolution and process improvement across supplier and field operations. The work linked supplier quality, corrective actions, equipment recovery and measurable operational results.",
    highlights: ["Supplier quality", "Corrective actions", "Process improvement"],
    tools: ["Technical review", "SOPs", "RACI", "Action tracking"],
    metrics: [
      { value: "84%", label: "Supplier issues resolved", note: "of 433 issues" },
      { value: "Up to 66%", label: "Downtime reduction", note: "across 53 teams" },
      { value: "103K", label: "Devices recycled or refurbished" },
      { value: "≈US$120K", label: "Savings" },
    ],
  },
  {
    category: "Power Systems",
    title: "Modified IEEE 14-Bus Power-System Analysis",
    description:
      "Led a two-person graduate project covering load flow, sequence-network fault calculations, voltage stability, N-1 contingency and transfer-capability analysis on a modified IEEE 14-bus system.",
    highlights: ["57.25 MW N-1 secure ATC", "39.873 kA three-phase fault", "8-iteration power flow"],
    tools: ["PSAT", "MATLAB", "Simulink", "Continuation power flow"],
    media: [
      {
        src: "/assets/featured/power-system-pv.png",
        alt: "PV curves at Bus 11 comparing the base case and a Line 2-4 outage",
        caption: "Bus 11 PV curves showing the reduced voltage-stability margin after the Line 2-4 outage.",
      },
    ],
    links: [{ label: "View Project Report", href: "/reports/ieee-14-bus-project-report.pdf" }],
  },
  {
    category: "EV Batteries & Charging Systems",
    title: "60 V Battery Swapping Station for Electric Scooters",
    description:
      "Led a four-person capstone team from electrical design and battery-system integration through prototype validation. The station combined protected charging bays, voltage and temperature monitoring, secure locking and automated charging control.",
    highlights: ["Physical prototype", "45°C charging cut-off", "117-page thesis"],
    tools: ["ETAP", "AutoCAD", "Lithium-ion Battery System", "Charging Protection", "Voltage & Temperature Monitoring", "Prototype Validation"],
    media: [
      {
        src: "/assets/featured/battery-prototype.jpg",
        alt: "Completed battery swapping station prototype beside an electric scooter",
        caption: "Completed physical prototype with three battery bays and the electric scooter used for validation.",
      },
      {
        src: "/assets/featured/battery-schematic.png",
        alt: "Battery swapping station control and charging schematic",
        caption: "Control architecture linking battery sensors, protection relays, chargers and solenoid locks.",
      },
    ],
    links: [
      { label: "View Thesis", href: "/reports/battery-swapping-thesis.pdf" },
      { label: "View Schematic", href: "/reports/battery-system-schematic.pdf" },
    ],
  },
  {
    category: "Electrical Design & BIM",
    title: "Revit MEP Electrical Parking Design",
    description:
      "Developed and coordinated a 12-sheet electrical drawing set covering lighting, emergency lighting, fire alarm, security, receptacles, cable trays and conduit routing, including interference resolution and family modification.",
    highlights: ["12 drawing sheets", "7 electrical systems", "3D coordination"],
    tools: ["Revit MEP", "Electrical families", "Clash resolution", "Drawing production"],
    media: [
      {
        src: "/assets/featured/revit-3d.png",
        alt: "Revit MEP three-dimensional electrical conduit coordination sheet",
        caption: "3D electrical coordination view showing the routed conduit systems across the parking level.",
      },
      {
        src: "/assets/featured/revit-total-plan.png",
        alt: "Revit MEP coordinated total electrical conduit plan",
        caption: "Coordinated total conduit plan combining the electrical systems in one drawing.",
      },
      {
        src: "/assets/featured/revit-legend.png",
        alt: "Revit MEP electrical legends and drawing-sheet index",
        caption: "Project sheet index and electrical legends from the completed drawing package.",
      },
    ],
    links: [
      { label: "View Drawing Set", href: "/reports/revit-electrical-drawing-set.pdf" },
      { label: "View Certificate", href: "/certificates/revit-mep-electrical-certificate.pdf" },
    ],
  },
];

const impactStats = [
  { value: "93.13%", label: "MEng academic average", note: "University of Windsor | Honour Roll" },
  { value: "$50M+", label: "CAD incentives identified", note: "Energy and industrial opportunities" },
  { value: "103K", label: "Devices recovered", note: "Recycled or refurbished telecom equipment" },
  { value: "Up to 66%", label: "Downtime reduction", note: "Process improvement across 53 teams" },
];

const expertiseGroups = [
  {
    number: "01",
    title: "Power Systems & Analysis",
    description: "System modelling, fault studies, stability assessment and protection work across academic and applied engineering projects.",
    skills: ["ETAP", "PSAT", "MATLAB", "Simulink", "Power Flow", "Short-Circuit Analysis", "Voltage Stability", "N-1 Contingency", "Protection"],
    className: "expertise-power",
  },
  {
    number: "02",
    title: "Electrical Design",
    description: "Electrical drawings, coordinated building systems and design documentation from concept through drawing production.",
    skills: ["AutoCAD", "AutoCAD Electrical", "Revit MEP", "DIALux", "Electrical Layouts", "Wiring Diagrams", "Panel Drawings"],
    className: "expertise-design",
  },
  {
    number: "03",
    title: "Energy, Markets & Renewables",
    description: "Electricity-market research, cost modelling and renewable-energy evaluation supported by professional experience in Ontario's energy sector.",
    skills: ["Ontario Electricity Market", "IESO", "Hydro One", "Energy Forecasting", "Facility Billing", "Solar PV", "PPA/VPPA", "PVsyst", "QBlade"],
    className: "expertise-energy",
  },
  {
    number: "04",
    title: "Project, Supplier & Technical Operations",
    description: "Coordinated technical work across suppliers, procurement activities, corrective actions and cross-functional teams.",
    skills: ["Project Coordination", "Supplier Management", "Procurement Support", "Technical Vendor Management", "Tender Requirements", "SOP Development", "RACI", "Corrective Actions", "Supplier Performance"],
    className: "expertise-operations",
  },
  {
    number: "05",
    title: "Data & Engineering Tools",
    description: "Analysis, reporting and engineering software used to turn technical information into clear decisions and deliverables.",
    skills: ["Excel", "Power Query", "Power BI", "think-cell", "Microsoft Project", "SharePoint", "Proteus"],
    className: "expertise-tools",
  },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colour: string;
};

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000 };
    const colours = [
      "rgba(247, 249, 251, 0.74)",
      "rgba(219, 199, 176, 0.72)",
      "rgba(104, 139, 171, 0.66)",
    ];

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = true;

    const makeParticles = () => {
      const count = width < 720 ? 24 : Math.min(64, Math.floor(width / 22));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.16,
        vy: reducedMotion ? 0 : (Math.random() - 0.5) * 0.16,
        radius: index % 7 === 0 ? 1.65 : 1.1,
        colour: colours[index % colours.length],
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const neighbour = particles[j];
          const dx = particle.x - neighbour.x;
          const dy = particle.y - neighbour.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 126) {
            const opacity = (1 - distance / 126) * 0.13;
            context.beginPath();
            context.strokeStyle = `rgba(219, 227, 232, ${opacity})`;
            context.lineWidth = 0.7;
            context.moveTo(particle.x, particle.y);
            context.lineTo(neighbour.x, neighbour.y);
            context.stroke();
          }
        }
        context.beginPath();
        context.fillStyle = particle.colour;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      makeParticles();
      draw();
    };

    const animate = () => {
      if (!running || reducedMotion) return;
      particles.forEach((particle) => {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 170 && distance > 1) {
          particle.vx -= (dx / distance) * 0.00055;
          particle.vy -= (dy / distance) * 0.00055;
        }
        particle.vx *= 0.998;
        particle.vy *= 0.998;
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.y > height + 8) particle.y = -8;
      });
      draw();
      frame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: globalThis.PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reducedMotion) {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(animate);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function FeaturedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const touchStart = useRef<number | null>(null);
  const current = featuredItems[activeIndex];

  const selectItem = (index: number, fromUser = true) => {
    const normalized = (index + featuredItems.length) % featuredItems.length;
    setActiveIndex(normalized);
    setActiveMediaIndex(0);
    if (fromUser) setUserInteracted(true);
  };

  const selectMedia = (index: number) => {
    if (!current.media?.length) return;
    const normalized = (index + current.media.length) % current.media.length;
    setActiveMediaIndex(normalized);
    setUserInteracted(true);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || paused || userInteracted) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveIndex((index) => (index + 1) % featuredItems.length);
        setActiveMediaIndex(0);
      }
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, userInteracted]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectItem(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectItem(activeIndex + 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") touchStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch" || touchStart.current === null) return;
    const distance = event.clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 48) return;
    selectItem(activeIndex + (distance < 0 ? 1 : -1));
  };

  return (
    <section
      id="featured"
      className="featured-section"
      aria-labelledby="featured-title"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="featured-shell">
        <header className="featured-heading">
          <div>
            <p className="section-label">Selected Highlights</p>
            <h2 id="featured-title">Featured Engineering Work</h2>
          </div>
          <p className="section-intro">
            Professional results and authentic engineering evidence, selected for technical depth,
            measurable impact and relevance to electrical engineering roles.
          </p>
        </header>

        <div className="featured-stage-shell">
          <button
            className="project-edge-button is-previous"
            type="button"
            aria-label="Previous featured project"
            onClick={() => selectItem(activeIndex - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div className="featured-stage" aria-live="polite">
            <div className="featured-visual">
            <div className="featured-index" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}</div>
            {current.metrics ? (
              <div className="metric-flash-grid">
                {current.metrics.map((metric, index) => (
                  <article className="metric-flash-card" key={`${metric.value}-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{metric.value}</strong>
                    <p>{metric.label}</p>
                    {metric.note && <small>{metric.note}</small>}
                  </article>
                ))}
              </div>
            ) : current.media ? (
              <div className="featured-media-shell">
                <div className="featured-media-frame">
                  {current.media.map((media, index) => (
                    <img
                      key={media.src}
                      className={index === activeMediaIndex ? "is-active" : ""}
                      src={media.src}
                      alt={media.alt}
                      loading={activeIndex === 2 && index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                  {current.media.length > 1 && (
                    <div className="media-overlay-nav" aria-label="Project image navigation">
                      <button
                        type="button"
                        aria-label="Previous image in this project"
                        onClick={() => selectMedia(activeMediaIndex - 1)}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Next image in this project"
                        onClick={() => selectMedia(activeMediaIndex + 1)}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="media-caption-row">
                  <p>{current.media[activeMediaIndex].caption}</p>
                  {current.media.length > 1 && (
                    <div className="media-thumbs" aria-label="Choose project image">
                      {current.media.map((media, index) => (
                        <button
                          key={media.src}
                          className={index === activeMediaIndex ? "is-active" : ""}
                          type="button"
                          aria-label={`Show image ${index + 1}: ${media.caption}`}
                          aria-pressed={index === activeMediaIndex}
                          onClick={() => selectMedia(index)}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            </div>

            <article className="featured-copy" key={current.title}>
              <p className="featured-category">{current.category}</p>
              <h3>{current.title}</h3>
              <p className="featured-description">{current.description}</p>
              <div className="highlight-chips" aria-label="Key highlights">
                {current.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
              </div>
              <div className="tool-list" aria-label="Tools and technical areas">
                {current.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
              {current.links && (
                <div className="featured-links">
                  {current.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>
                    </a>
                  ))}
                </div>
              )}
            </article>
          </div>

          <button
            className="project-edge-button is-next"
            type="button"
            aria-label="Next featured project"
            onClick={() => selectItem(activeIndex + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>

        <div className="featured-controls">
          <div className="featured-arrows">
            <button type="button" aria-label="Previous featured project" onClick={() => selectItem(activeIndex - 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" aria-label="Next featured project" onClick={() => selectItem(activeIndex + 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
          <div className="featured-dots" aria-label="Select featured project">
            {featuredItems.map((item, index) => (
              <button
                key={item.title}
                className={index === activeIndex ? "is-active" : ""}
                type="button"
                aria-label={`Show ${item.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => selectItem(index)}
              />
            ))}
          </div>
          <p className="featured-counter">
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            <span>/</span>
            {String(featuredItems.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutExpertise() {
  return (
    <>
      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-shell">
          <div className="about-heading">
            <div>
              <p className="section-label section-label-light">About</p>
              <h2 id="about-title">Complex systems.<br />Clear, creative solutions.</h2>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                Problems Reveal Opportunities. Opportunities Spark Ideas. Ideas Become Solutions.
              </p>
              <p>
                Across power systems, electrical design, renewable energy, energy markets and technical
                operations, every challenge is approached as an opportunity to understand a system more
                deeply, question how it works and explore how it can work better. By looking beyond the
                immediate problem, opportunities emerge, ideas take shape, and practical solutions begin
                to form.
              </p>
            </div>
          </div>

          <div className="about-focus" aria-label="Professional focus">
            <p>Professional focus</p>
            <div><span>01</span><strong>Analyze complex systems</strong></div>
            <div><span>02</span><strong>Translate findings into clear decisions</strong></div>
            <div><span>03</span><strong>Coordinate technical work through delivery</strong></div>
          </div>

          <div className="impact-grid" aria-label="Selected impact statistics">
            {impactStats.map((stat, index) => (
              <article className="impact-card" key={stat.label}>
                <span className="impact-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{stat.value}</strong>
                <h3>{stat.label}</h3>
                <p>{stat.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="expertise-section" aria-labelledby="expertise-title">
        <div className="expertise-shell">
          <header className="expertise-heading">
            <div>
              <p className="section-label">Engineering Expertise</p>
              <h2 id="expertise-title">Technical range,<br />organized with purpose.</h2>
            </div>
            <p>
              A verified mix of electrical engineering, energy, design, supplier and project capabilities.
              Each area is supported by academic projects, professional work or documented technical training.
            </p>
          </header>

          <div className="expertise-grid">
            {expertiseGroups.map((group) => (
              <article className={`expertise-card ${group.className}`} key={group.title}>
                <div className="expertise-card-top">
                  <span>{group.number}</span>
                  <span className="expertise-line" aria-hidden="true" />
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="expertise-skills" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProfessionalExperience() {
  const powercoMedia: FeaturedMedia[] = [
    { src: "/assets/experience/powerco/powerco-campus.webp", alt: "Ahmed ElMetwally outside PowerCo Canada", caption: "At PowerCo Canada during the engineering co-op term." },
    { src: "/assets/experience/powerco/powerco-meeting-edited.webp", alt: "Ahmed ElMetwally participating in a PowerCo meeting", caption: "Edited meeting image with sensitive information removed." },
    { src: "/assets/experience/powerco/powerco-presentation.webp", alt: "Ahmed ElMetwally presenting PowerCo engineering co-op work", caption: "Presenting the co-op research scope and technical work to an academic audience." },
  ];
  const mediaBuyerMedia: FeaturedMedia[] = [
    { src: "/assets/experience/media-buying/141843.webp", alt: "Campaign dashboard showing multi-client advertising performance", caption: "Campaign portfolio view used to compare spend, cost per result, reach and impressions." },
    { src: "/assets/experience/media-buying/141902.webp", alt: "Campaign dashboard showing engagement and message results", caption: "Performance view covering engagement, message conversations and audience reach." },
    { src: "/assets/experience/media-buying/141926.webp", alt: "Campaign dashboard showing traffic and lead results", caption: "Campaign evidence covering traffic, leads and cost-per-result monitoring." },
    { src: "/assets/experience/media-buying/141403.webp", alt: "Campaign dashboard for a separate client advertising account", caption: "Client-level account view used for budget and delivery review." },
    { src: "/assets/experience/media-buying/141619.webp", alt: "E-commerce campaign dashboard showing purchase results", caption: "E-commerce campaigns reviewed by spend, purchases and cost per purchase." },
    { src: "/assets/experience/media-buying/141711.webp", alt: "Campaign dashboard showing active message campaigns", caption: "Active and completed campaign results used to compare delivery and acquisition cost." },
    { src: "/assets/experience/media-buying/142237.webp", alt: "Shopify theme dashboard for an e-commerce store", caption: "Shopify storefront administration and theme performance view." },
    { src: "/assets/experience/media-buying/142311.webp", alt: "Shopify theme editor for an e-commerce storefront", caption: "Storefront theme configuration supporting campaign landing-page delivery." },
  ];
  const khaldaMedia: FeaturedMedia[] = [
    { src: "/assets/experience/khalda/field-training.webp", alt: "Ahmed ElMetwally at a Khalda Petroleum field site", caption: "Electrical maintenance training in an operating oil and gas field environment." },
  ];
  const solarMedia: FeaturedMedia[] = [
    { src: "/assets/experience/smart-solar/inverter-cabling.webp", alt: "Solar inverter and three-phase cabling", caption: "Inverter installation and three-phase cable terminations on the rooftop PV project." },
    { src: "/assets/experience/smart-solar/rooftop-array.webp", alt: "Commercial rooftop photovoltaic array", caption: "Installed photovoltaic modules across the commercial rooftop." },
    { src: "/assets/experience/smart-solar/cable-tray-routing.webp", alt: "Cable tray routing between photovoltaic module rows", caption: "Cable-tray and routing work between photovoltaic module rows." },
    { src: "/assets/experience/smart-solar/pv-array-and-walkway.webp", alt: "Photovoltaic array and maintenance walkway", caption: "Completed array sections with coordinated service access and cable pathways." },
  ];
  const europeMedia: FeaturedMedia[] = [
    { src: "/assets/experience/europe-education/industry-visit.webp", alt: "Europ Education technical training group at an industrial facility", caption: "Technical training group during an energy and industrial facility visit in Italy." },
  ];
  const powercoContributions = [
    {
      number: "01",
      title: "Ontario electricity forecasting",
      detail:
        "Built a three-year electricity-price forecast in Excel and Power Query, achieving a mean absolute error of $9.89/MWh for cost planning.",
    },
    {
      number: "02",
      title: "Facility billing model",
      detail:
        "Developed a facility-level electricity billing model using IESO and Hydro One data to forecast costs and support invoice validation.",
    },
    {
      number: "03",
      title: "Market and procurement reporting",
      detail:
        "Prepared quarterly reporting on Ontario electricity, policy, solar, battery materials and mining for senior leadership.",
    },
    {
      number: "04",
      title: "Solar and incentive evaluation",
      detail:
        "Evaluated 14 suppliers, 11 PPA or VPPA case studies and more than CAD 50 million in incentives to support rooftop solar decisions.",
    },
  ];

  const powercoTools = [
    "Excel",
    "Power Query",
    "IESO Data",
    "Hydro One Data",
    "Energy Forecasting",
    "Billing Modelling",
    "Supplier Evaluation",
    "PPA/VPPA Analysis",
    "Senior Leadership Reporting",
  ];

  const telecomContributions = [
    {
      number: "01",
      title: "Circular equipment recovery",
      detail:
        "Coordinated suppliers and internal teams to recycle 22,000 ADSL units and refurbish 81,000 VDSL units for reuse.",
    },
    {
      number: "02",
      title: "Commercial evaluation and savings",
      detail:
        "Secured approximately US$120,000 in savings by comparing supplier proposals, negotiating terms and revising the business plan around tender requirements.",
    },
    {
      number: "03",
      title: "Process ownership and downtime reduction",
      detail:
        "Reduced downtime by up to 66% across 53 teams through SOPs, RACI matrices, Gantt planning and clearer ownership.",
    },
    {
      number: "04",
      title: "Supplier issue resolution",
      detail:
        "Resolved 84% of 433 supplier issues through technical reviews, corrective action plans and cross-team follow-up.",
    },
  ];

  const telecomTools = [
    "Technical Vendor Management",
    "Supplier Qualification",
    "Technical Review",
    "Commercial Review",
    "Product Inspections",
    "Corrective Actions",
    "Supplier Performance",
    "PO to PAC to FAC",
    "SOP Development",
    "RACI",
    "Gantt Planning",
    "Tender Requirements",
  ];

  const khaldaContributions = [
    {
      number: "01",
      title: "MV maintenance exposure",
      detail:
        "Supported on-site diagnostics and medium-voltage maintenance activities in an oil and gas field environment.",
    },
    {
      number: "02",
      title: "Rotating and power equipment",
      detail:
        "Supported preventive and corrective maintenance activities involving ESP motors, transformers and variable speed drives.",
    },
    {
      number: "03",
      title: "Field safety practices",
      detail:
        "Followed site HSE requirements while observing and supporting electrical maintenance work around operating field equipment.",
    },
  ];

  const khaldaTools = [
    "Medium-Voltage Systems",
    "Electrical Maintenance",
    "Preventive Maintenance",
    "Corrective Maintenance",
    "Transformers",
    "ESP Motors",
    "Variable Speed Drives",
    "Field Diagnostics",
    "HSE",
  ];

  const solarContributions = [
    {
      number: "01",
      title: "PV layout and mounting",
      detail:
        "Supported rooftop PV layout work and module mounting activities for a 500 kW installation.",
    },
    {
      number: "02",
      title: "Cabling and inverter setup",
      detail:
        "Assisted with project cabling and inverter setup as the system progressed through installation.",
    },
    {
      number: "03",
      title: "Testing, commissioning and HSE",
      detail:
        "Supported system testing and commissioning activities while following site HSE requirements.",
    },
  ];

  const solarTools = [
    "Rooftop Solar PV",
    "PV Layout",
    "Module Mounting",
    "Electrical Cabling",
    "Inverter Setup",
    "System Testing",
    "Commissioning Support",
    "HSE",
  ];

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="experience-shell">
        <header className="experience-heading">
          <div>
            <p className="section-label section-label-light">Professional Experience</p>
            <h2 id="experience-title">Industry work,<br />measured clearly.</h2>
          </div>
          <p>
            Industry experience across energy analysis, procurement research, supplier quality,
            renewable energy, electrical maintenance and technical operations.
          </p>
        </header>

        <article className="experience-role" aria-labelledby="powerco-role-title">
          <div className="experience-rail" aria-hidden="true">
            <span>01</span>
            <div />
            <small>Role</small>
          </div>

          <div className="experience-card">
            <header className="role-header">
              <div className="role-identity">
                <p className="role-group">Volkswagen Group</p>
                <h3 id="powerco-role-title">Energy Markets &amp; Battery Materials<br />Procurement Co-op</h3>
                <p className="role-company">PowerCo Canada Inc.</p>
              </div>
              <dl className="role-meta">
                <div>
                  <dt>Period</dt>
                  <dd>Sep 2025 to Dec 2025</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Energy analysis | Procurement research</dd>
                </div>
              </dl>
            </header>

            <div className="role-overview">
              <p className="role-overview-label">Role overview</p>
              <p>
                Supported procurement and energy planning through Ontario electricity-market
                analysis, facility cost modelling, supplier research and concise reporting for
                senior leadership.
              </p>
            </div>

            <div className="role-metrics" aria-label="PowerCo selected results">
              <div>
                <strong>9.89</strong>
                <span>$/MWh forecast MAE</span>
              </div>
              <div>
                <strong>$50M+ CAD</strong>
                <span>Incentives identified</span>
              </div>
              <div>
                <strong>14 + 11</strong>
                <span>Suppliers + PPA/VPPA studies</span>
              </div>
            </div>

            <div className="role-body">
              <div className="role-contributions">
                <p className="role-subheading">Selected contributions</p>
                <div className="contribution-list">
                  {powercoContributions.map((item) => (
                    <div className="contribution-item" key={item.number}>
                      <span>{item.number}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="role-support">
                <div className="role-initiative">
                  <p className="role-subheading">Additional contribution</p>
                  <h4>Microsoft Copilot workshop</h4>
                  <p>
                    Delivered a practical workshop to about 40 employees and managers on
                    procurement-focused AI use cases.
                  </p>
                </div>
                <div className="role-tools">
                  <p className="role-subheading">Tools &amp; methods</p>
                  <div aria-label="PowerCo tools and methods">
                    {powercoTools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              </aside>
            </div>
            <div className="role-evidence experience-media">
              <p className="role-subheading">Experience gallery</p>
              <ProjectMediaCarousel media={powercoMedia} label="PowerCo Canada experience" />
            </div>
          </div>
        </article>

        <article className="experience-role" aria-labelledby="telecom-role-title">
          <div className="experience-rail" aria-hidden="true">
            <span>02</span>
            <div />
            <small>Role</small>
          </div>

          <div className="experience-card experience-card-telecom">
            <header className="role-header">
              <div className="role-identity">
                <p className="role-group">Telecommunications Infrastructure</p>
                <h3 id="telecom-role-title">Technical Vendor<br />Management Engineer</h3>
                <p className="role-company">Telecom Egypt</p>
              </div>
              <dl className="role-meta">
                <div>
                  <dt>Location</dt>
                  <dd>Giza, Egypt</dd>
                </div>
                <div>
                  <dt>Period</dt>
                  <dd>Nov 2023 to Dec 2024</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Supplier quality | Technical operations</dd>
                </div>
              </dl>
            </header>

            <div className="role-overview">
              <p className="role-overview-label">Role overview</p>
              <p>
                Coordinated suppliers and internal teams across technical review, product
                inspection, acceptance, corrective actions, commercial evaluation and
                telecommunications equipment recovery.
              </p>
            </div>

            <div className="role-metrics role-metrics-four" aria-label="Telecom Egypt selected results">
              <div>
                <strong>84%</strong>
                <span>Of 433 supplier issues resolved</span>
              </div>
              <div>
                <strong>Up to 66%</strong>
                <span>Downtime reduction across 53 teams</span>
              </div>
              <div>
                <strong>103K</strong>
                <span>Devices recycled or refurbished</span>
              </div>
              <div>
                <strong>≈ US$120K</strong>
                <span>Savings secured</span>
              </div>
            </div>

            <div className="role-body">
              <div className="role-contributions">
                <p className="role-subheading">Selected contributions</p>
                <div className="contribution-list">
                  {telecomContributions.map((item) => (
                    <div className="contribution-item" key={item.number}>
                      <span>{item.number}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="role-support">
                <div className="role-initiative">
                  <p className="role-subheading">Quality &amp; acceptance</p>
                  <h4>Supplier output verification</h4>
                  <p>
                    Performed random sample inspections on refurbished VDSL units and reviewed
                    supplier trial output, packaging and overall product conformity. Supported
                    supplier qualification and the PO to PAC to FAC acceptance process.
                  </p>
                </div>
                <div className="role-tools">
                  <p className="role-subheading">Tools &amp; methods</p>
                  <div aria-label="Telecom Egypt tools and methods">
                    {telecomTools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>

        <article className="experience-role" aria-labelledby="khalda-role-title">
          <div className="experience-rail" aria-hidden="true">
            <span>03</span>
            <div />
            <small>Role</small>
          </div>

          <div className="experience-card experience-card-khalda">
            <header className="role-header">
              <div className="role-identity">
                <p className="role-group">Oil &amp; Gas Field Operations</p>
                <h3 id="khalda-role-title">Electrical Maintenance<br />Engineer Intern</h3>
                <p className="role-company">Khalda Petroleum Company (Apache)</p>
              </div>
              <dl className="role-meta">
                <div>
                  <dt>Location</dt>
                  <dd>Matrouh, Egypt</dd>
                </div>
                <div>
                  <dt>Period</dt>
                  <dd>Aug 2022 to Sep 2022</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Electrical maintenance | Field HSE</dd>
                </div>
              </dl>
            </header>

            <div className="role-overview">
              <p className="role-overview-label">Role overview</p>
              <p>
                Gained field exposure to medium-voltage maintenance, electrical diagnostics
                and equipment servicing within an operating oil and gas environment.
              </p>
            </div>

            <div className="role-systems" aria-label="Khalda Petroleum equipment exposure">
              <div><span>01</span><strong>MV Systems</strong><p>Field maintenance</p></div>
              <div><span>02</span><strong>ESP Motors</strong><p>Oil-field equipment</p></div>
              <div><span>03</span><strong>Transformers</strong><p>Power equipment</p></div>
              <div><span>04</span><strong>VSDs</strong><p>Motor control</p></div>
            </div>

            <div className="role-body">
              <div className="role-contributions">
                <p className="role-subheading">Selected experience</p>
                <div className="contribution-list">
                  {khaldaContributions.map((item) => (
                    <div className="contribution-item" key={item.number}>
                      <span>{item.number}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="role-support">
                <div className="role-initiative">
                  <p className="role-subheading">Field context</p>
                  <h4>Maintenance in an operating environment</h4>
                  <p>
                    The placement provided practical exposure to electrical equipment,
                    maintenance routines and safety requirements used in oil-field operations.
                  </p>
                </div>
                <div className="role-tools">
                  <p className="role-subheading">Equipment &amp; methods</p>
                  <div aria-label="Khalda Petroleum equipment and methods">
                    {khaldaTools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              </aside>
            </div>
            <div className="role-evidence experience-media">
              <p className="role-subheading">Field evidence</p>
              <ProjectMediaCarousel media={khaldaMedia} label="Khalda Petroleum field training" />
              <a className="experience-certificate-link" href="/certificates/khalda-petroleum-electrical-training.pdf" target="_blank" rel="noreferrer">View Training Certificate <span>↗</span></a>
            </div>
          </div>
        </article>

        <article className="experience-role" aria-labelledby="solar-role-title">
          <div className="experience-rail" aria-hidden="true">
            <span>04</span>
            <div />
            <small>Role</small>
          </div>

          <div className="experience-card experience-card-solar">
            <header className="role-header">
              <div className="role-identity">
                <p className="role-group">Renewable Energy Installation</p>
                <h3 id="solar-role-title">Renewable Energy<br />Engineer Intern</h3>
                <p className="role-company">Smart Solar Company</p>
              </div>
              <dl className="role-meta">
                <div>
                  <dt>Location</dt>
                  <dd>Cairo, Egypt</dd>
                </div>
                <div>
                  <dt>Period</dt>
                  <dd>Jul 2021 to Sep 2021</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Solar PV | Installation &amp; commissioning</dd>
                </div>
              </dl>
            </header>

            <div className="role-overview">
              <p className="role-overview-label">Role overview</p>
              <p>
                Supported the installation and commissioning of a 500 kW rooftop photovoltaic
                system through layout, mounting, cabling, inverter setup and testing activities.
              </p>
            </div>

            <div className="role-systems role-systems-solar" aria-label="Smart Solar project exposure">
              <div><span>01</span><strong>500 kW</strong><p>Rooftop PV system</p></div>
              <div><span>02</span><strong>PV Layout</strong><p>Module placement</p></div>
              <div><span>03</span><strong>Cabling</strong><p>Electrical installation</p></div>
              <div><span>04</span><strong>Inverters</strong><p>Setup and testing</p></div>
            </div>

            <div className="role-body">
              <div className="role-contributions">
                <p className="role-subheading">Selected experience</p>
                <div className="contribution-list">
                  {solarContributions.map((item) => (
                    <div className="contribution-item" key={item.number}>
                      <span>{item.number}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="role-support">
                <div className="role-initiative">
                  <p className="role-subheading">Project context</p>
                  <h4>Installation through commissioning</h4>
                  <p>
                    The placement provided practical exposure to the main site stages of a
                    commercial rooftop solar project, from module layout to final testing.
                  </p>
                </div>
                <div className="role-tools">
                  <p className="role-subheading">Systems &amp; methods</p>
                  <div aria-label="Smart Solar systems and methods">
                    {solarTools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              </aside>
            </div>
            <div className="role-evidence experience-media">
              <p className="role-subheading">Installation evidence</p>
              <ProjectMediaCarousel media={solarMedia} label="Smart Solar rooftop photovoltaic training" />
              <a className="experience-certificate-link" href="/certificates/smart-solar-training.pdf" target="_blank" rel="noreferrer">View Training Certificate <span>↗</span></a>
            </div>
          </div>
        </article>

        <section className="additional-experience" aria-labelledby="additional-experience-title">
          <header className="additional-experience-heading">
            <div>
              <p className="section-label section-label-light">Additional Experience</p>
              <h3 id="additional-experience-title">Commercial perspective.<br />International exposure.</h3>
            </div>
            <p>
              Supporting experience that adds budgeting, pricing, client coordination and
              cross-sector technical awareness to the core engineering profile.
            </p>
          </header>

          <div className="additional-experience-grid">
            <article className="additional-experience-card additional-commercial">
              <div className="additional-card-top">
                <span>Commercial &amp; data experience</span>
                <time>Jun 2024 to Mar 2025</time>
              </div>
              <h4>Media Buyer</h4>
              <p className="additional-company">Businex | London, United Kingdom | Remote</p>
              <p className="additional-copy">
                Managed advertising budgets across 14 clients, prepared quotations, set service
                prices, negotiated fees and tracked revenue, margins and return on investment.
              </p>
              <div className="additional-metrics" aria-label="Businex selected results">
                <div><strong>≈ US$10K</strong><span>Monthly ad budget</span></div>
                <div><strong>14</strong><span>Client accounts</span></div>
                <div><strong>≈ US$40K</strong><span>Combined monthly revenue</span></div>
              </div>
              <div className="additional-tags" aria-label="Businex skills">
                {[
                  "Excel",
                  "Budget Analysis",
                  "Pricing & Quotations",
                  "ROI Tracking",
                  "Margin Analysis",
                  "Client Coordination",
                ].map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="additional-experience-evidence experience-media media-buying-evidence">
                <p className="role-subheading">Selected campaign evidence</p>
                <ProjectMediaCarousel media={mediaBuyerMedia} label="Media buying campaign results" />
              </div>
            </article>

            <article className="additional-experience-card additional-industry">
              <div className="additional-card-top">
                <span>International industry exposure</span>
                <time>Sep 2022</time>
              </div>
              <h4>Technical Training &amp; Industry Visits</h4>
              <p className="additional-company">EUROP.EDUCATION | Italy</p>
              <p className="additional-copy">
                Joined a short technical program with visits to HERA waste-to-energy, DALLARA,
                CEFLA and ESTRA solar facilities, gaining exposure to energy, industrial and
                automotive operating environments.
              </p>
              <div className="industry-visit-list" aria-label="Industry visits">
                <div><span>01</span><strong>HERA</strong><p>Waste-to-energy</p></div>
                <div><span>02</span><strong>DALLARA</strong><p>Automotive</p></div>
                <div><span>03</span><strong>CEFLA</strong><p>Industrial systems</p></div>
                <div><span>04</span><strong>ESTRA</strong><p>Solar energy</p></div>
              </div>
              <div className="additional-tags" aria-label="EUROP.EDUCATION areas">
                {[
                  "Technical Site Visits",
                  "Renewable Energy",
                  "Waste-to-Energy",
                  "Industrial Operations",
                  "Automotive Exposure",
                ].map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="additional-experience-evidence experience-media">
                <ProjectMediaCarousel media={europeMedia} label="Europ Education technical training" />
                <a className="experience-certificate-link" href="/certificates/automotive-renewable-energy-summer-school-italy.pdf" target="_blank" rel="noreferrer">View Training Certificate <span>↗</span></a>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}

const ieeeProjectMedia: FeaturedMedia[] = [
  {
    src: "/assets/projects/ieee14/modified-network.png",
    alt: "Modified IEEE 14-bus benchmark system with the added line between Buses 6 and 11",
    caption: "Modified IEEE 14-bus network. The project added a line between Buses 6 and 11 and adjusted the system data for the study.",
  },
  {
    src: "/assets/projects/ieee14/pv-curves.png",
    alt: "Bus 11 PV curves comparing the base case and the Line 2-4 outage",
    caption: "Continuation power flow at Bus 11. The Line 2-4 outage reduced the voltage-stability margin and maximum loading point.",
  },
  {
    src: "/assets/projects/ieee14/fault-summary.png",
    alt: "Thevenin impedances and calculated fault currents at Bus 6",
    caption: "Sequence-network results at Bus 6. The three-phase solid fault produced the highest calculated current at 39.873 kA.",
  },
  {
    src: "/assets/projects/ieee14/atc-summary.png",
    alt: "Available transfer capability summary for the base and Line 2-4 tripped cases",
    caption: "Available transfer capability fell from 72.70 MW to 57.25 MW after the Line 2-4 outage, which governed the N-1 result.",
  },
];

function ProjectMediaCarousel({ media, label }: { media: FeaturedMedia[]; label: string }) {
  const [activeMedia, setActiveMedia] = useState(0);

  const changeMedia = (direction: number) => {
    setActiveMedia((current) => (current + direction + media.length) % media.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") changeMedia(-1);
    if (event.key === "ArrowRight") changeMedia(1);
  };

  return (
    <div
      className="project-media-carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label={`${label} image carousel`}
    >
      <div className="project-media-frame">
        {media.map((item, index) => (
          <img
            key={item.src}
            className={index === activeMedia ? "is-active" : ""}
            src={item.src}
            alt={item.alt}
            loading="lazy"
          />
        ))}
        <div className="project-media-arrows" aria-label="Project image controls">
          <button type="button" onClick={() => changeMedia(-1)} aria-label="Previous project image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" onClick={() => changeMedia(1)} aria-label="Next project image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div className="project-media-footer" aria-live="polite">
        <div>
          <span>{String(activeMedia + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
          <p>{media[activeMedia].caption}</p>
        </div>
        <div className="project-media-dots" aria-label="Choose a project image">
          {media.map((item, index) => (
            <button
              key={item.src}
              className={index === activeMedia ? "is-active" : ""}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeMedia ? "true" : undefined}
              onClick={() => setActiveMedia(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type ProjectDetail = {
  title: string;
  detail: string;
};

type ProjectCaseData = {
  number: string;
  category: string;
  date: string;
  context: string;
  title: string;
  overview: string;
  role: string;
  tools: string;
  media: FeaturedMedia[];
  metrics: { value: string; label: string }[];
  objectiveTitle: string;
  objective: string;
  details: ProjectDetail[];
  methods: string[];
  links: { label: string; href: string }[];
};

function ProjectChapterHeader({ number, category, date }: { number: string; category: string; date: string }) {
  return (
    <div className="project-chapter-banner">
      <div className="project-chapter-number">
        <span>Project</span>
        <strong>{number}</strong>
      </div>
      <div className="project-chapter-category">
        <span>Major case study</span>
        <strong>{category}</strong>
      </div>
      <div className="project-chapter-date">
        <span>Completed</span>
        <strong>{date}</strong>
      </div>
    </div>
  );
}

function ProjectEndMarker({ number }: { number: string }) {
  return (
    <div className="project-end-marker" aria-hidden="true">
      <span>End of Project {number}</span>
      <i />
      <strong>Next case study below</strong>
    </div>
  );
}

const batteryProject: ProjectCaseData = {
  number: "06",
  category: "EV Batteries & Charging Systems",
  date: "Sep 2022 to Jul 2023",
  context: "AASTMT | Bachelor Graduation Project",
  title: "60 V Battery Swapping Station for Electric Scooters",
  overview:
    "Led a four-person capstone team through electrical design, protection work, control integration and physical prototype validation for a three-bay battery swapping station.",
  role: "Project lead | Four-person team",
  tools: "ETAP | AutoCAD | Proteus | Embedded Control",
  media: [
    {
      src: "/assets/featured/battery-prototype.jpg",
      alt: "Completed three-bay battery swapping station prototype beside an electric scooter",
      caption: "Completed physical prototype with three battery bays and the electric scooter used for project validation.",
    },
    {
      src: "/assets/featured/battery-schematic.png",
      alt: "Battery swapping station charging, sensing and control schematic",
      caption: "Control schematic linking chargers, voltage and temperature sensing, protection relays and chamber locks.",
    },
  ],
  metrics: [
    { value: "60 V", label: "Lithium-ion scooter battery system" },
    { value: "3 bays", label: "Protected charging chambers" },
    { value: "45°C", label: "Automatic charging cut-off threshold" },
    { value: "117 pages", label: "Engineering thesis and documentation" },
  ],
  objectiveTitle: "Reduce charging delay while protecting batteries during unattended operation.",
  objective:
    "The station was designed around a 60 V lithium-ion scooter battery. Each chamber combined charging, voltage and temperature monitoring, locking, isolation and status control. The team also completed electrical drawings, protection and load work, prototype testing and business analysis.",
  details: [
    { title: "Battery charging and protection", detail: "Integrated 71.4 V, 4 A chargers with branch protection, relays and battery isolation for three charging chambers." },
    { title: "Thermal and voltage monitoring", detail: "Monitored battery condition during charging and disconnected a battery when temperature reached the 45°C threshold." },
    { title: "Secure chamber operation", detail: "Used voltage sensing, limit switches, relays and solenoid locks to coordinate battery acceptance, charging and release." },
    { title: "Prototype validation", detail: "Developed and tested a preliminary model before integrating the full physical station, control hardware and electric scooter." },
  ],
  methods: ["Lithium-ion Battery System", "Charging Protection", "Voltage Monitoring", "Temperature Monitoring", "Electrical SLD", "ETAP Load & Protection Work", "PCB Design", "Prototype Validation"],
  links: [
    { label: "View Full Thesis", href: "/reports/battery-swapping-thesis.pdf" },
    { label: "View Control Schematic", href: "/reports/battery-system-schematic.pdf" },
  ],
};

const revitProject: ProjectCaseData = {
  number: "03",
  category: "Electrical Design & BIM",
  date: "June 2026",
  context: "Revit MEP Electrical Design Project",
  title: "Revit MEP Electrical Parking Design",
  overview:
    "Modelled and coordinated the electrical systems for a parking facility, resolved interferences, modified electrical families and issued a 12-sheet drawing package.",
  role: "Individual design project",
  tools: "Revit MEP | BIM Coordination | Drawing Production",
  media: [
    {
      src: "/assets/featured/revit-3d.png",
      alt: "Revit three-dimensional electrical conduit coordination drawing",
      caption: "Three-dimensional coordination view showing routed conduit systems across the parking level.",
    },
    {
      src: "/assets/featured/revit-total-plan.png",
      alt: "Revit parking electrical total plan drawing",
      caption: "Coordinated total plan bringing the principal electrical systems into one drawing view.",
    },
    {
      src: "/assets/featured/revit-legend.png",
      alt: "Revit electrical symbols, schedules and legend sheet",
      caption: "Legend and documentation sheet with symbols, schedules, tags and equipment information.",
    },
  ],
  metrics: [
    { value: "12 sheets", label: "Coordinated drawing package" },
    { value: "7 systems", label: "Electrical and low-voltage scopes" },
    { value: "3D BIM", label: "Model-based coordination" },
    { value: "A3", label: "Issued drawing-sheet format" },
  ],
  objectiveTitle: "Coordinate a complete parking electrical model and drawing set.",
  objective:
    "The project covered lighting, emergency lighting, fire alarm, security, receptacles, cable trays and conduit routing. Model coordination focused on clear routing, interference resolution, usable families and consistent construction documentation.",
  details: [
    { title: "Lighting and emergency systems", detail: "Developed lighting layouts and emergency-lighting coverage within the coordinated parking model." },
    { title: "Power and low-voltage systems", detail: "Modelled receptacles, fire alarm and security layouts with system-specific plans and tags." },
    { title: "Containment routing", detail: "Routed cable trays and conduits, then checked interferences against the model and adjusted routes where required." },
    { title: "Drawing production", detail: "Created and modified electrical families, schedules, legends and equipment data for a 12-sheet issue set." },
  ],
  methods: ["Lighting Design", "Emergency Lighting", "Fire Alarm", "Security", "Receptacles", "Cable Trays", "Conduit Routing", "Family Modification", "Interference Resolution", "Schedules & Tags"],
  links: [
    { label: "View Drawing Set", href: "/reports/revit-electrical-drawing-set.pdf" },
    { label: "View Course Certificate", href: "/certificates/revit-mep-electrical-certificate.pdf" },
  ],
};

function ProjectCaseStudy({ project }: { project: ProjectCaseData }) {
  return (
    <article id={`project-${project.number}`} className="project-case-study project-case-study-secondary" data-project={project.number} aria-labelledby={`project-${project.number}-title`}>
      <ProjectChapterHeader number={project.number} category={project.category} date={project.date} />
      <header className="project-case-header">
        <div>
          <p className="project-case-context">{project.context}</p>
          <h3 id={`project-${project.number}-title`}>{project.title}</h3>
        </div>
        <div className="project-case-summary">
          <p className="project-summary-label">Project overview</p>
          <p>{project.overview}</p>
          <dl>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Tools</dt><dd>{project.tools}</dd></div>
          </dl>
        </div>
      </header>
      <div className="project-case-visual">
        <ProjectMediaCarousel media={project.media} label={project.title} />
      </div>
      <div className="project-results" aria-label={`${project.title} selected facts`}>
        {project.metrics.map((metric, index) => (
          <div key={metric.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{metric.value}</strong><p>{metric.label}</p></div>
        ))}
      </div>
      <div className="project-analysis-grid">
        <div className="project-problem">
          <p className="project-block-label">System and objective</p>
          <h4>{project.objectiveTitle}</h4>
          <p>{project.objective}</p>
          <div className="project-report-links">
            {project.links.map((link) => (
              <a className="project-report-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                {link.label}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </a>
            ))}
          </div>
        </div>
        <div className="project-analysis-list">
          {project.details.map((item, index) => (
            <div key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h4>{item.title}</h4><p>{item.detail}</p></div>
            </div>
          ))}
        </div>
      </div>
      <footer className="project-methods">
        <p className="project-block-label">Engineering methods and systems</p>
        <div>{project.methods.map((method) => <span key={method}>{method}</span>)}</div>
      </footer>
      <ProjectEndMarker number={project.number} />
    </article>
  );
}

const schneiderSessions = [
  { title: "Network strategy", detail: "Building types, electrical distribution strategy, design stages, load estimation, power-source planning and transformer considerations." },
  { title: "Backup and zoning", detail: "Generators, UPS, central-battery and rotary-UPS options, load types, circuit configurations, protection categories and zoning." },
  { title: "LV protection", detail: "Switching devices, circuit-breaker types, selectivity or discrimination and cascading principles." },
  { title: "Switchgear and space", detail: "LV switchgear configuration, electrical-room space planning and NEC Article 110 examples." },
  { title: "Small-power design", detail: "Small-power distribution, coordination with other MEP disciplines and panel-schedule development." },
  { title: "Lighting distribution", detail: "Lighting-distribution strategy, fixture selection and DIALux training exercises." },
  { title: "Cables and SLDs", detail: "Cable construction, busway categories, voltage-drop and short-circuit calculations, raceways and single-line diagrams." },
  { title: "Earthing and safety", detail: "Direct and indirect contact protection, earthing schemes, earthing grids and practical earthing experiments." },
];

const schneiderPhaseTwoTopics = [
  { title: "MV switchgear and substations", detail: "Reviewed MV distribution configurations, switchgear classifications, RMUs, GIS and AIS arrangements, service continuity and IEC 62271-200 concepts." },
  { title: "Coordinated design development", detail: "Worked through BODR, design-development and detailed-design deliverables, including SLDs, panel schedules, cable sizing, voltage drop and equipment layouts." },
  { title: "MCCs and motor starting", detail: "Studied motor-control centres, motor starters, protection considerations and their relationship to building electrical distribution." },
  { title: "Power quality and PFC", detail: "Reviewed harmonic sources, resonance, filtering approaches, capacitor-bank selection and detuned-reactor applications for power-factor correction." },
  { title: "Outdoor lighting", detail: "Covered street, parking, tunnel, obstruction and landscape lighting, with DIALux-based configuration and lighting-evaluation exercises." },
  { title: "Lightning and surge protection", detail: "Reviewed risk assessment, external and internal lightning protection, earthing interfaces, lightning-protection zones and SPD coordination." },
];

const schneiderProjectMedia: FeaturedMedia[] = [
  {
    src: "/assets/projects/schneider/power-layout.png",
    alt: "Building floor power layout from the Schneider Electric distribution training practice models",
    caption: "Building power-layout exercise showing socket circuits, dedicated equipment points and electrical-room interfaces.",
  },
  {
    src: "/assets/projects/schneider/distribution-board-sld.png",
    alt: "Distribution-board single-line diagram with protective devices and circuit loads",
    caption: "Distribution-board single-line exercise with protective devices, circuit groupings, connected loads, demand factors and diversified load.",
  },
  {
    src: "/assets/projects/schneider/lighting-layout.png",
    alt: "Coordinated lighting layout from the Schneider Electric training practice models",
    caption: "Lighting-layout exercise coordinating fixture positions, switching routes and room use across an administrative floor.",
  },
  {
    src: "/assets/projects/schneider/electrical-points-layout.png",
    alt: "Electrical points layout around generator, transformer and UPS rooms",
    caption: "Coordinated electrical-points plan around dedicated generator, transformer, RMU and UPS spaces.",
  },
  {
    src: "/assets/projects/schneider/multilevel-distribution.png",
    alt: "Multi-level building electrical distribution diagram from the Schneider training practice models",
    caption: "Multi-level distribution exercise connecting main boards, sub-main boards and downstream loads across building levels.",
  },
  {
    src: "/assets/projects/schneider/phase-2/harmonic-pfc-detuned-reactor.png",
    alt: "Power factor correction training example showing a detuned reactor resonance result",
    caption: "Phase 2 power-quality example covering harmonic resonance and detuned-reactor selection for capacitor-bank protection.",
  },
  {
    src: "/assets/projects/schneider/phase-2/coordinated-design-deliverables.png",
    alt: "Training slide listing coordinated single-line diagram design deliverables",
    caption: "Phase 2 coordinated-design workflow linking final load distribution, panel schedules, cable sizing, voltage drop, short-circuit calculations and breaker ratings.",
  },
];

function SchneiderDistributionProject() {
  const methods = [
    "Building Load Estimation",
    "Power-Source Strategy",
    "Transformer Selection Concepts",
    "Generator & UPS Systems",
    "LV Protection",
    "Discrimination & Cascading",
    "LV Switchgear",
    "Panel Schedules",
    "DIALux",
    "Voltage-Drop Calculation",
    "Short-Circuit Calculation",
    "Single-Line Diagrams",
    "Earthing Systems",
    "NEC Article 110",
    "MEP Coordination",
    "MV Switchgear",
    "RMU | GIS | AIS",
    "IEC 62271-200",
    "MCCs & Motor Starting",
    "Power Quality & Harmonics",
    "Power-Factor Correction",
    "Lightning Protection",
    "Surge Protection Devices",
    "Outdoor Lighting",
  ];

  return (
    <article id="project-04" className="project-case-study schneider-project" data-project="04" aria-labelledby="project-04-title">
      <ProjectChapterHeader number="04" category="Electrical Distribution Design" date="July to August 2023" />
      <header className="project-case-header schneider-project-header">
        <div>
          <p className="project-case-context">Schneider Electric Engineering Lab | Syndicate of Egyptian Engineers</p>
          <h3 id="project-04-title">Electrical Distribution Design, Phases 1 and 2</h3>
        </div>
        <div className="project-case-summary">
          <p className="project-summary-label">Training overview</p>
          <p>
            Completed two certified 24-hour phases. Phase 1 followed the building electrical-design process from early load and source strategy through LV distribution, protection, lighting, cables, single-line diagrams and earthing. Phase 2 extended the scope into MV/LV systems, coordinated design stages, motor control, power quality, outdoor lighting and lightning protection.
          </p>
          <dl>
            <div><dt>Format</dt><dd>Two certified phases | 48 training hours</dd></div>
            <div><dt>Scope</dt><dd>Building LV design | MV/LV systems | Coordination</dd></div>
          </dl>
        </div>
      </header>

      <div className="project-case-visual schneider-project-visual">
        <ProjectMediaCarousel media={schneiderProjectMedia} label="Schneider electrical distribution practice models" />
      </div>

      <div className="schneider-design-workflow" aria-label="Electrical distribution design workflow">
        <div className="schneider-workflow-heading">
          <p className="project-block-label">Design workflow</p>
          <h4>From initial load strategy to coordinated construction documents.</h4>
        </div>
        <div className="schneider-workflow-grid">
          {[
            ["01", "Estimate", "Loads, building type and design basis"],
            ["02", "Supply", "Utility, transformers and backup systems"],
            ["03", "Protect", "Breakers, discrimination and cascading"],
            ["04", "Distribute", "Switchgear, zoning and panel schedules"],
            ["05", "Coordinate", "Lighting, small power and MEP interfaces"],
            ["06", "Document", "Cables, raceways, SLDs and earthing"],
          ].map(([number, title, detail]) => (
            <div key={number}><span>{number}</span><strong>{title}</strong><p>{detail}</p></div>
          ))}
        </div>
      </div>

      <div className="project-results" aria-label="Schneider Electrical Distribution training facts">
        <div><span>01</span><strong>48 hours</strong><p>Two certified training phases</p></div>
        <div><span>02</span><strong>MV | LV</strong><p>Distribution and coordination scope</p></div>
        <div><span>03</span><strong>IEC 62271-200</strong><p>MV switchgear reference framework</p></div>
        <div><span>04</span><strong>0.83 to 0.95</strong><p>Worked power-factor reference case</p></div>
      </div>

      <section className="schneider-session-section" aria-labelledby="schneider-session-title">
        <header>
          <p className="project-block-label">Verified Phase 1 curriculum</p>
          <h4 id="schneider-session-title">Eight connected design sessions.</h4>
        </header>
        <div className="schneider-session-grid">
          {schneiderSessions.map((session, index) => (
            <div key={session.title}>
              <span>Session {String(index + 1).padStart(2, "0")}</span>
              <h5>{session.title}</h5>
              <p>{session.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="schneider-session-section schneider-phase-two" aria-labelledby="schneider-phase-two-title">
        <header>
          <p className="project-block-label">Verified Phase 2 scope</p>
          <h4 id="schneider-phase-two-title">MV/LV systems, coordination and power quality.</h4>
        </header>
        <div className="schneider-session-grid">
          {schneiderPhaseTwoTopics.map((topic, index) => (
            <div key={topic.title}>
              <span>Focus {String(index + 1).padStart(2, "0")}</span>
              <h5>{topic.title}</h5>
              <p>{topic.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="schneider-scope-note">
        <div>
          <span>Evidence note</span>
          <p>The displayed drawings and course slides are authentic training references. Ahmed reviewed, interpreted and worked through them during the program. They are not presented as independently authored, approved or stamped engineering drawings.</p>
        </div>
        <div className="schneider-evidence-links">
          <a className="project-report-link" href="/reports/schneider-electrical-distribution-practice-models.pdf" target="_blank" rel="noreferrer">
            Practice Models PDF
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </a>
          <div className="schneider-certificate-links">
            <a className="project-report-link" href="/certificates/schneider-electrical-distribution-phase-1.pdf" target="_blank" rel="noreferrer">
              Phase 1 Certificate
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
            <a className="project-report-link" href="/certificates/schneider-electrical-distribution-phase-2.pdf" target="_blank" rel="noreferrer">
              Phase 2 Certificate
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
          </div>
        </div>
      </div>

      <footer className="project-methods">
        <p className="project-block-label">Electrical design methods and systems</p>
        <div>{methods.map((method) => <span key={method}>{method}</span>)}</div>
      </footer>
      <ProjectEndMarker number="04" />
    </article>
  );
}

type ProjectDiscipline = "power" | "design" | "battery" | "renewable" | "computational";

type TechnicalProjectData = {
  number: string;
  discipline: ProjectDiscipline;
  category: string;
  context: string;
  title: string;
  overview: string;
  scope: { label: string; detail: string }[];
  methods: string[];
  media?: FeaturedMedia[];
  results?: { value: string; label: string }[];
  reportLinks?: { label: string; href: string }[];
};

const technicalProjects: TechnicalProjectData[] = [
  {
    number: "07",
    discipline: "battery",
    category: "Power Conversion Foundations",
    context: "University of Windsor | EV Power Conversion | Assignment 01",
    title: "Buck-Boost, Reference Frames & VSI Analysis",
    overview:
      "Completed analytical and simulation studies covering buck-boost conversion, Clarke and Park reference-frame transformations and the eight switching states of a three-phase voltage-source inverter.",
    scope: [
      { label: "Buck-boost conversion", detail: "Related duty ratio, input voltage and output voltage for continuous-conduction operation." },
      { label: "Reference frames", detail: "Applied abc, alpha-beta and rotating dq transformations to three-phase quantities." },
      { label: "RL load response", detail: "Examined current and voltage behaviour for a converter-fed inductive load." },
      { label: "VSI switching", detail: "Evaluated the eight switching states and resulting three-phase output vectors." },
    ],
    methods: ["MATLAB", "Simulink", "Buck-Boost Converter", "Clarke Transform", "Park Transform", "Voltage-Source Inverter", "Switching-State Analysis"],
    media: [
      { src: "/assets/projects/ev-conversion/ev-foundations.svg", alt: "Summary of EV power conversion foundations", caption: "Portfolio summary of the converter, reference-frame and VSI studies completed in Assignment 01." },
      { src: "/assets/projects/ev-conversion/vsi-three-phase-model.png", alt: "Three-phase voltage-source inverter model in Simulink", caption: "Three-phase VSI model used to evaluate switching states and the resulting phase voltages and currents." },
      { src: "/assets/projects/ev-conversion/vsi-pwm-generator.png", alt: "Three-phase PWM switching-signal generator in Simulink", caption: "PWM subsystem producing the six gate signals used by the three-phase inverter model." },
    ],
    reportLinks: [
      { label: "View Assignment Work", href: "/reports/ev-power-electronics-foundations-report.pdf" },
      { label: "Download VSI Simulink Model", href: "/models/ev/ev-vsi-switching-model.slx" },
    ],
  },
  {
    number: "08",
    discipline: "battery",
    category: "EV Motor Control",
    context: "University of Windsor | EV Power Conversion",
    title: "Tesla Model 3 PMSM DQ Modelling & Field-Oriented Control",
    overview:
      "Developed a simulation-based permanent-magnet synchronous motor study using a Tesla Model 3 motor as the application context. The project focused on the DQ model, reference-frame transformations and the control structure used for electric-vehicle traction.",
    scope: [
      { label: "Motor model", detail: "Represented PMSM electrical behaviour in the rotating DQ reference frame." },
      { label: "Transformations", detail: "Applied Clarke and Park transformations between three-phase and rotating coordinates." },
      { label: "Control structure", detail: "Studied field-oriented current control for torque and flux regulation." },
      { label: "EV context", detail: "Connected the control approach to Tesla Model 3 traction-motor operation without claiming physical vehicle testing." },
    ],
    methods: ["MATLAB", "Simulink", "PMSM", "DQ Modelling", "Field-Oriented Control", "Clarke Transform", "Park Transform", "Current Control", "EV Traction"],
    media: [
      { src: "/assets/projects/ev-conversion/pmsm-foc-full-model.png", alt: "Full Tesla Model 3 PMSM field-oriented control model in Simulink", caption: "Full motor-control model connecting the speed controller, DQ current loops, transformations, inverter and PMSM plant." },
      { src: "/assets/projects/ev-conversion/pmsm-foc-model.webp", alt: "PMSM field-oriented control model in Simulink", caption: "DQ control structure with Clarke and Park transformations, current regulators and the physical inverter-motor model." },
      { src: "/assets/projects/ev-conversion/pmsm-foc-results.webp", alt: "PMSM field-oriented control simulation results", caption: "Selected simulated motor-control responses from the team report." },
    ],
    reportLinks: [
      { label: "View PMSM Team Report", href: "/reports/ev-pmsm-foc-team-report.pdf" },
      { label: "Download PMSM Simulink Model", href: "/models/ev/ev-pmsm-foc-model.slx" },
    ],
  },
  {
    number: "09",
    discipline: "battery",
    category: "EV Charging",
    context: "University of Windsor | EV Power Conversion",
    title: "Three-Phase CC-CV EV Charging",
    overview:
      "Modelled a three-phase EV charging system in MATLAB and Simulink, focusing on the transition between constant-current and constant-voltage charging and the power-conversion stages connecting the grid to the battery.",
    scope: [
      { label: "Charging profile", detail: "Studied constant-current and constant-voltage operating regions." },
      { label: "Grid interface", detail: "Examined the three-phase front-end conversion path used for EV charging." },
      { label: "DC regulation", detail: "Assessed converter control needed to regulate battery-side voltage and current." },
      { label: "Simulation review", detail: "Evaluated charging behaviour from model signals and simulated responses, not physical charger hardware." },
    ],
    methods: ["MATLAB", "Simulink", "Three-Phase Charging", "CC-CV Control", "Grid Interface", "Voltage Regulation", "Current Regulation", "EV Battery Charging"],
    media: [
      { src: "/assets/projects/ev-conversion/cccv-full-model.png", alt: "Full three-phase CC-CV electric-vehicle charging model in Simulink", caption: "Full charging model connecting grid-side conversion, DQ control, CC-CV logic, capacity estimation and the battery." },
      { src: "/assets/projects/ev-conversion/cccv-charging-model.webp", alt: "Three-phase CC-CV EV charging model in Simulink", caption: "Detailed model view showing the abc and dq control paths, CC-CV logic, inverter, battery and three-phase grid interface." },
    ],
    reportLinks: [
      { label: "View Parameter Script", href: "/code/ev-cccv-parameters.m" },
      { label: "Download CC-CV Simulink Model", href: "/models/ev/ev-three-phase-cccv-charging-model.slx" },
    ],
  },
  {
    number: "10",
    discipline: "battery",
    category: "On-Board Charging",
    context: "University of Windsor | EV Power Conversion",
    title: "Single-Phase OBC & Active Power Decoupling",
    overview:
      "Investigated a single-phase on-board charger and active power-decoupling approaches used to manage the twice-line-frequency power ripple that appears between the AC grid and the EV battery.",
    scope: [
      { label: "OBC architecture", detail: "Reviewed the conversion stages used between a single-phase source and the battery." },
      { label: "Power pulsation", detail: "Examined the origin and system impact of twice-line-frequency power ripple." },
      { label: "Active decoupling", detail: "Investigated active power-decoupling concepts for reducing low-frequency ripple stress." },
      { label: "Converter behaviour", detail: "Used simulation-based analysis to interpret voltage, current and control behaviour." },
    ],
    methods: ["MATLAB", "Simulink", "On-Board Charger", "Single-Phase Conversion", "Active Power Decoupling", "DC-Link Ripple", "Power Electronics"],
    media: [
      { src: "/assets/projects/ev-conversion/obc-apd-full-control.png", alt: "Full single-phase on-board charger and active power-decoupling control model in Simulink", caption: "Full control model showing grid synchronization, voltage and current regulation, transformations and the power stage." },
      { src: "/assets/projects/ev-conversion/obc-apd-control.webp", alt: "On-board charger and active power decoupling model", caption: "Single-phase OBC and active power-decoupling model used to study twice-line-frequency ripple management." },
    ],
    reportLinks: [
      { label: "View OBC and APD Report", href: "/reports/ev-obc-apd-report.pdf" },
      { label: "Download OBC Simulink Model", href: "/models/ev/ev-obc-active-power-decoupling-model.slx" },
    ],
  },
  {
    number: "11",
    discipline: "battery",
    category: "Isolated DC-DC Conversion",
    context: "University of Windsor | EV Power Conversion",
    title: "DAB & SAB Isolated Converter Comparison",
    overview:
      "Built and compared dual-active-bridge and single-active-bridge isolated DC-DC converter models. The study focused on topology differences, switching behaviour, transformer isolation and simulated voltage and current response.",
    scope: [
      { label: "DAB topology", detail: "Modelled two active bridges connected through a high-frequency transformer." },
      { label: "SAB topology", detail: "Replaced the secondary active bridge with a diode rectifier for comparison." },
      { label: "Control", detail: "Examined switching signals and phase-shift-based power transfer." },
      { label: "Output response", detail: "Compared regulated voltage and converter-current waveforms in simulation." },
    ],
    methods: ["MATLAB", "Simulink", "DAB", "SAB", "Isolated DC-DC", "High-Frequency Transformer", "Phase-Shift Control", "Waveform Analysis"],
    media: [
      {
        src: "/assets/projects/ev-conversion/dab-sab-full-model.png",
        alt: "Full DAB and SAB isolated converter comparison model in Simulink",
        caption: "Full comparison model connecting the DAB and SAB power stages, control blocks and measured outputs.",
      },
      {
        src: "/assets/projects/ev-conversion/dab-control-model.webp",
        alt: "Dual active bridge model with phase-shift control",
        caption: "Detailed DAB model showing the two bridge stages, transformer, rectification path and phase-shift controller.",
      },
      {
        src: "/assets/projects/ev-conversion/dab-simulink-model.jpg",
        alt: "Dual active bridge converter model in Simulink",
        caption: "DAB Simulink implementation with two active bridges, a high-frequency transformer and phase-shift control.",
      },
      {
        src: "/assets/projects/ev-conversion/dab-waveforms.jpg",
        alt: "Dual active bridge voltage current and control waveforms",
        caption: "DAB simulation outputs used to examine voltage regulation, switching signals and transformer current.",
      },
      {
        src: "/assets/projects/ev-conversion/sab-simulink-model.jpg",
        alt: "Single active bridge converter model in Simulink",
        caption: "SAB model created by replacing the secondary active bridge with a diode rectifier for topology comparison.",
      },
      {
        src: "/assets/projects/ev-conversion/sab-waveforms.jpg",
        alt: "Single active bridge voltage current and control waveforms",
        caption: "SAB waveforms showing the regulated output, switching pattern and converter current response.",
      },
    ],
    reportLinks: [
      { label: "View DAB and SAB Report", href: "/reports/ev-dab-sab-converter-report.pdf" },
      { label: "View Parameter Script", href: "/code/ev-dab-sab-parameters.m" },
      { label: "Download DAB and SAB Simulink Model", href: "/models/ev/ev-dab-sab-isolated-converter-model.slx" },
    ],
  },
  {
    number: "12",
    discipline: "battery",
    category: "Battery Systems",
    context: "University of Windsor | Advanced Energy Storage Systems",
    title: "Battery Pack Design, ECM & Drive-Cycle Studies",
    overview:
      "Individual MATLAB studies covered lithium-ion chemistry and pack sizing, a two-RC equivalent-circuit cell model, and pack-level UDDS and HWFET drive-cycle analysis.",
    scope: [
      { label: "Chemistry comparison", detail: "Evaluated NMC, NCA and LFP options against application requirements." },
      { label: "Pack sizing", detail: "Developed series-parallel arrangements for power, energy and voltage targets, including a modular 18 x 34S10P EV architecture." },
      { label: "Equivalent-circuit model", detail: "Simulated a two-RC cell model under step, square and sinusoidal 1C current profiles and examined its Nyquist response." },
      { label: "Drive-cycle scaling", detail: "Scaled an Rint model to a 110S72P pack and evaluated terminal voltage and state of charge under UDDS and HWFET cycles." },
    ],
    methods: ["MATLAB", "NMC", "NCA", "LFP", "Series-Parallel Sizing", "Modular Pack Architecture", "Two-RC ECM", "Rint Model", "Nyquist Analysis", "UDDS", "HWFET", "State of Charge"],
    media: [
      { src: "/assets/projects/battery-ecm/step-current-voltage.png", alt: "Battery equivalent-circuit response to a step current profile", caption: "Two-RC cell-model voltage response under a 1C step-current input." },
      { src: "/assets/projects/battery-ecm/square-current-voltage.png", alt: "Battery equivalent-circuit response to a square current profile", caption: "Two-RC cell-model voltage response under a 1C square-current input." },
      { src: "/assets/projects/battery-ecm/sine-current-voltage.png", alt: "Battery equivalent-circuit response to a sinusoidal current profile", caption: "Two-RC cell-model voltage response under a 1C sinusoidal-current input." },
      { src: "/assets/projects/battery-ecm/nyquist-2rc-ecm.png", alt: "Nyquist plot for the two-RC battery equivalent-circuit model", caption: "Frequency-domain response showing the resistive intercepts and fast and slow polarization behaviour." },
      { src: "/assets/projects/battery-ecm/drive-cycle-current.png", alt: "UDDS and HWFET battery-pack drive-cycle current profiles", caption: "UDDS and HWFET current profiles applied to the scaled 110S72P pack model." },
      { src: "/assets/projects/battery-ecm/udds-voltage-soc.png", alt: "UDDS pack terminal voltage and state-of-charge results", caption: "Pack terminal voltage and state-of-charge response under the UDDS drive cycle." },
      { src: "/assets/projects/battery-ecm/hwfet-voltage-soc.png", alt: "HWFET pack terminal voltage and state-of-charge results", caption: "Pack terminal voltage and state-of-charge response under the HWFET drive cycle." },
    ],
    results: [
      { value: "367.2 V", label: "Nominal EV pack voltage" },
      { value: "105.8 kWh", label: "Estimated pack energy" },
      { value: "110S72P", label: "Drive-cycle simulation pack" },
      { value: "48.29%", label: "HWFET ending state of charge from a 50% start" },
    ],
    reportLinks: [{ label: "View ECM and Drive-Cycle Study", href: "/reports/battery-ecm-pack-study.pdf" }],
  },
  {
    number: "13",
    discipline: "power",
    category: "Power-System Economics",
    context: "AASTMT | Generation Economics & Operation",
    title: "Constrained Generation Economics & Dispatch",
    overview:
      "Applied incremental-cost and operating-limit logic to allocate a 975 MW system demand across three generating units. The broader coursework also covered load curves, tariffs, plant costing, transmission losses and penalty factors.",
    scope: [
      { label: "Cost functions", detail: "Used quadratic fuel-cost models to compare the incremental cost of three generating units." },
      { label: "Unit limits", detail: "Applied minimum and maximum output constraints while preserving the power-balance requirement." },
      { label: "Dispatch decision", detail: "Set Unit 1 at its 450 MW upper limit, then economically allocated the remaining demand." },
      { label: "System context", detail: "Connected the worked example to tariffs, plant economics, losses and penalty-factor studies." },
    ],
    methods: ["Economic Dispatch", "Incremental Cost", "Generation Limits", "Power Balance", "Tariff Analysis", "Transmission Losses", "Penalty Factors"],
    media: [{ src: "/assets/projects/economics/economic-dispatch.svg", alt: "Economic dispatch allocation for a 975 megawatt demand", caption: "Redrawn portfolio result for the verified constrained dispatch example." }],
    results: [
      { value: "975 MW", label: "Total system demand" },
      { value: "450 MW", label: "Unit 1 dispatch" },
      { value: "325 + 200 MW", label: "Units 2 and 3 dispatch" },
      { value: "9.40 $/MWh", label: "Incremental cost" },
    ],
  },
  {
    number: "14",
    discipline: "design",
    category: "Electrical Utilization",
    context: "AASTMT | Utilization of Electrical Energy",
    title: "Distribution, Lighting, Traction & Industrial Heating",
    overview:
      "Completed structured engineering calculations across lighting, distribution, electric traction and industrial heating. The portfolio presentation redraws selected verified results instead of publishing the original course sheets.",
    scope: [
      { label: "Lighting", detail: "Applied luminous-intensity and flux relationships to practical illumination calculations." },
      { label: "Distribution", detail: "Worked through residential circuits, feeders, breakers and distribution-board selection." },
      { label: "Traction", detail: "Evaluated speed-time behaviour and specific energy consumption for electric traction." },
      { label: "Heating", detail: "Compared resistance connections and completed industrial furnace power and time calculations." },
    ],
    methods: ["Illumination", "Luminous Flux", "Distribution Boards", "Feeder Design", "Electric Traction", "Specific Energy", "Resistance Heating", "Arc Furnace"],
    media: [{ src: "/assets/projects/utilization/utilization-summary.svg", alt: "Summary of lighting, traction and industrial heating results", caption: "Verified calculation examples redrawn as a clear engineering summary." }],
    results: [
      { value: "314 lm", label: "Flux from 25 cd mean spherical intensity" },
      { value: "48.22 km/h", label: "Calculated peak traction speed" },
      { value: "38.24 Wh/t-km", label: "Specific traction energy" },
      { value: "1 to 16 kW", label: "Series versus parallel heating power" },
    ],
  },
  {
    number: "05",
    discipline: "design",
    category: "Motor Control & Panel Design",
    context: "AutoCAD Electrical 2026 | Training Project | May 2026",
    title: "AutoCAD Electrical MCC Schematic & Panel Layout",
    overview:
      "Created an AutoCAD Electrical training package for a three-phase motor control centre. The work organized busbars, motor starters, contactors, terminal blocks and motor loads into a coordinated schematic, then developed the associated panel component layout.",
    scope: [
      { label: "MCC schematic", detail: "Documented 14 motor feeders connected to the 1L1, 1L2 and 1L3 three-phase busbars." },
      { label: "Motor loads", detail: "Identified pumps and agitators with ratings from 0.2 kW to 3.7 kW." },
      { label: "Panel arrangement", detail: "Positioned DIN rails, wire duct, terminal blocks, PLC hardware, a power supply and a control relay." },
      { label: "Drawing coordination", detail: "Used consistent device tags, connection references and component callouts across the provided drawings." },
    ],
    methods: ["AutoCAD Electrical", "Motor Control Centre", "Three-Phase Distribution", "Motor Starters", "Contactors", "Terminal Blocks", "DIN Rail Layout", "Wire Duct", "Panel Layout"],
    media: [
      {
        src: "/assets/projects/autocad-electrical/mcc-schematic.png",
        alt: "AutoCAD Electrical three-phase motor control centre schematic with 14 motor feeders",
        caption: "Three-phase MCC schematic showing busbars 1L1, 1L2 and 1L3, 14 starter and contactor branches, terminal blocks and the connected motor loads.",
      },
      {
        src: "/assets/projects/autocad-electrical/panel-layout.png",
        alt: "AutoCAD Electrical panel component layout with DIN rails, PLC hardware and terminal blocks",
        caption: "Panel component arrangement showing DIN rails, PLC hardware, power supply, terminal blocks, control relay and wiring duct locations.",
      },
      {
        src: "/assets/projects/autocad-electrical/course-certificate.png",
        alt: "AutoCAD Electrical 2026 course completion certificate for Ahmed ElMetwally",
        caption: "Course certificate for AutoCAD Electrical 2026: Tutorials, Exercises, and Projects, completed May 29, 2026.",
      },
    ],
    results: [
      { value: "14", label: "Motor feeders documented" },
      { value: "3-phase", label: "1L1, 1L2 and 1L3 busbars" },
      { value: "0.2 to 3.7 kW", label: "Motor load range shown" },
    ],
    reportLinks: [
      { label: "View Project PDF", href: "/reports/autocad-electrical-mcc-panel-layout.pdf" },
      { label: "View Course Certificate", href: "/certificates/autocad-electrical-2026.pdf" },
    ],
  },
  {
    number: "02",
    discipline: "power",
    category: "Power-System Protection",
    context: "AASTMT | Undergraduate Protection Projects",
    title: "ETAP Relay Coordination & Protection Studies",
    overview:
      "Completed a set of protection studies covering load flow, fault levels, relay coordination and equipment protection. The work connected calculated fault duty with practical protection settings and coordination logic.",
    scope: [
      { label: "Overcurrent coordination", detail: "Coordinated six relay positions using approximately 0.4 s grading intervals." },
      { label: "Fault studies", detail: "Used ETAP load-flow and short-circuit results as inputs to protection decisions." },
      { label: "Instrument transformers", detail: "Completed current-transformer selection and error calculations." },
      { label: "Protection functions", detail: "Studied distance, generator differential and transformer differential protection." },
    ],
    methods: ["ETAP", "Load Flow", "Short-Circuit Analysis", "Overcurrent Protection", "Relay Coordination", "CT Selection", "Distance Protection", "Generator Differential", "Transformer Differential"],
    media: [
      {
        src: "/assets/projects/protection/etap-one-line.png",
        alt: "ETAP one-line diagram for relay coordination and power-system protection studies",
        caption: "ETAP network used to connect load-flow and short-circuit results with protection settings and relay locations.",
      },
      {
        src: "/assets/projects/protection/relay-calculations.png",
        alt: "Overcurrent relay grading calculations from the protection report",
        caption: "Documented grading calculations, current-transformer ratios and relay-setting logic from the protection study.",
      },
      {
        src: "/assets/projects/protection/relay-coordination.png",
        alt: "Relay coordination curves and calculated protection settings",
        caption: "Report results showing coordinated operating times and approximately 0.4 second grading intervals.",
      },
    ],
    reportLinks: [
      { label: "View Protection Report", href: "/reports/etap-relay-coordination-report.pdf" },
    ],
  },
  {
    number: "15",
    discipline: "computational",
    category: "MATLAB Image Processing",
    context: "University of Windsor | Individual Coursework",
    title: "Image Analysis, Detection & Geometric Processing",
    overview:
      "A collection of individual MATLAB projects covering enhancement, feature detection, geometric processing and quantitative image-quality evaluation. Each exercise linked algorithm selection to visual and numerical results.",
    scope: [
      { label: "Edges and features", detail: "Compared Sobel, Prewitt, LoG and Canny edge detection approaches." },
      { label: "Noise and quality", detail: "Applied Gaussian noise studies with RMSE, PSNR and SSIM evaluation." },
      { label: "Shape detection", detail: "Used Hough line and circle detection, ROI filtering, morphology and segmentation." },
      { label: "Geometry", detail: "Implemented 3D-to-2D perspective and weak-perspective projection plus geometric transformations." },
    ],
    methods: ["MATLAB", "Histogram Equalization", "DFT Filtering", "Sobel", "Prewitt", "LoG", "Canny", "Hough Transform", "Morphology", "Segmentation", "Template Matching", "RMSE", "PSNR", "SSIM"],
    media: [
      {
        src: "/assets/projects/image-processing/rmse-comparison.png",
        alt: "RMSE comparison of edge detection methods under Gaussian noise",
        caption: "Quantitative RMSE comparison of Sobel, Prewitt, LoG and Canny outputs as Gaussian-noise variance increased.",
      },
      {
        src: "/assets/projects/image-processing/log-result.png",
        alt: "Laplacian of Gaussian edge detection result in MATLAB",
        caption: "Laplacian of Gaussian output highlighting its sensitivity to fine texture and noise.",
      },
      {
        src: "/assets/projects/image-processing/canny-result.png",
        alt: "Canny edge detection result in MATLAB",
        caption: "Canny output showing more continuous object boundaries under the tested image conditions.",
      },
      {
        src: "/assets/projects/image-processing/hough-lines-original.png",
        alt: "Hough line detection overlaid on a road image",
        caption: "Detected road boundaries overlaid on the original image after edge extraction and Hough line selection.",
      },
      {
        src: "/assets/projects/image-processing/hough-lines.png",
        alt: "Hough line detection comparison on edge and original images",
        caption: "Line candidates and selected peaks compared on the edge map and the original road scene.",
      },
      {
        src: "/assets/projects/image-processing/hough-circles.png",
        alt: "Hough circle detection results on a button image",
        caption: "Circle detections after accumulator analysis and radius selection, with accepted centres marked in red and green.",
      },
    ],
    reportLinks: [
      { label: "View Edge Detection Report", href: "/reports/image-processing-edge-detection-report.pdf" },
      { label: "View Hough Transform Report", href: "/reports/image-processing-hough-transform-report.pdf" },
    ],
  },
];

function TechnicalProjectCard({ project }: { project: TechnicalProjectData }) {
  return (
    <article id={`project-${project.number}`} className={`technical-project-card ${project.media ? "has-evidence" : ""}`} aria-labelledby={`technical-project-${project.number}`}>
      <div className="technical-project-topline">
        <span>Project {project.number}</span>
        <span>{project.category}</span>
      </div>
      <div className="technical-project-copy">
        <p className="technical-project-context">{project.context}</p>
        <h3 id={`technical-project-${project.number}`}>{project.title}</h3>
        <p className="technical-project-overview">{project.overview}</p>
      </div>
      <div className="technical-project-board" aria-label={`${project.title} technical scope`}>
        {project.scope.map((item, index) => (
          <div key={item.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h4>{item.label}</h4>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
      {project.media ? (
        <div className="technical-project-evidence">
          <ProjectMediaCarousel media={project.media} label={`${project.title} project evidence`} />
        </div>
      ) : null}
      {project.results ? (
        <div className={`technical-project-results technical-project-results-${project.results.length}`} aria-label={`${project.title} selected results`}>
          {project.results.map((result, index) => (
            <div key={result.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{result.value}</strong><p>{result.label}</p></div>
          ))}
        </div>
      ) : null}
      {project.reportLinks ? (
        <div className="technical-project-report-links">
          {project.reportLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
              {link.label}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
          ))}
        </div>
      ) : null}
      <div className="technical-project-methods">
        {project.methods.map((method) => <span key={method}>{method}</span>)}
      </div>
    </article>
  );
}

type AdditionalProjectData = {
  discipline: ProjectDiscipline;
  title: string;
  category: string;
  detail: string;
  tools: string;
  media?: FeaturedMedia[];
  reportHref?: string;
  reportLabel?: string;
  reportLinks?: { label: string; href: string }[];
};

const additionalProjects: AdditionalProjectData[] = [
  {
    discipline: "renewable",
    title: "Wind-Turbine Design & Testing",
    category: "Renewable Energy",
    detail: "Designed and simulated a QBlade rotor using the NACA 4412 airfoil, evaluated aerodynamic coefficients and the turbine power curve, then supported physical HAWT testing with Cp and energy calculations.",
    tools: "QBlade | NACA 4412 | Cp Analysis",
    media: [
      { src: "/assets/projects/wind/naca-4412-airfoil.png", alt: "NACA 4412 airfoil analysis in QBlade", caption: "NACA 4412 airfoil model and pressure distribution used as the aerodynamic basis for the blade design." },
      { src: "/assets/projects/wind/glide-ratio.png", alt: "QBlade glide ratio curve", caption: "Glide-ratio curve across angle of attack, used to examine aerodynamic performance." },
      { src: "/assets/projects/wind/lift-coefficient.png", alt: "QBlade lift coefficient curve", caption: "Lift-coefficient response used with drag behaviour to support blade-angle decisions." },
      { src: "/assets/projects/wind/drag-coefficient.png", alt: "QBlade drag coefficient curve", caption: "Drag-coefficient response across the tested angle-of-attack range." },
      { src: "/assets/projects/wind/power-curve.png", alt: "QBlade wind turbine power curve", caption: "Simulated turbine power curve showing output response across wind speed." },
      { src: "/assets/projects/wind/qblade-turbine.png", alt: "Three-dimensional QBlade wind turbine simulation", caption: "Three-dimensional turbine simulation used to review rotor geometry and operating configuration." },
    ],
    reportHref: "/reports/qblade-wind-turbine-report.pdf",
    reportLabel: "View QBlade Report",
  },
  { discipline: "renewable" as ProjectDiscipline, title: "12 V PV Battery-Charging System", category: "Photovoltaics", detail: "Built and evaluated a small physical photovoltaic system that charged a 12 V battery and supplied a DC motor.", tools: "PV Module | Battery Charging | DC Motor" },
  { discipline: "battery" as ProjectDiscipline, title: "Power Electronics & DC-DC Converters", category: "Power Conversion", detail: "Studied buck, boost, buck-boost and Cuk converters, PCB layouts, a MOSFET inverter, thyristor switching and RCC or choke converter behaviour.", tools: "Proteus | Simulink | PCB Layout" },
  { discipline: "computational" as ProjectDiscipline, title: "PIC Digital Stopwatch", category: "Programmable Devices", detail: "Programmed a PIC16F877A digital stopwatch in C, verified the circuit in Proteus and assembled a physical prototype.", tools: "PIC16F877A | mikroC | Proteus" },
  { discipline: "battery" as ProjectDiscipline, title: "Bidirectional Electrical Drives", category: "Electrical Drives", detail: "Analysed bidirectional AC-DC dual converters, regenerative operation and isolated bidirectional DC-DC conversion for drive applications.", tools: "Regeneration | Dual Converters | DC-DC" },
  {
    discipline: "renewable" as ProjectDiscipline,
    title: "Sustainable Building & Circular-Economy Studies",
    category: "Sustainability",
    detail: "Compared building orientations and material configurations using physical models, thermal imaging, solar-radiation analysis, heat-transfer calculations and U-values, alongside material-flow and circular-economy studies.",
    tools: "Thermal Imaging | Heat Transfer | U-Value | MFA",
    media: [
      { src: "/assets/projects/sustainable-building/thermal-model-01.jpg", alt: "Thermal image of a physical building model during orientation testing", caption: "Infrared measurement of a physical building model during the orientation and heat-transfer study." },
      { src: "/assets/projects/sustainable-building/thermal-model-02.jpg", alt: "Thermal image comparing surface temperatures on a building model", caption: "Surface-temperature distribution recorded for a tested building orientation." },
      { src: "/assets/projects/sustainable-building/thermal-model-03.jpg", alt: "Infrared view of the sustainable-building physical model", caption: "Thermal-camera evidence used to compare heat exposure across model surfaces." },
      { src: "/assets/projects/sustainable-building/thermal-model-04.jpg", alt: "Thermal measurement of a second building-model configuration", caption: "Infrared measurement from a second model configuration in the comparative study." },
      { src: "/assets/projects/sustainable-building/thermal-model-05.jpg", alt: "Infrared image showing heat distribution across a physical building model", caption: "Recorded heat distribution used with the building-orientation calculations." },
      { src: "/assets/projects/sustainable-building/thermal-model-06.jpg", alt: "Thermal-camera result for the sustainable-building study", caption: "Final thermal-camera result from the physical building-model investigation." },
    ],
    reportHref: "/reports/sustainable-building-heat-transfer.pdf",
    reportLabel: "View Heat-Transfer Report",
  },
  {
    discipline: "design",
    title: "AutoCAD Building Lighting & Power Design",
    category: "Building Electrical Design",
    detail: "Produced coordinated residential floor drawings for lighting and power systems, including luminaires, switching, receptacles, circuit routing and distribution-board locations.",
    tools: "AutoCAD | Lighting Plan | Power Plan | Distribution Boards",
    media: [
      { src: "/assets/projects/autocad-building/lighting-plan.png", alt: "Residential building lighting layout produced in AutoCAD", caption: "Residential floor lighting plan showing luminaires, switching points and circuit routing." },
      { src: "/assets/projects/autocad-building/power-plan.png", alt: "Residential building power layout produced in AutoCAD", caption: "Residential power plan showing receptacles, connected points and distribution-board locations." },
    ],
    reportHref: "/reports/autocad-building-lighting-power-project.pdf",
    reportLabel: "View Drawing Set",
  },
  {
    discipline: "computational" as ProjectDiscipline,
    title: "UAV Cloud Seeding & Wildfire Prevention",
    category: "Technical Communications",
    detail: "Co-developed a proposal and synthesized white paper evaluating UAV-based cloud seeding and AI-assisted monitoring as a proactive wildfire-risk strategy for Fort McMurray.",
    tools: "Technical Proposal | Evidence Synthesis | Sustainability | Risk",
    reportLinks: [
      { label: "View Team Proposal", href: "/reports/uav-cloud-seeding-project-proposal.pdf" },
      { label: "View White Paper", href: "/reports/uav-cloud-seeding-white-paper.pdf" },
    ],
  },
  {
    discipline: "computational" as ProjectDiscipline,
    title: "MATLAB Logic & Dynamic-System Studies",
    category: "Computational Methods",
    detail: "Implemented an 8 x 8 chessboard encoding method using parity, six-bit binary states and XOR logic, alongside coursework in optimization, Fourier analysis, PID control and dynamic-system modelling.",
    tools: "MATLAB | XOR Logic | PID | Fourier",
    reportLinks: [{ label: "View Chessboard MATLAB Code", href: "/code/matlab-chessboard-logic.m" }],
  },
  { discipline: "computational" as ProjectDiscipline, title: "Wireless Robotic Arm", category: "Embedded Systems", detail: "Developed a wireless 3D-printed robotic arm using servo control, Bluetooth communication, joystick input and PWM control.", tools: "Arduino C++ | Bluetooth | PWM" },
];

const projectDisciplines: {
  id: ProjectDiscipline;
  number: string;
  title: string;
  shortTitle: string;
  count: string;
  description: string;
}[] = [
  {
    id: "power",
    number: "01",
    title: "Power Systems & Protection",
    shortTitle: "Power Systems",
    count: "3 projects",
    description: "Network analysis, fault studies, protection coordination and power-system economics.",
  },
  {
    id: "design",
    number: "02",
    title: "Electrical Design & BIM",
    shortTitle: "Electrical Design",
    count: "5 projects",
    description: "Building distribution, BIM coordination, motor-control documentation and construction drawings.",
  },
  {
    id: "battery",
    number: "03",
    title: "Batteries, EVs & Power Conversion",
    shortTitle: "Batteries & EVs",
    count: "9 projects",
    description: "Battery systems, state estimation, EV charging, motor control and converter studies.",
  },
  {
    id: "renewable",
    number: "04",
    title: "Renewable Energy & Sustainability",
    shortTitle: "Renewable Energy",
    count: "3 projects",
    description: "Wind, photovoltaic systems, sustainable buildings and circular-economy analysis.",
  },
  {
    id: "computational",
    number: "05",
    title: "Computational & Embedded Systems",
    shortTitle: "Computational Systems",
    count: "5 projects",
    description: "MATLAB image analysis, computational modelling, embedded control and technical communication.",
  },
];

const projectDirectory: Record<ProjectDiscipline, { title: string; href: string; type: string }[]> = {
  power: [
    { title: "Modified IEEE 14-Bus Power-System Analysis", href: "#project-01", type: "Primary case study" },
    { title: "ETAP Relay Coordination & Protection Studies", href: "#project-02", type: "Focused case study" },
    { title: "Constrained Generation Economics & Dispatch", href: "#project-13", type: "Focused case study" },
  ],
  design: [
    { title: "Revit MEP Electrical Parking Design", href: "#project-03", type: "Primary case study" },
    { title: "Electrical Distribution Design, Phases 1 and 2", href: "#project-04", type: "Primary case study" },
    { title: "AutoCAD Electrical MCC Schematic & Panel Layout", href: "#project-05", type: "Focused case study" },
    { title: "Distribution, Lighting, Traction & Industrial Heating", href: "#project-14", type: "Focused case study" },
    { title: "AutoCAD Building Lighting & Power Design", href: "#project-autocad-building-lighting-power-design", type: "Related technical work" },
  ],
  battery: [
    { title: "60 V Battery Swapping Station for Electric Scooters", href: "#project-06", type: "Primary case study" },
    { title: "Buck-Boost, Reference Frames & VSI Analysis", href: "#project-07", type: "Focused case study" },
    { title: "Tesla Model 3 PMSM DQ Modelling & Field-Oriented Control", href: "#project-08", type: "Focused case study" },
    { title: "Three-Phase CC-CV EV Charging", href: "#project-09", type: "Focused case study" },
    { title: "Single-Phase OBC & Active Power Decoupling", href: "#project-10", type: "Focused case study" },
    { title: "DAB & SAB Isolated Converter Comparison", href: "#project-11", type: "Focused case study" },
    { title: "Battery Pack Design, ECM & Drive-Cycle Studies", href: "#project-12", type: "Focused case study" },
    { title: "Power Electronics & DC-DC Converters", href: "#project-power-electronics-dc-dc-converters", type: "Related technical work" },
    { title: "Bidirectional Electrical Drives", href: "#project-bidirectional-electrical-drives", type: "Related technical work" },
  ],
  renewable: [
    { title: "Wind-Turbine Design & Testing", href: "#project-wind-turbine-design-testing", type: "Documented project" },
    { title: "12 V PV Battery-Charging System", href: "#project-12-v-pv-battery-charging-system", type: "Related technical work" },
    { title: "Sustainable Building & Circular-Economy Studies", href: "#project-sustainable-building-circular-economy-studies", type: "Documented project" },
  ],
  computational: [
    { title: "Image Analysis, Detection & Geometric Processing", href: "#project-15", type: "Focused case study" },
    { title: "PIC Digital Stopwatch", href: "#project-pic-digital-stopwatch", type: "Related technical work" },
    { title: "UAV Cloud Seeding & Wildfire Prevention", href: "#project-uav-cloud-seeding-wildfire-prevention", type: "Documented project" },
    { title: "MATLAB Logic & Dynamic-System Studies", href: "#project-matlab-logic-dynamic-system-studies", type: "Code-backed project" },
    { title: "Wireless Robotic Arm", href: "#project-wireless-robotic-arm", type: "Related technical work" },
  ],
};

function projectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ProjectDisciplineNav() {
  return (
    <nav id="project-directory" className="project-discipline-nav" aria-label="Engineering project directory">
      <div className="project-directory-heading">
        <div>
          <p className="project-discipline-nav-label">Project directory</p>
          <h3>Explore the work behind the ideas.</h3>
          <p className="project-directory-guide">
            Choose a discipline to explore projects through their <strong>challenge, approach,
            engineering process, visuals, and results.</strong> Each section shows how an idea
            developed into practical engineering work.
          </p>
        </div>
      </div>
      <div className="project-discipline-grid">
        {projectDisciplines.map((discipline) => (
          <a href={`#project-group-${discipline.id}`} key={discipline.id}>
            <span>{discipline.number}</span>
            <strong>{discipline.shortTitle}</strong>
            <small>{discipline.count}</small>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        ))}
      </div>
    </nav>
  );
}

function DisciplineProjectIndex({ discipline }: { discipline: (typeof projectDisciplines)[number] }) {
  return (
    <nav className="discipline-project-index" aria-label={`${discipline.title} project index`}>
      <div className="discipline-project-index-heading">
        <span>In this chapter</span>
        <strong>{discipline.count}</strong>
      </div>
      <ol>
        {projectDirectory[discipline.id].map((project, index) => (
          <li key={project.href}>
            <a href={project.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{project.title}</strong><small>{project.type}</small></div>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function DisciplineFooterNav({ index }: { index: number }) {
  const next = projectDisciplines[index + 1];
  return (
    <nav className="discipline-footer-nav" aria-label="Project chapter navigation">
      <a href="#project-directory">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        <span><small>Project navigation</small><strong>Back to directory</strong></span>
      </a>
      {next ? (
        <a href={`#project-group-${next.id}`}>
          <span><small>Next discipline</small><strong>{next.shortTitle}</strong></span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </a>
      ) : (
        <a href="#certifications">
          <span><small>Continue portfolio</small><strong>Certifications</strong></span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </a>
      )}
    </nav>
  );
}

function ProjectDisciplineHeader({ discipline }: { discipline: (typeof projectDisciplines)[number] }) {
  return (
    <header className="project-discipline-header">
      <div className="project-discipline-number">
        <span>Discipline</span>
        <strong>{discipline.number}</strong>
      </div>
      <div className="project-discipline-copy">
        <p>Engineering project group</p>
        <h3>{discipline.title}</h3>
        <span>{discipline.description}</span>
      </div>
      <div className="project-discipline-count">
        <span>Portfolio scope</span>
        <strong>{discipline.count}</strong>
      </div>
    </header>
  );
}

function TechnicalProjectCollection({ discipline }: { discipline: ProjectDiscipline }) {
  const projects = technicalProjects.filter((project) => project.discipline === discipline);
  if (!projects.length) return null;

  return (
    <section className="technical-projects discipline-support-projects" aria-label="Focused case studies in this discipline">
      <header className="technical-projects-heading">
        <div>
          <p className="section-label">Focused Case Studies</p>
          <h3>Focused work in this discipline.</h3>
        </div>
      </header>
      <div className="technical-projects-grid">
        {projects.map((project) => <TechnicalProjectCard project={project} key={project.number} />)}
      </div>
    </section>
  );
}

function AdditionalProjectGallery({ discipline }: { discipline: ProjectDiscipline }) {
  const projects = additionalProjects
    .filter((project) => project.discipline === discipline)
    .sort((a, b) => Number(Boolean(b.media)) - Number(Boolean(a.media)));
  if (!projects.length) return null;
  const hasFeaturedMedia = projects.some((project) => project.media);

  return (
    <section className="additional-projects discipline-additional-projects" aria-label="Related project work in this discipline">
      <header className="additional-projects-heading">
        <div>
          <p className="section-label">Related Technical Work</p>
          <h3>More work in this discipline.</h3>
        </div>
      </header>
      <div className={`additional-projects-grid ${hasFeaturedMedia ? "has-featured-media" : ""}`}>
        {projects.map((project, index) => (
          <article id={`project-${projectSlug(project.title)}`} className={`additional-project-card ${project.media ? "has-media" : ""}`} key={project.title}>
            <div><span>{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span></div>
            <h4>{project.title}</h4>
            <p>{project.detail}</p>
            {project.media ? (
              <div className="additional-project-media">
                <ProjectMediaCarousel media={project.media} label={`${project.title} project evidence`} />
              </div>
            ) : null}
            {project.reportHref || project.reportLinks ? (
              <div className="additional-project-report-links">
                {project.reportHref ? (
                  <a className="additional-project-report" href={project.reportHref} target="_blank" rel="noreferrer">
                    {project.reportLabel || "View Project Report"}
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                  </a>
                ) : null}
                {project.reportLinks?.map((link) => (
                  <a className="additional-project-report" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                    {link.label}
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                  </a>
                ))}
              </div>
            ) : null}
            <strong>{project.tools}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function SelectedProjects() {
  const methods = [
    "Power Flow",
    "Short-Circuit Analysis",
    "Sequence Networks",
    "Continuation Power Flow",
    "Voltage Stability",
    "N-1 Contingency",
    "Transfer Capability",
  ];

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="projects-shell">
        <header className="projects-heading">
          <div>
            <p className="section-label">Selected Engineering Projects</p>
            <h2 id="projects-title">Technical work,<br />shown in depth.</h2>
          </div>
          <p>
            Academic engineering projects supported by original reports, calculations, models and
            technical visuals. Each case study focuses on the engineering problem, method and result.
          </p>
        </header>

        <ProjectDisciplineNav />

        <section id="project-group-power" className="project-discipline-section" data-discipline="power" aria-label="Power Systems and Protection projects">
          <ProjectDisciplineHeader discipline={projectDisciplines[0]} />
          <DisciplineProjectIndex discipline={projectDisciplines[0]} />

          <article id="project-01" className="project-case-study" data-project="01" aria-labelledby="ieee-project-title">
          <ProjectChapterHeader number="01" category="Graduate Power Systems" date="March 2026" />

          <header className="project-case-header">
            <div>
              <p className="project-case-context">University of Windsor | ELEC 8900-67</p>
              <h3 id="ieee-project-title">Modified IEEE 14-Bus<br />Power-System Analysis</h3>
            </div>
            <div className="project-case-summary">
              <p className="project-summary-label">Project overview</p>
              <p>
                Led a two-person study of a modified IEEE 14-bus system under steady-state,
                short-circuit, voltage-stability and N-1 operating conditions. PSAT supported power
                flow and continuation power flow, while MATLAB was used for sequence YBUS and fault calculations.
              </p>
              <dl>
                <div><dt>Role</dt><dd>Project lead | Two-person team</dd></div>
                <div><dt>Tools</dt><dd>PSAT | MATLAB | Simulink</dd></div>
              </dl>
            </div>
          </header>

          <div className="project-case-visual">
            <ProjectMediaCarousel media={ieeeProjectMedia} label="IEEE 14-bus project" />
          </div>

          <div className="project-results" aria-label="Selected project findings">
            <div><span>01</span><strong>8</strong><p>Power-flow iterations with reactive limits enforced</p></div>
            <div><span>02</span><strong>39.873 kA</strong><p>Three-phase solid-fault current calculated at Bus 6</p></div>
            <div><span>03</span><strong>Bus 14</strong><p>Better shunt location under a 45% load increase</p></div>
            <div><span>04</span><strong>57.25 MW</strong><p>N-1 secure available transfer capability</p></div>
          </div>

          <div className="project-analysis-grid">
            <div className="project-problem">
              <p className="project-block-label">System and objective</p>
              <h4>Evaluate operating limits after targeted network changes.</h4>
              <p>
                The study added a line between Buses 6 and 11, then reduced line and transformer
                impedances and all generator and load powers by 5%. The objective was to quantify
                steady-state behaviour, fault duty, voltage support and secure transfer capability.
              </p>
              <a className="project-report-link" href="/reports/ieee-14-bus-project-report.pdf" target="_blank" rel="noreferrer">
                View Full Project Report
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </a>
            </div>

            <div className="project-analysis-list">
              <div>
                <span>01</span>
                <div><h4>Power flow and reactive limits</h4><p>The base case converged in eight iterations. Generators at Buses 2, 6 and 8 reached reactive limits, showing limited reactive reserve.</p></div>
              </div>
              <div>
                <span>02</span>
                <div><h4>Shunt compensation</h4><p>Under a 45% load increase, a 47.430 Mvar capacitor at Bus 14 left one voltage violation and performed better than compensation at Bus 12.</p></div>
              </div>
              <div>
                <span>03</span>
                <div><h4>Bus 6 fault analysis</h4><p>Positive, negative and zero-sequence networks were assembled in MATLAB. The three-phase solid fault was the most severe at 39.873 kA.</p></div>
              </div>
              <div>
                <span>04</span>
                <div><h4>Voltage stability and N-1 security</h4><p>The Line 2-4 outage lowered the Bus 11 loading margin and reduced available transfer capability from 72.70 MW to 57.25 MW.</p></div>
              </div>
            </div>
          </div>

          <footer className="project-methods">
            <p className="project-block-label">Engineering methods</p>
            <div>{methods.map((method) => <span key={method}>{method}</span>)}</div>
          </footer>
          <ProjectEndMarker number="01" />
          </article>
          <TechnicalProjectCollection discipline="power" />
          <AdditionalProjectGallery discipline="power" />
          <DisciplineFooterNav index={0} />
        </section>

        <section id="project-group-design" className="project-discipline-section" data-discipline="design" aria-label="Electrical Design and BIM projects">
          <ProjectDisciplineHeader discipline={projectDisciplines[1]} />
          <DisciplineProjectIndex discipline={projectDisciplines[1]} />
          <ProjectCaseStudy project={revitProject} />
          <SchneiderDistributionProject />
          <TechnicalProjectCollection discipline="design" />
          <AdditionalProjectGallery discipline="design" />
          <DisciplineFooterNav index={1} />
        </section>

        <section id="project-group-battery" className="project-discipline-section" data-discipline="battery" aria-label="Batteries, EVs and Power Conversion projects">
          <ProjectDisciplineHeader discipline={projectDisciplines[2]} />
          <DisciplineProjectIndex discipline={projectDisciplines[2]} />
          <ProjectCaseStudy project={batteryProject} />
          <TechnicalProjectCollection discipline="battery" />
          <AdditionalProjectGallery discipline="battery" />
          <DisciplineFooterNav index={2} />
        </section>

        <section id="project-group-renewable" className="project-discipline-section" data-discipline="renewable" aria-label="Renewable Energy and Sustainability projects">
          <ProjectDisciplineHeader discipline={projectDisciplines[3]} />
          <DisciplineProjectIndex discipline={projectDisciplines[3]} />
          <AdditionalProjectGallery discipline="renewable" />
          <DisciplineFooterNav index={3} />
        </section>

        <section id="project-group-computational" className="project-discipline-section" data-discipline="computational" aria-label="Computational and Embedded Systems projects">
          <ProjectDisciplineHeader discipline={projectDisciplines[4]} />
          <DisciplineProjectIndex discipline={projectDisciplines[4]} />
          <TechnicalProjectCollection discipline="computational" />
          <AdditionalProjectGallery discipline="computational" />
          <DisciplineFooterNav index={4} />
        </section>
      </div>
    </section>
  );
}

type Credential = {
  name: string;
  provider: string;
  date: string;
  category: string;
  description: string;
  href?: string;
  previewSrc?: string;
};

const credentials: Credential[] = [
  {
    name: "Master of Engineering Honour Roll",
    provider: "University of Windsor | Faculty of Engineering",
    date: "Graduating Class of 2026",
    category: "Academic Recognition",
    description: "Recognition of outstanding academic achievement throughout the Master of Engineering program.",
    href: "/certificates/university-of-windsor-meng-honour-roll.pdf",
    previewSrc: "/assets/certificates/meng-honour-roll.webp",
  },
  {
    name: "Revit MEP Electrical Masterclass",
    provider: "Udemy",
    date: "June 20, 2026 | 17.5 hours",
    category: "Electrical Design & BIM",
    description: "Electrical modelling, system coordination, family modification and drawing-sheet production in Revit MEP.",
    href: "/certificates/revit-mep-electrical-certificate.pdf",
    previewSrc: "/assets/certificates/revit-mep.webp",
  },
  {
    name: "AutoCAD Electrical 2026: Tutorials, Exercises, and Projects",
    provider: "CADCIM Technologies | Udemy",
    date: "May 29, 2026 | 6.5 hours",
    category: "Electrical Design",
    description: "Project-based AutoCAD Electrical training supported by the MCC schematic and panel-layout work shown in this portfolio.",
    href: "/certificates/autocad-electrical-2026.pdf",
    previewSrc: "/assets/certificates/autocad-electrical.webp",
  },
  {
    name: "OSPE Membership",
    provider: "Ontario Society of Professional Engineers",
    date: "September 12, 2025 | Member No. 40057096",
    category: "Professional Membership",
    description: "Verified membership in Ontario's engineering community. This is a professional membership and does not represent P.Eng. licensure.",
    href: "/certificates/ospe-membership-certificate.pdf",
    previewSrc: "/assets/certificates/ospe-membership-certificate.webp",
  },
  {
    name: "Generative AI for Everyone",
    provider: "DeepLearning.AI | Coursera",
    date: "November 29, 2025",
    category: "AI & Professional Development",
    description: "Foundations of generative AI, its capabilities and limits, and responsible use in professional workflows.",
    href: "/certificates/generative-ai-for-everyone.pdf",
    previewSrc: "/assets/certificates/generative-ai-for-everyone.webp",
  },
  {
    name: "Procurement & Sourcing Introduction",
    provider: "Rutgers University | Coursera",
    date: "December 19, 2025",
    category: "Procurement",
    description: "Supplier sourcing, procurement structure and the commercial foundations of purchasing decisions.",
    href: "/certificates/procurement-sourcing-introduction.pdf",
    previewSrc: "/assets/certificates/procurement-sourcing-introduction.webp",
  },
  {
    name: "Procurement Basics",
    provider: "Rutgers University | Coursera",
    date: "December 25, 2025",
    category: "Procurement",
    description: "Core purchasing terminology, supplier processes and procurement decision support.",
    href: "/certificates/procurement-basics.pdf",
    previewSrc: "/assets/certificates/procurement-basics.webp",
  },
  {
    name: "Electrical Distribution Phase 2",
    provider: "Schneider Electric Engineering Lab | Egyptian Engineers Syndicate",
    date: "August 2023 | 24 hours",
    category: "Power Systems & Design",
    description: "MV and LV distribution, substation arrangements, motor control, power quality, outdoor lighting and lightning protection.",
    href: "/certificates/schneider-electrical-distribution-phase-2.pdf",
    previewSrc: "/assets/certificates/schneider-phase-2.webp",
  },
  {
    name: "Electrical Distribution Phase 1",
    provider: "Schneider Electric Engineering Lab | Egyptian Engineers Syndicate",
    date: "July 2023 | 24 hours",
    category: "Electrical Distribution",
    description: "Load estimation, LV distribution, protection, lighting, cables, single-line diagrams and earthing.",
    href: "/certificates/schneider-electrical-distribution-phase-1.pdf",
    previewSrc: "/assets/certificates/schneider-phase-1.webp",
  },
  {
    name: "KNX Building Automation",
    provider: "Schneider Electric Engineering Lab",
    date: "July 2023",
    category: "Building Systems",
    description: "Introduction to KNX building-automation architecture, devices and system applications.",
    href: "/certificates/schneider-knx-building-automation.pdf",
    previewSrc: "/assets/certificates/schneider-knx.webp",
  },
  {
    name: "Electrical Maintenance Training",
    provider: "Khalda Petroleum Company (Apache)",
    date: "August 20 to September 3, 2022",
    category: "Industrial Training",
    description: "Field exposure to MV systems, transformers, ESP motors, variable speed drives, maintenance practices and HSE.",
    href: "/certificates/khalda-petroleum-electrical-training.pdf",
    previewSrc: "/assets/certificates/khalda-petroleum-electrical-training.webp",
  },
  {
    name: "Solar Energy Training - El Serag Project",
    provider: "Smart Solar Company",
    date: "September 30, 2021",
    category: "Solar Energy",
    description: "Solar-station training connected to the El Serag Refrigerator Project and practical rooftop PV work.",
    href: "/certificates/smart-solar-training.pdf",
    previewSrc: "/assets/certificates/smart-solar-training.webp",
  },
  {
    name: "Renewable Energy Technologies",
    provider: "New and Renewable Energy Authority (NREA)",
    date: "August 1 to September 3, 2020 | 4 weeks",
    category: "Renewable Energy",
    description: "Four-week training program in renewable-energy technologies and their electrical-energy applications.",
    href: "/certificates/nrea-renewable-energy-technologies.pdf",
    previewSrc: "/assets/certificates/nrea-renewable-energy-technologies.webp",
  },
  {
    name: "Renewable Energy Intensive Course",
    provider: "Arab Organization for Industrialization | AREECO",
    date: "July 24 to 28, 2022",
    category: "Renewable Energy",
    description: "Intensive renewable-energy training completed through AREECO, part of the Arab Organization for Industrialization.",
    href: "/certificates/areeco-renewable-energy-training.pdf",
    previewSrc: "/assets/certificates/areeco-renewable-energy-training.webp",
  },
  {
    name: "Automotive & Renewable Energy Summer School",
    provider: "Europ.Education | Italy",
    date: "September 20 to 29, 2022",
    category: "International Training",
    description: "Ten-day international program combining automotive engineering and renewable-energy learning in Italy.",
    href: "/certificates/automotive-renewable-energy-summer-school-italy.pdf",
    previewSrc: "/assets/certificates/automotive-renewable-energy-summer-school-italy.webp",
  },
  {
    name: "Innovation Formula: Engine & Performance",
    provider: "Museo Ferrari | Europ.Education",
    date: "September 21, 2022",
    category: "Automotive Engineering",
    description: "Advanced workshop focused on engine architecture and performance within Ferrari's Innovation Formula program.",
    href: "/certificates/ferrari-engine-performance-workshop.pdf",
    previewSrc: "/assets/certificates/ferrari-engine-performance-workshop.webp",
  },
  {
    name: "Innovation Formula: Vehicle Dynamics & Aerodynamics",
    provider: "Museo Ferrari | Europ.Education",
    date: "September 21, 2022",
    category: "Automotive Engineering",
    description: "Workshop focused on dynamics and aerodynamics in very high-performance vehicles.",
    href: "/certificates/ferrari-vehicle-dynamics-aerodynamics-workshop.pdf",
    previewSrc: "/assets/certificates/ferrari-vehicle-dynamics-aerodynamics-workshop.webp",
  },
  {
    name: "Italy Engineering Winter Workshop",
    provider: "Europ.Education | PIN - Polo Universitario Citta di Prato",
    date: "January 25 to February 3, 2020",
    category: "International Training",
    description: "Engineering winter workshop completed in Italy during undergraduate electrical-energy study.",
    href: "/certificates/italy-engineering-winter-workshop.pdf",
    previewSrc: "/assets/certificates/italy-engineering-winter-workshop.webp",
  },
  {
    name: "SmallSat Workshop",
    provider: "National Authority for Remote Sensing & Space Sciences | AASTMT",
    date: "August 28 to September 2, 2021",
    category: "Technical Workshop",
    description: "Six-day workshop introducing small-satellite systems through Egypt's national remote-sensing authority and AASTMT.",
    href: "/certificates/smallsat-workshop.pdf",
    previewSrc: "/assets/certificates/smallsat-workshop.webp",
  },
  {
    name: "8th Egyptian Robot Olympiad - National Finals",
    provider: "Egypt World Robot Olympiad | IDEASGYM",
    date: "September 12, 2018",
    category: "Robotics Competition",
    description: "Participation in the National Finals Senior High category of the 8th Egyptian Robot Olympiad.",
    href: "/certificates/egyptian-robot-olympiad-2018.pdf",
    previewSrc: "/assets/certificates/egyptian-robot-olympiad-2018.webp",
  },
];

function EducationSection() {
  const mengCourses = [
    "Power System Analysis & Control",
    "Advanced Energy Storage Systems",
    "EV Power Conversion",
    "Engineering Project Management",
    "Image Processing",
    "MATLAB & Simulink",
    "Engineering Technical Communications",
    "Engineering Mathematics",
  ];

  const bscAreas = [
    "Power Systems",
    "Power Electronics",
    "Electrical Machines",
    "High Voltage",
    "Protection",
    "Control Systems",
    "Renewable Energy",
    "Electrical Design",
  ];

  return (
    <section id="education" className="education-section" aria-labelledby="education-title">
        <div className="education-shell">
          <header className="education-heading">
            <div>
              <p className="section-label section-label-light">Education</p>
              <h2 id="education-title">Engineering foundation,<br />strengthened in Canada.</h2>
            </div>
            <p>
              Graduate study in electrical and computer engineering builds on an honours
              undergraduate foundation in electrical energy engineering.
            </p>
          </header>

          <div className="education-grid">
            <article className="education-card education-card-meng">
              <div className="education-card-index"><span>01</span><span>Graduate Education</span></div>
              <div className="education-card-main">
                <p>University of Windsor</p>
                <h3>Master of Engineering in Electrical and Computer Engineering</h3>
                <span className="education-program-note">Co-operative Education | January 2025 to April 2026</span>
                <div className="education-grade">
                  <strong>93.13%</strong>
                  <div><span>3.73 / 4.0</span><span>Honour Roll</span></div>
                </div>
                <a id="honour-roll-evidence" className="education-honour-link" href="/certificates/university-of-windsor-meng-honour-roll.pdf" target="_blank" rel="noreferrer">
                  <span>Academic Recognition</span>
                  <strong>View Master of Engineering Honour Roll</strong>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
                <figure className="education-photo">
                  <img src="/assets/education/meng-graduation.webp" alt="Ahmed ElMetwally at his Master of Engineering graduation wearing honour cords" loading="lazy" />
                  <figcaption>Master of Engineering graduation | Honour cords and academic recognition</figcaption>
                </figure>
                <p className="education-summary">
                  Completed all degree requirements, including the engineering co-op work term.
                  Coursework concentrated on power systems, energy storage, EV conversion,
                  engineering modelling using MATLAB, Simulink and PSAT, and project management.
                </p>
              </div>
              <div className="education-coursework" aria-label="Master of Engineering coursework">
                <p>Selected coursework</p>
                <div>{mengCourses.map((course) => <span key={course}>{course}</span>)}</div>
              </div>
            </article>

            <article className="education-card education-card-bsc">
              <div className="education-card-index"><span>02</span><span>Undergraduate Education</span></div>
              <div className="education-card-main">
                <p>Arab Academy for Science and Technology | Cairo, Egypt</p>
                <h3>Bachelor of Science in Electrical Energy Engineering</h3>
                <span className="education-program-note">ABET-accredited | September 2018 to July 2023</span>
                <div className="education-grade">
                  <strong>95%</strong>
                  <div><span>3.8 / 4.0</span><span>Excellent with Honours | Top-three academic standing</span></div>
                </div>
                <figure className="education-photo education-photo-bsc">
                  <img src="/assets/education/bsc-graduation.webp" alt="Ahmed ElMetwally at his Bachelor of Science graduation holding his degree certificate" loading="lazy" />
                  <figcaption>Bachelor of Science graduation | Electrical Energy Engineering</figcaption>
                </figure>
                <p className="education-summary">
                  Built a broad electrical-energy foundation through power-system analysis,
                  machines, protection, power electronics, control, high voltage and renewable-energy projects.
                </p>
              </div>
              <div className="education-coursework" aria-label="Bachelor of Science technical areas">
                <p>Technical foundation</p>
                <div>{bscAreas.map((area) => <span key={area}>{area}</span>)}</div>
              </div>
            </article>
          </div>
        </div>
    </section>
  );
}

function CertificationsContact() {
  const contactInterests = [
    "Power Systems",
    "Electrical Design",
    "Renewable Energy",
    "EV Batteries",
    "Project Coordination",
    "Supplier Engineering",
  ];

  return (
    <>
      <section id="certifications" className="certifications-section" aria-labelledby="certifications-title">
        <div className="certifications-shell">
          <header className="certifications-heading">
            <div>
              <p className="section-label">Certifications &amp; Training</p>
              <h2 id="certifications-title">Continued technical development.</h2>
            </div>
            <p>
              Verified courses and substantial training across electrical design, distribution,
              renewable energy, procurement, automation and professional tools. Every credential
              shown below includes its original PDF evidence.
            </p>
          </header>

          <div className="certification-grid">
            {credentials.map((credential, index) => (
              <article className="certification-card" key={credential.name}>
                <div className="certification-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{credential.category}</span>
                </div>
                {credential.previewSrc && credential.href ? (
                  <a className="certification-preview" href={credential.href} target="_blank" rel="noreferrer" aria-label={`View ${credential.name} credential`}>
                    <img src={credential.previewSrc} alt={`${credential.name} certificate for Ahmed ElMetwally`} loading="lazy" />
                  </a>
                ) : null}
                <h3>{credential.name}</h3>
                <p className="certification-provider">{credential.provider}</p>
                <p className="certification-description">{credential.description}</p>
                <div className="certification-footer">
                  <time>{credential.date}</time>
                  {credential.href ? (
                    <a href={credential.href} target="_blank" rel="noreferrer">
                      View Credential
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    </a>
                  ) : <span>Verified training</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-grid-lines" aria-hidden="true" />
        <div className="contact-shell">
          <div className="contact-copy">
            <p className="section-label section-label-light">Contact</p>
            <h2 id="contact-title">Let&apos;s connect.</h2>
            <p>
              I am open to early-career opportunities in Canada across electrical engineering,
              power systems, electrical design, renewable energy, EV batteries, project coordination
              and supplier-focused technical work.
            </p>
            <div className="contact-interests" aria-label="Areas of interest">
              {contactInterests.map((interest) => <span key={interest}>{interest}</span>)}
            </div>
          </div>

          <div className="contact-links" aria-label="Contact details">
            <a href="mailto:ahmedoelmetwally@gmail.com">
              <span>01 | Email</span>
              <strong>ahmedoelmetwally@gmail.com</strong>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
            <a href="tel:+12263400506">
              <span>02 | Phone</span>
              <strong>+1 (226) 340-0506</strong>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/ahmedoelmetwally/" target="_blank" rel="noreferrer">
              <span>03 | LinkedIn</span>
              <strong>linkedin.com/in/ahmedoelmetwally</strong>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
            <a href="/resume/Ahmed-ElMetwally-Resume.pdf" target="_blank" rel="noreferrer">
              <span>04 | Resume</span>
              <strong>View current resume</strong>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
          </div>
        </div>
        <footer className="site-footer">
          <p>© 2026 Ahmed ElMetwally</p>
          <p>Electrical Engineering Portfolio</p>
          <a href="#hero">Back to top <span aria-hidden="true">↑</span></a>
        </footer>
      </section>
    </>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const searchResults = normalizedSearchQuery
    ? portfolioSearchItems.filter((item) =>
        [item.title, item.category, item.summary, ...item.keywords]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearchQuery)
      )
    : portfolioSearchItems.slice(0, 5);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();

    const onPointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target as Node;
      if (searchPanelRef.current?.contains(target) || searchButtonRef.current?.contains(target)) return;
      setSearchOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [searchOpen]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".featured-heading, .featured-stage-shell, .about-heading, .about-focus, .impact-grid, .expertise-heading, .expertise-grid, .experience-heading, .experience-role, .additional-experience, .projects-heading, .project-discipline-nav, .project-discipline-header, .project-case-study, .technical-project-card, .additional-projects-grid, .education-heading, .education-card, .certifications-heading, .certification-grid, .contact-copy, .contact-links"
    ));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("reveal-visible"));
      return;
    }

    targets.forEach((target, index) => {
      target.classList.add("reveal-item");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onAnchorClick = (event: MouseEvent) => {
      const origin = event.target as Element | null;
      const anchor = origin?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute("href")?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      event.preventDefault();
      window.cancelAnimationFrame(frame);
      const start = window.scrollY;
      const destination = Math.max(0, target.getBoundingClientRect().top + start - 82);

      if (reducedMotion) {
        window.scrollTo(0, destination);
      } else {
        const startedAt = performance.now();
        const duration = 620;
        const step = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          window.scrollTo(0, start + (destination - start) * eased);
          if (progress < 1) frame = window.requestAnimationFrame(step);
        };
        frame = window.requestAnimationFrame(step);
      }

      window.history.replaceState(null, "", `#${targetId}`);
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-shell">
          <a className="brand" href="#hero" aria-label="Ahmed ElMetwally, home">
            <span className="brand-portrait" aria-hidden="true">
              <img src="/assets/about/ahmed-portrait.webp" alt="" />
            </span>
            <span>Ahmed ElMetwally</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              ref={searchButtonRef}
              className={`header-search-button ${searchOpen ? "is-open" : ""}`}
              type="button"
              aria-label={searchOpen ? "Close portfolio search" : "Search portfolio"}
              aria-expanded={searchOpen}
              aria-controls="portfolio-search"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen((value) => !value);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
              <span>Search</span>
            </button>
            <a className="nav-cta" href="#contact">Let&apos;s Connect</a>
            <button
              className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen((value) => !value);
              }}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div
          ref={searchPanelRef}
          id="portfolio-search"
          className={`portfolio-search-panel ${searchOpen ? "is-open" : ""}`}
          role="search"
          aria-label="Search Ahmed ElMetwally's portfolio"
          aria-hidden={!searchOpen}
        >
          <div className="portfolio-search-head">
            <div>
              <span>Portfolio Search</span>
              <strong>Find the evidence that matters to your role.</strong>
            </div>
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close portfolio search">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <label className="portfolio-search-input" htmlFor="portfolio-search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
            <input
              ref={searchInputRef}
              id="portfolio-search-field"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search skills, projects, tools or experience"
              autoComplete="off"
            />
            {searchQuery ? (
              <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search">Clear</button>
            ) : <kbd>ESC</kbd>}
          </label>
          <div className="portfolio-search-keywords" aria-label="Popular hiring keywords">
            <span>Popular hiring keywords</span>
            <div>
              {popularSearchKeywords.map((keyword) => (
                <button key={keyword} type="button" onClick={() => setSearchQuery(keyword)}>{keyword}</button>
              ))}
            </div>
          </div>
          <div className="portfolio-search-results" aria-live="polite">
            <div className="portfolio-search-results-head">
              <span>{normalizedSearchQuery ? `${searchResults.length} matches` : "Suggested paths"}</span>
              <small>Click a result to jump directly to the evidence</small>
            </div>
            {searchResults.length ? (
              <div className="portfolio-search-result-list">
                {searchResults.map((item) => (
                  <a key={`${item.title}-${item.href}`} href={item.href} onClick={() => setSearchOpen(false)}>
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                  </a>
                ))}
              </div>
            ) : (
              <p className="portfolio-search-empty">No exact match yet. Try Electrical Design, Power Systems, EV Batteries, Procurement or MATLAB.</p>
            )}
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-inner">
            {navItems.map((item, index) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
              </a>
            ))}
            <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              Let&apos;s Connect
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero-section" aria-labelledby="hero-title">
          <ParticleCanvas />
          <div className="hero-ribbon ribbon-one" aria-hidden="true" />
          <div className="hero-ribbon ribbon-two" aria-hidden="true" />
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-container">
            <div className="hero-copy">
              <div className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                Open to early-career engineering opportunities in Canada
              </div>
              <p className="hero-kicker">Electrical Engineering Graduate, MEng</p>
              <div className="hero-name-lockup">
                <figure className="hero-portrait" aria-label="Portrait of Ahmed ElMetwally">
                  <img src="/assets/about/ahmed-portrait.webp" alt="Portrait of Ahmed ElMetwally" />
                </figure>
                <h1 id="hero-title"><span>Ahmed</span><span>ElMetwally</span></h1>
              </div>
              <p className="hero-disciplines">
                Power Systems <span>•</span> Electrical Design <span>•</span> Renewable Energy{" "}
                <span>•</span> EV Batteries <span>•</span> Project Coordination
              </p>
              <p className="hero-intro">
                I combine graduate engineering study with professional experience in energy
                analysis, supplier operations and project coordination. My work spans
                power-system modelling, electrical design, renewable energy and practical battery projects.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#featured">
                  View Engineering Work
                  <svg className="wrench-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
                  </svg>
                </a>
                <a className="button button-secondary" href="#contact">Contact Me</a>
              </div>
              <ul className="hero-meta" aria-label="Professional details">
                <li><span>Education</span>Master of Engineering (MEng)</li>
                <li><span>Professional path</span>EIT (EGBC) Pending</li>
                <li><span>Focus:</span>Electrical engineering</li>
              </ul>
            </div>

            <aside className="hero-visual" aria-label="Engineering focus areas">
              <div className="visual-topline"><span>01</span><span>Electrical Engineering Portfolio</span></div>
              <div className="visual-structure" aria-hidden="true">
                <span className="beam beam-a" /><span className="beam beam-b" /><span className="beam beam-c" />
                <span className="structure-node node-a" /><span className="structure-node node-b" /><span className="structure-node node-c" />
              </div>
              <div className="focus-stack">
                <p className="focus-label">Engineering focus</p>
                <div className="focus-row"><span>01</span><strong>Power systems</strong></div>
                <div className="focus-row"><span>02</span><strong>Electrical design</strong></div>
                <div className="focus-row"><span>03</span><strong>Energy &amp; EV systems</strong></div>
                <div className="focus-row"><span>04</span><strong>Project coordination</strong></div>
              </div>
              <div className="visual-proof" aria-label="Academic results">
                <div className="proof-row">
                  <div>
                    <span className="proof-institution">University of Windsor</span>
                    <p>MEng cumulative average | Honour Roll</p>
                  </div>
                  <strong className="proof-grade">
                    <span className="grade-main">93.13%</span>
                    <small>3.73/4</small>
                  </strong>
                </div>
                <div className="proof-row">
                  <div>
                    <span className="proof-institution">Arab Academy for Science and Technology</span>
                    <span className="proof-accreditation">ABET-accredited program</span>
                    <p>BSc Electrical Energy Engineering | Excellent with Honours</p>
                  </div>
                  <strong className="proof-grade">
                    <span className="grade-main">95%</span>
                    <small>3.8/4</small>
                  </strong>
                </div>
              </div>
            </aside>
          </div>
          <div className="hero-bottom">
            <a href="#featured" className="scroll-cue"><span aria-hidden="true" />Scroll to selected work</a>
            <p>Engineering evidence, measured outcomes and authentic project work.</p>
          </div>
        </section>

        <FeaturedWork />
        <AboutExpertise />
        <ProfessionalExperience />
        <EducationSection />
        <SelectedProjects />
        <CertificationsContact />
      </main>
      <nav className="floating-contact-dock" aria-label="Quick contact">
        <a className="floating-contact-primary" href="#contact">
          <span>Let&apos;s Connect</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </a>
        <a href="mailto:ahmedoelmetwally@gmail.com" aria-label="Email Ahmed ElMetwally">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" /></svg>
          <span>Email</span>
        </a>
        <a href="https://www.linkedin.com/in/ahmedoelmetwally/" target="_blank" rel="noreferrer" aria-label="Ahmed ElMetwally on LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9v8M7 6.5v.01M11 17v-4.5a3 3 0 0 1 6 0V17M11 9v8" /></svg>
          <span>LinkedIn</span>
        </a>
      </nav>
    </div>
  );
}
