"use client";

import HeroSection from "@/components/global/pages/HeroSection";
import ProfitCalculatorSection from "@/components/profit-calculator/public/ProfitCalculatorSection";
import ClickableCardSection from "@/components/global/pages/ClickableCardSection";

export default function Home() {
  return (
    <div className="parent_div">
      <HeroSection
        indicator="Outil simple pour freelances"
        title="Calculez votre vraie rentabilité et fixez des prix plus justes, plus vite"
        subtitle="Testez gratuitement le calculateur, comprenez instantanément votre bénéfice
            réel et commencez à structurer une activité freelance plus rentable."
        buttons={[
          {
            link: "/inscription",
            text: "Créer un compte",
          },
          {
            link: "/connexion",
            text: "Se connecter",
          }
        ]}
      />

      <ProfitCalculatorSection />

      <ClickableCardSection
        cards={[
          {
            title: "Historique des calculs",
            subtitle:
              "Créez un compte pour retrouver vos simulations et suivre vos décisions plus facilement.",
            link: "/inscription",
          },
          {
            title: "Créez vos devis professionnels",
            subtitle:
              "Générez et téléchargez vos devis complets en PDF avec calcul automatique de vos marges.",
            link: "/devis",
          },
        ]}
      />
    </div>
  );
}
