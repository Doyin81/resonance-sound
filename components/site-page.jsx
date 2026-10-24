"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "../lib/services";

const googleFormAction = "https://docs.google.com/forms/d/e/1FAIpQLSdDzC23pfxyqGqdDTNzJ21jWmC935EWGnKmVV5HseRsB3Q68g/formResponse";
const whatsapp = "https://wa.me/2348168259465";
const fieldLabels = { name: "Name", email: "Email", phone: "Phone", service: "Service", date: "Date", time: "Start time", hours: "Hours", venue: "Venue", notes: "Notes" };
const serviceCategories = {
  "Studio production": "Recording, Mixing & Mastering,",
  "Live sound production": "Live Sound Engineering",
  "Equipment rentals": "Equipment Rental",
  "Personal sound engineer": "Live Sound Engineering",
  "Church sound upgrades": "Live Sound Engineering",
  Training: "Studio sessions",
  Consultation: "Studio sessions",
};
const initialBooking = { name: "", email: "", phone: "", service: services[0].name, date: "", time: "", hours: "3", venue: "", notes: "" };

function ServiceCard({ service }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = service.gallery?.[photoIndex];

  function shiftPhoto(amount) {
    setPhotoIndex((index) => (index + amount + service.gallery.length) % service.gallery.length);
  }

  return (
    <article className="svc">
      {photo ? (
        <>
          <div className="svc-gallery">
            <img src={photo.src} alt={photo.alt} />
            <span className="svc-gallery-caption">{photo.caption}</span>
            <div className="svc-gallery-controls">
              <button type="button" aria-label="Previous equipment photo" onClick={() => shiftPhoto(-1)}>‹</button>
              <button type="button" aria-label="Next equipment photo" onClick={() => shiftPhoto(1)}>›</button>
            </div>
          </div>
          <div className="svc-gallery-meta">
            <span>{photoIndex + 1} / {service.gallery.length}</span>
            <a href={photo.source} target="_blank" rel="noreferrer">Photo by {photo.credit} on Unsplash</a>
          </div>
        </>
      ) : (
        <img src={service.image} alt={service.imageAlt} loading="lazy" />
      )}
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <dl>
        <div><dt>Best for</dt><dd>{service.bestFor}</dd></div>
        <div><dt>You get</dt><dd>{service.included}</dd></div>
      </dl>
      <Link className="btn" href={`/book?service=${encodeURIComponent(service.name)}`}>Book this service</Link>
    </article>
  );
}

function ServiceTabs({ showPanel = true }) {
  const [selected, setSelected] = useState(0);
  const service = services[selected];
  return (
    <div className="console">
      <h2>What are you planning?</h2>
      <div className="tabs" role="tablist" aria-label="Services">
        {services.map((item, index) => (
          <button key={item.name} type="button" role="tab" aria-selected={selected === index} onClick={() => setSelected(index)}>{item.name}</button>
        ))}
      </div>
      {showPanel && (
        <div className="detail" role="tabpanel" aria-live="polite">
          <div><h3>{service.name}</h3><p>{service.description}</p><Link className="btn" href={`/book?service=${encodeURIComponent(service.name)}`}>Book this service</Link></div>
          <dl><div><dt>Best for</dt><dd>{service.bestFor}</dd></div><div><dt>You get</dt><dd>{service.included}</dd></div></dl>
        </div>
      )}
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="band">
      <h2>How a booking works</h2>
      <ol className="steps">
        <li><h3>Tell us the plan</h3><p>Pick a service, a date and a time. Add notes about the song, event or project.</p></li>
        <li><h3>Get a quote</h3><p>We confirm availability, equipment and price, and agree the details with you.</p></li>
        <li><h3>Show up and sound great</h3><p>We handle setup, recording or mixing, and deliver your files when the work is done.</p></li>
      </ol>
    </section>
  );
}

