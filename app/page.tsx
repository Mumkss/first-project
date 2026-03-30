"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/ambient-background";
import type { FooterContent } from "@/components/footer";
import { Hero, type HeroContent } from "@/components/hero";
import { HeroSequenceProvider } from "@/components/hero-sequence";
import type { SignatureAreasContent } from "@/components/signature-areas";
import type { SelectedWorkContent } from "@/components/selected-work";
import type { SelectedExperienceContent } from "@/components/selected-experience";

type Locale = "en" | "pl";

type SiteContent = {
  hero: HeroContent;
  signature: SignatureAreasContent;
  work: SelectedWorkContent;
  experience: SelectedExperienceContent;
  footer: FooterContent;
};

function SectionPlaceholder({ className }: { className: string }) {
  return <div aria-hidden className={className} />;
}

const SignatureAreas = dynamic(
  () => import("@/components/signature-areas").then((mod) => mod.SignatureAreas),
  {
    loading: () => (
      <SectionPlaceholder className="px-6 py-22 sm:px-8 sm:py-26 lg:px-12 lg:py-34 xl:py-40" />
    ),
  },
);

const SelectedWork = dynamic(
  () => import("@/components/selected-work").then((mod) => mod.SelectedWork),
  {
    loading: () => (
      <SectionPlaceholder className="px-6 py-20 sm:px-8 sm:py-22 lg:px-12 lg:py-24" />
    ),
  },
);

const SelectedExperience = dynamic(
  () =>
    import("@/components/selected-experience").then(
      (mod) => mod.SelectedExperience,
    ),
  {
    loading: () => (
      <SectionPlaceholder className="px-6 py-22 sm:px-8 sm:py-26 lg:px-12 lg:py-32 xl:py-40" />
    ),
  },
);

const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  {
    loading: () => (
      <SectionPlaceholder className="px-6 pb-20 pt-18 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-24 xl:pb-36 xl:pt-28" />
    ),
  },
);

const CONTACT_EMAIL = "m.p.jankiewicz@gmail.com";

