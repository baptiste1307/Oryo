"use client";

import BasicCard from "@/components/global/pages/BasicCard";
import { useRef, useState } from "react";
import CompanyAvatar from "./company/CompanyAvatar";
import Link from "next/link";
import CompanySection from "./company/CompanySection";
import CompanyFieldGrid from "./company/CompanyFieldGrid";
import { contactFields, preferenceFields } from "./company/companyFieldGroups";
import { useProfessionalInfo } from "./company/useProfessionalInfo";
import { optimizeCompanyLogo } from "@/lib/companyLogo";

export default function ProfessionalInfoCard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    editingField,
    form,
    saveCompany,
    saveMessage,
    setEditingField,
    setForm,
    updateFormField,
  } = useProfessionalInfo();
  const [openSections, setOpenSections] = useState({
    contact: false,
    preferences: false,
  });

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const companyLogoUrl = await optimizeCompanyLogo(file);
      const nextForm = { ...form, company_logo_url: companyLogoUrl };
      setForm(nextForm);
      await saveCompany(nextForm);
    } catch (error) {
      console.error("Impossible de préparer le logo :", error);
    }
  }

  const companyName = form.company_name || "Votre entreprise";
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <BasicCard
      title="Votre entreprise"
      subtitle={
        <>
          {
            "Ces informations concernent votre activité professionnelle et sont utiles pour pré-remplir vos devis."
          }
          <br />
          {"Pour voir votre compte utilisateur, "}
          <Link
            style={{ textDecoration: "underline" }}
            className="nav-link"
            href="/compte"
          >
            cliquez ici
          </Link>
          {"."}
        </>
      }
    >
      <div style={{ display: "grid", gap: "16px" }}>
        <div className="responsive-inline-cluster">
          <CompanyAvatar
            companyName={companyName}
            logo={form.company_logo_url}
            logoSize={Number(form.company_logo_size || 52)}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
          />
          {form.company_logo_url ? (
            <div style={{ display: "grid", gap: "6px", minWidth: "150px" }}>
              <label className="label">Taille du logo</label>
              <input
                type="range"
                min={32}
                max={96}
                value={Number(form.company_logo_size || 52)}
                onChange={(event) => {
                  const nextForm = { ...form, company_logo_size: event.target.value };
                  setForm(nextForm);
                  saveCompany(nextForm);
                }}
              />
              <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                {form.company_logo_size}px
              </span>
            </div>
          ) : (
            <p>Aucun logo défini</p>
          )}
          <div style={{ display: "grid", gap: "6px" }}>
            <strong>{companyName}</strong>
            <p>{form.company_email || "Email professionnel non renseigné"}</p>
          </div>
        </div>

        <CompanySection
          title="Coordonnées professionnelles"
          open={openSections.contact}
          onToggle={() => toggleSection("contact")}
        >
          <CompanyFieldGrid
            fields={contactFields}
            form={form}
            editingField={editingField}
            setEditingField={setEditingField}
            updateFormField={updateFormField}
            saveCompany={saveCompany}
          />
        </CompanySection>

        <CompanySection
          title="Préférences"
          open={openSections.preferences}
          onToggle={() => toggleSection("preferences")}
        >
          <CompanyFieldGrid
            fields={preferenceFields}
            form={form}
            editingField={editingField}
            setEditingField={setEditingField}
            updateFormField={updateFormField}
            saveCompany={saveCompany}
          />
        </CompanySection>

        {saveMessage && <p>{saveMessage}</p>}
      </div>
    </BasicCard>
  );
}
