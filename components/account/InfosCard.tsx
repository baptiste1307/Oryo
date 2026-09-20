"use client";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import BasicCard from "../global/pages/BasicCard";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteAccountButton from "./DeleteAccountButton";

function formatDate(date: string | undefined, lang: "en" | "fr") {
  if (!date) return lang === "fr" ? "date inconnue" : "unknown date";

  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default function AccountInfoCard() {
  const { user } = useAuth();
  const { language, isFrench } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function copyUserId() {
    if (!user?.id) return;
    await navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <BasicCard
      title={isFrench ? "Informations du compte" : "Account Details"}
      subtitle={
        isFrench ? (
          <>
            {"Elles concernent votre compte utilisateur."}
            <br />
            {"Pour voir vos informations professionnelles, "}
            <Link
              style={{ textDecoration: "underline" }}
              className="nav-link"
              href="/dashboard"
            >
              cliquez ici
            </Link>
            {"."}
          </>
        ) : (
          <>
            {"These relate to your user profile and security."}
            <br />
            {"To review your business details, "}
            <Link
              style={{ textDecoration: "underline" }}
              className="nav-link"
              href="/dashboard"
            >
              click here
            </Link>
            {"."}
          </>
        )
      }
    >
      <div className="grid-2">
        <AccountInfoItem
          title="Email"
          value={user?.email ?? (isFrench ? "Non renseigné" : "Not set")}
        />
        <AccountInfoItem
          title={isFrench ? "Date d'inscription" : "Member Since"}
          value={formatDate(user?.created_at, language)}
        />
        <AccountInfoItem
          title={isFrench ? "Dernière connexion" : "Last Sign In"}
          value={formatDate(user?.last_sign_in_at, language)}
        />
        <div className="frame_div" style={{ position: "relative" }}>
          <strong>{isFrench ? "ID utilisateur" : "User ID"}</strong>
          <p style={{ paddingRight: "34px", overflowWrap: "anywhere" }}>
            {user?.id ?? (isFrench ? "Non disponible" : "Not available")}
          </p>
          <button
            type="button"
            className="edit-link"
            onClick={copyUserId}
            aria-label={isFrench ? "Copier l'ID utilisateur" : "Copy user ID"}
            style={{ position: "absolute", top: "14px", right: "14px" }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div
        className="buttons-container"
        style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
      >
        <Link className="button-primary" href="/compte/edit_email">
          {isFrench ? "Modifier mon email" : "Change email"}
        </Link>
        <Link className="button-secondary" href="/compte/change_password">
          {isFrench ? "Changer mon mot de passe" : "Change password"}
        </Link>
      </div>
      <div className="account-danger-actions">
        <DeleteAccountButton />
      </div>
    </BasicCard>
  );
}

function AccountInfoItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="frame_div">
      <strong>{title}</strong>
      <p>{value}</p>
    </div>
  );
}