const siteContent: Record<Locale, SiteContent> = {
  en: {
    hero: {
      languageLabel: "Language",
      headlineLines: [
        ["Strategy", "matters."],
        ["Shipping", "decides."],
      ],
      subtitleLines: [
        "I lead product work across strategy, delivery,",
        "and real business conditions.",
      ],
      ctas: {
        linkedin: "LinkedIn",
        contact: "Contact",
        contactHref: `mailto:${CONTACT_EMAIL}`,
      },
      proofPoints: [
        "Head of Product at Foodsi",
        "15+ years building digital products",
        "From ambiguity to shipped outcomes",
      ],
      imageAlt: "Portrait of Marcin Jankiewicz",
    },
    signature: {
      titleLines: ["Selective Work.", "Clear Signal."],
      intro: [
        {
          id: "signals-start",
          lines: [
            "Work starts with users, product reality,",
            "business pressure and data.",
          ],
        },
        {
          id: "signals-focus",
          lines: [
            "That keeps the focus on decisions",
            "that move the business.",
          ],
        },
      ],
      items: [
        {
          id: "users-signal",
          title: "Users",
          sentenceLines: ["Where attention", "drops"],
        },
        {
          id: "product-signal",
          title: "Product",
          sentenceLines: ["Where things", "break"],
        },
        {
          id: "business-signal",
          title: "Business",
          sentenceLines: ["What drives", "the outcome"],
        },
        {
          id: "data-signal",
          title: "Data",
          sentenceLines: ["Signal", "vs noise"],
        },
      ],
    },
    work: {
      titleLines: ["Real products.", "Real movement."],
      items: [
        {
          id: "foodsi-case",
          name: "Foodsi",
          role: "Head of Product",
          years: "2024 — Present",
          description:
            "Scaled product direction across customer experience, marketplace logic, and business execution.",
          bullets: [
            "Sharpened priorities across product, operations, and growth.",
            "Turned marketplace complexity into clearer product decisions.",
          ],
          imageSrc: "/foodsi.png",
          imageAlt: "Foodsi product mockup",
          visualTone: "foodsi",
        },
        {
          id: "booksy-case",
          name: "Booksy",
          role: "Product Manager",
          years: "2021 — 2022",
          description:
            "Product work shaped for scale, clarity and stronger decision-making.",
          bullets: [
            "Made product complexity easier to understand at scale.",
            "Turned signals from users, teams, and business into clearer priorities.",
          ],
          imageSrc: "/booksy.png",
          imageAlt: "Booksy product mockup",
          visualTone: "booksy",
        },
        {
          id: "tylko-case",
          name: "Tylko",
          role: "Product Manager",
          years: "2020 — 2021",
          description:
            "Product ownership where design precision met real delivery constraints.",
          bullets: [
            "Connected design intent with product constraints and implementation.",
            "Kept execution sharper without losing the quality of the experience.",
          ],
          imageSrc: "/tylko.png",
          imageAlt: "Tylko product mockup",
          visualTone: "tylko",
        },
      ],
    },
    experience: {
      eyebrow: "Product leadership",
      titleLines: ["Decisions,", "made real."],
      flagshipLabel: "CURRENT FLAGSHIP",
      foundationLabel: "Earlier roles with IT teams",
      foundationItems:
        "Grupa Etendard, Plum Web Solutions and Incentive Solutions Polska",
      items: [
        {
          id: "foodsi-head",
          company: "Foodsi",
          role: "Head of Product",
          years: "2024 — Present",
          kind: "product",
          summary:
            "Shaping product direction across customer experience, marketplace logic, and business execution.",
        },
        {
          id: "foodsi-pm",
          company: "Foodsi",
          role: "Product Manager",
          years: "2022 — 2024",
          kind: "product",
          summary: "Turning signals into decisions.",
        },
        {
          id: "booksy-pm",
          company: "Booksy",
          role: "Product Manager",
          years: "2021 — 2022",
          kind: "product",
          summary: "Making scale understandable.",
        },
        {
          id: "tylko-pm",
          company: "Tylko",
          role: "Product Manager",
          years: "2020 — 2021",
          kind: "product",
          summary: "Connecting design and execution.",
        },
        {
          id: "efigence-itpm",
          company: "Efigence / Artegence",
          role: "IT Project Manager",
          years: "2017 — 2020",
          kind: "delivery",
          summary: "Building the delivery discipline behind the work.",
        },
      ],
    },
    footer: {
      eyebrow: "Contact",
      titleLines: ["Let’s build something", "meaningful."],
      links: {
        linkedin: "LinkedIn",
        email: CONTACT_EMAIL,
      },
    },
  },
  pl: {
    hero: {
      languageLabel: "Język",
      headlineLines: [
        ["Strategia", "ma sens."],
        ["Liczy się", "wynik."],
      ],
      subtitleLines: [
        "Pomagam dowozić produkty,",
        "które naprawdę działają.",
      ],
      ctas: {
        linkedin: "LinkedIn",
        contact: "Kontakt",
        contactHref: `mailto:${CONTACT_EMAIL}`,
      },
      proofPoints: [
        "Head of Product w Foodsi",
        "15+ lat przy produktach",
        "Od chaosu do efektu",
      ],
      imageAlt: "Portret Marcina Jankiewicza",
    },
    signature: {
      titleLines: ["Wybrane projekty.", "Jasny sygnał."],
      intro: [
        {
          id: "signals-start",
          lines: [
            "Punkt wyjścia to użytkownicy,",
            "produkt, biznes i dane.",
          ],
        },
        {
          id: "signals-focus",
          lines: [
            "Zostaje tylko to,",
            "co naprawdę pcha wynik.",
          ],
        },
      ],
      items: [
        {
          id: "users-signal",
          title: "Użytkownicy",
          sentenceLines: ["Gdzie tracisz", "ich uwagę"],
        },
        {
          id: "product-signal",
          title: "Produkt",
          sentenceLines: ["Gdzie to przestaje", "działać"],
        },
        {
          id: "business-signal",
          title: "Biznes",
          sentenceLines: ["Co naprawdę", "napędza wynik"],
        },
        {
          id: "data-signal",
          title: "Dane",
          sentenceLines: ["Co jest sygnałem,", "a co szumem"],
        },
      ],
    },
    work: {
      titleLines: ["Realne produkty.", "Realny ruch."],
      items: [
        {
          id: "foodsi-case",
          name: "Foodsi",
          role: "Head of Product",
          years: "2024 — Obecnie",
          description:
            "Skalowanie kierunku produktu między doświadczeniem klienta, logiką marketplace’u i egzekucją biznesową.",
          bullets: [
            "Wyostrzenie priorytetów między produktem, operacją i wzrostem.",
            "Zamiana złożoności marketplace’u w czytelniejsze decyzje produktowe.",
          ],
          imageSrc: "/foodsi.png",
          imageAlt: "Makieta produktu Foodsi",
          visualTone: "foodsi",
        },
        {
          id: "booksy-case",
          name: "Booksy",
          role: "Product Manager",
          years: "2021 — 2022",
          description:
            "Produkt na etapie skali, gdzie porządek przekładał się na lepsze decyzje.",
          bullets: [
            "Upraszczałem złożoność w szybko rosnącym środowisku.",
            "Łączyłem sygnały od użytkowników, zespołów i biznesu w czytelne priorytety.",
          ],
          imageSrc: "/booksy.png",
          imageAlt: "Makieta produktu Booksy",
          visualTone: "booksy",
        },
        {
          id: "tylko-case",
          name: "Tylko",
          role: "Product Manager",
          years: "2020 — 2021",
          description:
            "Produkt na styku jakości doświadczenia i realnych ograniczeń wdrożenia.",
          bullets: [
            "Spinałem intencję projektową z ograniczeniami produktu i wdrożenia.",
            "Podnosiłem jakość dowożenia bez rozmywania doświadczenia.",
          ],
          imageSrc: "/tylko.png",
          imageAlt: "Makieta produktu Tylko",
          visualTone: "tylko",
        },
      ],
    },
    experience: {
      eyebrow: "Przywództwo produktowe",
      titleLines: ["Decyzje,", "które działają."],
      flagshipLabel: "OBECNA ROLA",
      foundationLabel: "WCZEŚNIEJ W IT",
      foundationItems:
        "Grupa Etendard, Plum Web Solutions i Incentive Solutions Polska",
      items: [
        {
          id: "foodsi-head",
          company: "Foodsi",
          role: "Head of Product",
          years: "2024 — Obecnie",
          kind: "product",
          summary: "Kierunek produktu. Marketplace. Egzekucja.",
        },
        {
          id: "foodsi-pm",
          company: "Foodsi",
          role: "Product Manager",
          years: "2022 — 2024",
          kind: "product",
          summary: "Sygnały przekładane na decyzje.",
        },
        {
          id: "booksy-pm",
          company: "Booksy",
          role: "Product Manager",
          years: "2021 — 2022",
          kind: "product",
          summary: "Skala bez chaosu.",
        },
        {
          id: "tylko-pm",
          company: "Tylko",
          role: "Product Manager",
          years: "2020 — 2021",
          kind: "product",
          summary: "Design spięty z wdrożeniem.",
        },
        {
          id: "efigence-itpm",
          company: "Efigence / Artegence",
          role: "IT Project Manager",
          years: "2017 — 2020",
          kind: "delivery",
          summary: "Fundament sprawnego dowożenia.",
        },
      ],
    },
    footer: {
      eyebrow: "Kontakt",
      titleLines: ["Zbudujmy coś,", "co ma znaczenie."],
      links: {
        linkedin: "LinkedIn",
        email: CONTACT_EMAIL,
      },
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Locale>("en");
  const content = siteContent[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main
      lang={language}
      className="relative isolate overflow-hidden bg-[var(--background)] text-[var(--foreground)]"
    >
      <AmbientBackground />
      <div className="relative z-10">
        <HeroSequenceProvider>
          <Hero
            content={content.hero}
            language={language}
            onLanguageChange={setLanguage}
          />
          <SignatureAreas content={content.signature} />
          <SelectedWork content={content.work} />
          <SelectedExperience content={content.experience} />
          <Footer content={content.footer} />
        </HeroSequenceProvider>
      </div>
    </main>
  );
}
