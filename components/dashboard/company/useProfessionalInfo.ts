import { useAuth } from "@/context/AuthContext";
import { getProfile, type Profile, upsertProfile } from "@/lib/profiles";
import { useEffect, useState } from "react";
import {
  CompanyField,
  CompanyForm,
  defaultCompanyForm,
  profileToCompanyForm,
} from "./companyTypes";

export function useProfessionalInfo() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<CompanyForm>(defaultCompanyForm);
  const [editingField, setEditingField] = useState<CompanyField | null>(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (loading || !user) return;
    async function loadProfile() {
      if (!user) return;
      const nextProfile = await getProfile(user.id);
      setProfile(nextProfile);
      setForm(profileToCompanyForm(nextProfile));
    }
    loadProfile();
  }, [loading, user]);

  async function saveCompany(nextForm = form) {
    if (!user) return;

    try {
      await upsertProfile({
        id: user.id,
        avatar_url: profile?.avatar_url ?? null,
        plan: profile?.plan ?? "Gratuit",
        company_name: nextForm.company_name,
        company_logo_url: nextForm.company_logo_url,
        company_logo_size: Number(nextForm.company_logo_size || 52),
        company_email: nextForm.company_email,
        company_address: nextForm.company_address,
        company_phone: nextForm.company_phone,
        preferred_currency: nextForm.preferred_currency,
        default_tva_rate: Number(nextForm.default_tva_rate || 0),
        quote_prefix: nextForm.quote_prefix,
        default_payment_terms: nextForm.default_payment_terms,
        default_quote_validity_days: Number(nextForm.default_quote_validity_days || 0),
      });
      setSaveMessage("Informations entreprise enregistrées");
    } catch (error) {
      const message = error instanceof Error ? error.message : JSON.stringify(error);
      console.error("Erreur sauvegarde entreprise :", message, error);
      setSaveMessage(`Impossible d'enregistrer l'entreprise : ${message}`);
    }
  }

  function updateFormField(field: keyof CompanyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return {
    editingField,
    form,
    saveCompany,
    saveMessage,
    setEditingField,
    setForm,
    updateFormField,
  };
}