function CallToAction({ title, text, secondary = false }) {
  return (
    <section className="cta">
      <h2>{title}</h2><p>{text}</p>
      <div className="row">
        <Link className="btn" href="/book">Book a session</Link>
        {secondary && <a className="btn alt" href={whatsapp}>WhatsApp 0816 825 9465</a>}
      </div>
    </section>
  );
}

function ExplorePage() {
  return (
    <div className="wrap">
      <section className="hero stage">
        <div className="wave" aria-hidden="true">{Array.from({ length: 56 }, (_, index) => <span key={index} style={{ "--i": index }} />)}</div>
        <div className="copy">
          <p className="eyebrow"><i className="rec" />Now booking live sound and studio sessions</p>
          <h1>Make it sound <span className="hl">unforgettable.</span></h1>
          <p>Studio sessions, live sound, rentals and a personal engineer for your show. We make sure every note lands.</p>
          <div className="row"><Link className="btn" href="/book">Book a session</Link><Link className="btn alt" href="/services">Explore services</Link></div>
        </div>
      </section>
      <div className="ticker" aria-hidden="true"><div className="t">{[...services, ...services].map((item, index) => <span key={`${item.name}-${index}`}>{item.name} <b>/</b></span>)}</div></div>
      <ServiceTabs />
      <section className="explore-gallery">
        <h2>The moments behind the sound</h2><p>A closer look at the sound systems and people behind the work.</p>
        <div className="explore-gallery-grid">
          <figure><img src="https://www.dbevents.co.nz/wp-content/uploads/2021/03/line-array-stack-main-600x600.png" alt="Pair of line-array speaker stacks and subwoofers" loading="lazy" /><figcaption>Line-array speakers</figcaption></figure>
          <figure><img className="product-photo" src="https://behringer.com/wing/products/wing.png" alt="Behringer WING digital mixing console" loading="lazy" /><figcaption>Behringer WING</figcaption></figure>
          <figure><video className="explore-gallery-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1}><source src="/assets/awhizy-global-motion-graphic.mp4" type="video/mp4" /></video><figcaption>Behind the scenes</figcaption></figure>
        </div>
      </section>
      <section className="explore-video">
        <video controls playsInline preload="metadata" aria-label="Mini studio arrangement for a client"><source src="/assets/explore-mini-studio.mp4?v=bd3d83791a00" type="video/mp4" />Your browser does not support video playback.</video>
        <div><h2>Mini studio arrangement for a client</h2><p>See a recent mini studio setup arranged for one of our clients.</p></div>
      </section>
      <HowItWorks />
      <CallToAction title="Have a date in mind?" text="Send a request in two minutes. Nothing is final until you approve the quote." secondary />
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="wrap">
      <section className="hero services-hero"><div><h1>Our services</h1><p>Everything from studio production to live sound, equipment rentals and a personal sound engineer for your concert. Pick what you need and book it.</p></div><div className="services-photo"><img src="/assets/equalizer.svg" alt="Animated graphic equalizer with live RTA frequency spectrum" /><span>Sound, shaped for the moment.</span></div></section>
      <div className="grid">{services.map((service) => <ServiceCard key={service.name} service={service} />)}</div>
      <CallToAction title="Not sure what you need?" text="Book a consultation and we will plan it with you." secondary />
    </div>
  );
}

