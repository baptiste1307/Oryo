import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `CGU | ${siteConfig.name}`,
  description: `Conditions générales d’utilisation du service libre et gratuit ${siteConfig.name}.`,
};

const sections: LegalSection[] = [
  {
    title: "Éditeur et objet",
    content: (
      <p>
        {siteConfig.name}, joignable à <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>,
        met à disposition des outils libres et gratuits de création de devis PDF, de gestion de catalogue produits
        et de calcul de rentabilité. L’utilisation du site implique l’acceptation pleine et entière des présentes conditions.
      </p>
    ),
  },
  {
    title: "Accès libre et gratuité du service",
    content: (
      <p>
        L’ensemble des fonctionnalités de {siteConfig.name} (création de devis illimitée, exports PDF, simulations
        de marge et gestion de bibliothèque) est accessible gratuitement. Aucun abonnement payant ni coordonnées
        bancaires ne sont requis pour utiliser l’application.
      </p>
    ),
  },
  {
    title: "Compte et sécurité",
    content: (
      <p>
        Pour sauvegarder vos devis et calculs, vous pouvez créer un compte personnel. Vous êtes responsable
        de la confidentialité de vos identifiants et devez signaler tout accès suspect. Vous restez seul maître
        des données saisies et pouvez supprimer votre compte et l’intégralité de vos données à tout moment depuis
        les paramètres de votre profil.
      </p>
    ),
  },
  {
    title: "Utilisation autorisée",
    content: (
      <p>
        Le service doit être utilisé dans le respect des lois en vigueur. Sont strictement prohibés toute tentative
        d’intrusion, perturbation des serveurs, détournement de données ou utilisation de la plateforme à des fins frauduleuses.
      </p>
    ),
  },
  {
    title: "Disponibilité et absence de garantie",
    content: (
      <p>
        {siteConfig.name} est fourni « en l’état » (as-is), sans garantie d’aucune sorte. Les calculs de marge,
        conversions de devises et modèles de devis sont mis à disposition à titre purement indicatif et d’assistance.
        Il relève de la seule responsabilité de l’utilisateur de vérifier l’exactitude de ses mentions obligatoires,
        ses taux de TVA et ses montants avant toute transmission à un tiers ou client final.
      </p>
    ),
  },
  {
    title: "Propriété intellectuelle et données",
    content: (
      <p>
        Le code source de l’application est mis à disposition selon les termes de la licence libre MIT.
        Vous conservez l’entière propriété de vos données professionnelles (coordonnées clients, tarifs, logos d’entreprise
        et devis générés).
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        Pour toute question relative aux présentes conditions ou au fonctionnement du service, vous pouvez
        écrire à l’adresse{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      indicator="Conditions"
      title="Conditions Générales d’Utilisation"
      subtitle={`Les règles d’accès et d’utilisation du service libre ${siteConfig.name}.`}
      updatedAt="Dernière mise à jour"
      sections={sections}
    />
  );
}
