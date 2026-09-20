import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${siteConfig.name}`,
  description: `Politique de confidentialité et gestion des données personnelles sur ${siteConfig.name}.`,
};

const sections: LegalSection[] = [
  {
    title: "Responsable et contact",
    content: (
      <p>
        {siteConfig.name} est responsable des traitements décrits ici. Pour toute question ou demande liée à
        vos données, écrivez à <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    ),
  },
  {
    title: "Données utilisées",
    content: (
      <ul>
        <li>Compte : email, identifiant et informations de connexion.</li>
        <li>Profil professionnel : entreprise, coordonnées et logo ajoutés volontairement.</li>
        <li>Contenus : devis, clients, fiches produits, calculs de rentabilité et préférences.</li>
      </ul>
    ),
  },
  {
    title: "Finalités et bases juridiques",
    content: (
      <p>
        Ces données servent exclusivement à créer votre compte personnel, sauvegarder vos devis et calculs,
        et assurer la sécurité du service. Les traitements reposent sur l’exécution du service demandé et votre consentement.
      </p>
    ),
  },
  {
    title: "Prestataires techniques",
    content: (
      <p>
        Le service s’appuie sur Supabase pour l’authentification et la base de données PostgreSQL, Google pour la
        connexion OAuth facultative, et l’infrastructure cloud d’hébergement choisie par l’administrateur (ex. Vercel).
      </p>
    ),
  },
  {
    title: "Conservation et sécurité",
    content: (
      <p>
        Les données du compte sont conservées tant que celui-ci est actif, puis supprimées ou
        anonymisées lors de la suppression du compte. Des mesures techniques (chiffrement SSL, Row-Level Security)
        protègent vos données.
      </p>
    ),
  },
  {
    title: "Vos droits",
    content: (
      <p>
        Vous pouvez demander l’accès, la rectification, l’effacement, la limitation, la portabilité
        ou l’opposition lorsque ces droits s’appliquent en écrivant à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Vous pouvez aussi
        saisir l'autorité compétente (ex: la CNIL). Pour les règles d’utilisation du service, consultez les{" "}
        <Link href="/terms">CGU et CGV</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      indicator="Confidentialité"
      title="Politique de confidentialité"
      subtitle={`Comment ${siteConfig.name} collecte, utilise et protège vos données personnelles.`}
      updatedAt="Dernière mise à jour"
      sections={sections}
    />
  );
}