function AboutPage() {
  return (
    <>
      <section className="about-hero"><video className="about-hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1}><source src="/assets/resonance-awhizy-global-motion-graphic.mp4" type="video/mp4" /></video><div className="wrap"><h1>About us</h1><p>Professional sound, carefully engineered for every space and moment.</p><img className="about-hero-logo" src="/assets/resonance-logo-animated-dark.svg" alt="Resonance by Awhizy" width="300" height="80" /></div></section>
      <div className="wrap">
        <section className="band about-copy"><h2>Who we are</h2><p>We are a sound production company helping artists, churches, event organisers, studios, and individuals get clear, dependable audio. We bring together experienced engineering, practical planning, and the right equipment for each project.</p><p>From the first conversation through setup and delivery, we focus on understanding the space, audience, and goals so every sound solution fits the people using it.</p></section>
        <section className="band about-copy"><h2>Our vision</h2><p>To be the most trusted sound production company in Nigeria, known for clear sound, dependable service and the engineers we train.</p><h2>Our mission</h2><p>To deliver professional live sound, studio production, equipment rentals, church sound upgrades, training and consultation, so that every voice is heard clearly, through technical excellence and honest service.</p></section>
        <section className="about-gallery" aria-label="Resonance Sound in action">
          <figure><img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80" alt="Musician recording in a studio" loading="lazy" /><figcaption>Studio recording</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80" alt="Crowd at a live music event" loading="lazy" /><figcaption>Live sound</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80" alt="Church prepared for a service" loading="lazy" /><figcaption>Church audio</figcaption></figure>
        </section>
        <section className="band about-copy"><h2>What we do</h2><ul>
          <li>Professional live sound engineering and event audio support.</li><li>Church sound system setup, configuration, and optimisation.</li><li>Audio consultancy and sound system planning.</li><li>Training for sound engineers and technical teams.</li><li>Livestream audio setup and management.</li><li>Studio recording and audio production.</li><li>DJ and event sound system setup.</li><li>Microphone, mixer, amplifier, monitor, and speaker configuration.</li><li>Audio troubleshooting, system maintenance, and technical support.</li>
        </ul><h2 className="section-heading">Our commitment</h2><p>We believe that every voice deserves to be heard clearly and every sound experience deserves professional attention. We are committed to quality, technical excellence, continuous learning, and client satisfaction.</p><p>Our goal is to help clients get the best performance from their audio systems through professional service, practical knowledge, and solutions tailored to their needs.</p><p><strong>Professional Sound. Technical Excellence. Exceptional Experiences.</strong></p></section>
        <CallToAction title="Let us work on your sound" text="Tell us about your event, church or recording and we will plan it with you." secondary />
      </div>
    </>
  );
}

function MeetPage() {
  return (
    <>
      <section className="meet-hero"><div className="wrap"><div className="meet-copy"><p className="meet-kicker">Founder · Sound Engineer</p><h1>Meet Awhizy</h1><p className="meet-role">Ayomikun Adedoyin</p><p className="meet-summary">Sound engineer and technical project manager.</p><div className="meet-tags" aria-label="Areas of work"><span>Live sound</span><span>Audio production</span><span>Church audio</span></div><div className="meet-actions"><Link className="btn" href="/book">Book a session</Link><Link className="btn alt" href="/services">Explore services</Link></div></div><div className="meet-art"><img src="/assets/ceo.jpeg" alt="Awhizy, Resonance Sound founder and CEO" width="960" height="1280" /><div className="meet-brandplate"><img className="meet-logo" src="/assets/resonance-logo-animated-dark.svg" alt="Resonance by Awhizy" width="300" height="80" /></div><div className="meet-bars" aria-hidden="true">{[22, 40, 30, 48, 25].map((height, index) => <i key={index} style={{ "--bar": `${height}px`, "--delay": `${-(index + 1) / 10}s` }} />)}</div></div></div></section>
      <div className="wrap"><section className="band about-copy"><h2>Experience &amp; approach</h2><p>I am a Sound Engineer, Audio Production Specialist, and Technical Project Manager with a strong passion for delivering exceptional sound experiences through professional audio engineering, technical expertise, and creative problem-solving.</p><p>As the founder, I am committed to helping churches, event organisers, DJs, studios, and individuals achieve clear, balanced, powerful, and professional sound. My experience spans live sound engineering, church sound system installation and setup, audio production, livestream audio, recording, sound system configuration, and technical troubleshooting.</p><p>My approach combines technical knowledge with practical experience in managing audio equipment, configuring mixers and speaker systems, optimising microphones and monitors, managing subwoofers and crossovers, and troubleshooting sound-related challenges to achieve the best possible results.</p><p>Beyond sound engineering, I have experience leading technical teams, coordinating technical projects, and ensuring that audio systems are properly planned, configured, and operated. I understand that excellent sound is not simply about having quality equipment; it requires the right setup, proper gain staging, effective system management, attention to detail, and a clear understanding of the environment and audience.</p></section><CallToAction title="Work with us" text="Tell us about your event, church or recording and our team will help plan it." secondary /></div>
    </>
  );
}

