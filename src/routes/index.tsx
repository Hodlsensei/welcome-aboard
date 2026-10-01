import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { FormEvent, useState } from "react";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(24).regex(/^[+\d\s()-]+$/),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SNIFDIT — Join the waitlist" },
      { name: "description", content: "The first SNIF is almost here. Join the waitlist for early access." },
      { property: "og:title", content: "SNIFDIT — Join the waitlist" },
      { property: "og:description", content: "The first SNIF is almost here. Join the waitlist for early access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SnifditLanding,
});

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9 fill-current">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.5-2.87V9.3a6.33 6.33 0 1 0 5.95 6.32V8.68a8.16 8.16 0 0 0 4.77 1.52V6.75c-.34 0-.67-.02-1-.06Z" />
    </svg>
  );
}

function Brand() {
  return (
    <header className="text-brand text-center">
      <h1 className="font-display text-[3.25rem] font-black leading-[0.8] tracking-normal sm:text-[3.45rem]">SNIFDIT</h1>
      <p className="mt-3 text-[0.93rem] font-extrabold leading-none tracking-normal">ONE SNIF IS ALL YOU NEED</p>
    </header>
  );
}

function SnifditLanding() {
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = waitlistSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
    });

    if (!result.success) {
      setError("Please enter valid details in every field.");
      return;
    }

    setError("");
    setComplete(true);
  }

  return (
    <main className="bg-page flex min-h-dvh items-center justify-center px-5 py-10 font-body">
      <section className="bg-panel flex h-[475px] w-full max-w-[438px] flex-col rounded-[31px] px-[63px] pb-[39px] pt-[43px] sm:h-[475px]" aria-live="polite">
        <Brand />

        {complete ? (
          <div className="flex min-h-0 flex-1 flex-col text-center text-panel-foreground">
            <div className="mt-[111px]">
              <p className="text-[1.08rem] font-extrabold leading-none tracking-normal">follow the journey @snifdit</p>
              <nav aria-label="SNIFDIT social media" className="mt-4 flex items-center justify-center gap-4">
                <a href="https://www.instagram.com/snifdit" target="_blank" rel="noreferrer" aria-label="Follow SNIFDIT on Instagram" className="transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
                  <Instagram className="h-9 w-9" strokeWidth={2.35} />
                </a>
                <a href="https://www.tiktok.com/@snifdit" target="_blank" rel="noreferrer" aria-label="Follow SNIFDIT on TikTok" className="transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
                  <TikTokIcon />
                </a>
              </nav>
            </div>
            <p className="mt-auto text-[0.96rem] font-extrabold leading-none tracking-normal">SNIFFING SOON...</p>
          </div>
        ) : (
          <form onSubmit={submitWaitlist} noValidate className="mt-[42px] flex flex-1 flex-col text-center">
            <p className="text-panel-foreground text-[0.97rem] font-extrabold leading-[1.4] tracking-normal">
              The first SNIF is almost here...<br />Join the waitlist for early access.
            </p>
            <div className="mt-[43px] space-y-[13px]">
              <input name="name" type="text" autoComplete="name" required maxLength={100} aria-label="Name" placeholder="NAME" className="border-brand text-input-text placeholder:text-input-text h-[39px] w-full rounded-full border-[2px] bg-transparent px-5 text-center text-[1rem] font-medium tracking-normal outline-none transition-shadow focus:ring-2 focus:ring-brand/40" />
              <input name="email" type="email" autoComplete="email" required maxLength={255} aria-label="Email" placeholder="EMAIL" className="border-brand text-input-text placeholder:text-input-text h-[39px] w-full rounded-full border-[2px] bg-transparent px-5 text-center text-[1rem] font-medium tracking-normal outline-none transition-shadow focus:ring-2 focus:ring-brand/40" />
              <input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={24} aria-label="Phone number" placeholder="PHONE NUMBER" className="border-brand text-input-text placeholder:text-input-text h-[39px] w-full rounded-full border-[2px] bg-transparent px-5 text-center text-[1rem] font-medium tracking-normal outline-none transition-shadow focus:ring-2 focus:ring-brand/40" />
            </div>
            {error ? <p role="alert" className="text-error mt-1 text-xs font-bold">{error}</p> : null}
            <button type="submit" className="bg-brand text-panel-foreground mt-[14px] h-[39px] w-full rounded-full text-[0.94rem] font-extrabold tracking-normal transition-transform hover:scale-[1.015] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current active:scale-[0.99]">
              JOIN THE WAITLIST
            </button>
          </form>
        )}
      </section>
    </main>
  );
}