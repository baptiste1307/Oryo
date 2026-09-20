"use client";

import HeroSection from "@/components/global/pages/HeroSection";
import AccountInfosCard from "@/components/account/InfosCard";
import { useLanguage } from "@/context/LanguageContext";

export default function AccountPage() {
  const { isFrench } = useLanguage();

  return (
    <div className="parent_div">
      <HeroSection
        indicator={isFrench ? "Mon compte" : "My Account"}
        title={
          isFrench
            ? "Gérez votre espace personnel"
            : "Manage your personal workspace"
        }
        subtitle={
          isFrench
            ? "Retrouvez les informations liées à votre compte et vos paramètres de sécurité."
            : "Access your account details, security settings, and personal workspace."
        }
      />

      <AccountInfosCard />
    </div>
  );
}