function BookingPage() {
  const [booking, setBooking] = useState(initialBooking);
  const [draftReady, setDraftReady] = useState(false);
  const [errors, setErrors] = useState("");
  const [status, setStatus] = useState("");
  const [summaryVisible, setSummaryVisible] = useState(false);
  const googleFormRef = useRef(null);
  const submittedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem("rs-draft") || "{}");
      setBooking((current) => ({ ...current, ...draft }));
    } catch {}
    const initialService = new URLSearchParams(window.location.search).get("service");
    if (initialService && serviceCategories[initialService]) setBooking((current) => ({ ...current, service: initialService }));
    setDraftReady(true);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (draftReady) {
      try { localStorage.setItem("rs-draft", JSON.stringify(booking)); } catch {}
    }
  }, [booking, draftReady]);

  function update(field, value) {
    setBooking((current) => ({ ...current, [field]: value }));
    setErrors("");
    setStatus("");
    setSummaryVisible(false);
  }

  function handleGoogleLoad() {
    if (!submittedRef.current) return;
    submittedRef.current = false;
    clearTimeout(timerRef.current);
    setStatus("sent");
  }

  function submit(event) {
    event.preventDefault();
    const messages = [];
    if (!booking.name.trim()) messages.push("Enter your name.");
    if (!booking.email.trim()) messages.push("Enter your email address; the booking form requires it.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email.trim())) messages.push("Enter a valid email address.");
    if (!booking.date) messages.push("Choose a date.");
    if (!booking.time) messages.push("Choose a start time.");
    if (!booking.hours || Number(booking.hours) < 1 || Number(booking.hours) > 12) messages.push("Enter between 1 and 12 hours.");
    if (!serviceCategories[booking.service]) messages.push("This service cannot be submitted from this form. Please choose another service.");
    if (messages.length) { setErrors(messages.join(" ")); setSummaryVisible(false); return; }

    const [year, month, day] = booking.date.split("-");
    const [hour, minute] = booking.time.split(":");
    const notes = [`Website service selected: ${booking.service}`];
    if (booking.phone.trim()) notes.push(`Phone/WhatsApp: ${booking.phone.trim()}`);
    if (booking.notes.trim()) notes.push(`Additional notes: ${booking.notes.trim()}`);
    const fields = {
      "entry.29370910": booking.name.trim(),
      "entry.1089605430": booking.email.trim(),
      "entry.2007903094": serviceCategories[booking.service],
      "entry.323005754_year": year,
      "entry.323005754_month": month,
      "entry.323005754_day": day,
      "entry.2028300715_hour": hour,
      "entry.2028300715_minute": minute,
      "entry.987832554": booking.hours,
      "entry.1786880766": booking.venue.trim(),
      "entry.1397370559": notes.join("\n\n"),
    };
    const form = googleFormRef.current;
    form.replaceChildren(...Object.entries(fields).map(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }));
    submittedRef.current = true;
    setSummaryVisible(true);
    setStatus("submitting");
    form.submit();
    timerRef.current = setTimeout(() => {
      if (!submittedRef.current) return;
      submittedRef.current = false;
      setStatus("unconfirmed");
    }, 15000);
  }

  const emailBody = Object.entries(fieldLabels).filter(([key]) => booking[key]?.trim()).map(([key, label]) => `${label}: ${booking[key]}`).join("\n");
  const emailHref = `mailto:${encodeURIComponent(booking.email.trim())}?subject=${encodeURIComponent("Your Resonance Sound booking request")}&body=${encodeURIComponent(`Booking request\n${emailBody}`)}`;

  return (
    <div className="wrap book">
      <div><h1>Book a session</h1><p className="book-intro">Send your booking request using our Google Form. We reply with a quote and confirm the date.</p><p className="quote-promise">Your quote will be sent within 24 hours.</p><p className="book-hint">Complete the form below to send your request to our booking form. After submission, you can open a prefilled email draft addressed to yourself and press Send to receive a copy.</p>
        <form className="booking-form" onSubmit={submit} noValidate>
          <div className="f"><label htmlFor="name">Full name</label><input id="name" autoComplete="name" value={booking.name} onChange={(event) => update("name", event.target.value)} /></div>
          <div className="f"><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" value={booking.email} onChange={(event) => update("email", event.target.value)} /></div>
          <div className="f"><label htmlFor="phone">Phone or WhatsApp</label><input id="phone" type="tel" autoComplete="tel" value={booking.phone} onChange={(event) => update("phone", event.target.value)} /></div>
          <div className="f"><label htmlFor="service">Service</label><select id="service" value={booking.service} onChange={(event) => update("service", event.target.value)}>{services.map((service) => <option key={service.name}>{service.name}</option>)}</select></div>
          <div className="f"><label htmlFor="date">Date</label><input id="date" type="date" min={new Date().toISOString().slice(0, 10)} value={booking.date} onChange={(event) => update("date", event.target.value)} /></div>
          <div className="f"><label htmlFor="time">Start time</label><input id="time" type="time" value={booking.time} onChange={(event) => update("time", event.target.value)} /></div>
          <div className="f"><label htmlFor="hours">Hours needed</label><input id="hours" type="number" min="1" max="12" value={booking.hours} onChange={(event) => update("hours", event.target.value)} /></div>
          <div className="f"><label htmlFor="venue">Studio or venue</label><input id="venue" placeholder="Our studio, or your venue" value={booking.venue} onChange={(event) => update("venue", event.target.value)} /></div>
          <div className="f full"><label htmlFor="notes">Notes</label><textarea id="notes" placeholder="Number of singers, instruments, expected crowd, anything we should prepare" value={booking.notes} onChange={(event) => update("notes", event.target.value)} /></div>
          {errors && <p className="err" role="alert">{errors}</p>}
          <div className="f full"><button className="btn" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting..." : "Review booking request"}</button></div>
        </form>
        {status && status !== "submitting" && <div className="done" role="status"><h3>{status === "sent" ? "Your request was sent" : "We couldn't confirm the submission"}</h3><p>{status === "sent" ? "The request was sent to Google Forms. This page cannot confirm Google's receipt. You can open a prefilled email to yourself below; press Send in your email app to receive the copy." : "The request may not have reached Google Forms. Please try submitting your request again."}</p>{status === "sent" && <a className="btn" href={emailHref}>Email me a copy</a>}</div>}
      </div>
      <aside className="ticket" aria-label="Request summary" aria-hidden={!summaryVisible} inert={!summaryVisible}>
        <h2>Your request</h2><dl>{Object.entries(fieldLabels).filter(([key]) => key !== "notes").map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{booking[key] || "Not added yet"}</dd></div>)}</dl>
      </aside>
      <iframe className="hidden-frame" name="google-form-target" title="Google booking form submission" onLoad={handleGoogleLoad} />
      <form ref={googleFormRef} action={googleFormAction} method="post" target="google-form-target" hidden />
    </div>
  );
}

export default function SitePage({ view }) {
  if (view === "services") return <ServicesPage />;
  if (view === "about") return <AboutPage />;
  if (view === "meet") return <MeetPage />;
  if (view === "book") return <BookingPage />;
  return <ExplorePage />;
}
