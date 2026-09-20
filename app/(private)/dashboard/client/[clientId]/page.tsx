"use client";

import BasicCard from "@/components/global/pages/BasicCard";
import HeroSection from "@/components/global/pages/HeroSection";
import { useAuth } from "@/context/AuthContext";
import { getLibraryClientById, saveClientToLibrary, type LibraryClient } from "@/lib/library";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormMessage } from "@/components/forms/FormMessage";

export default function ClientDetailsPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const { user, loading } = useAuth();
  const [client, setClient] = useState<LibraryClient | null>(null);
  const [message, setMessage] = useState("");
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    if (loading || !user || !clientId) return;

    async function loadClient() {
      if (!user) return;
      setClient(await getLibraryClientById(user.id, clientId));
    }

    loadClient();
  }, [clientId, loading, user]);

  function updateField(field: keyof LibraryClient, value: string) {
    setClient((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function saveClient() {
    if (!client || !user) return;

    try {
      await saveClientToLibrary(user.id, client);
      setSaveFailed(false);
      setMessage("Client enregistré.");
    } catch {
      setSaveFailed(true);
      setMessage("Impossible d'enregistrer le client.");
    }
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Client"
        title={client?.name || "Fiche client"}
        subtitle="Modifiez les informations de ce client dans votre bibliothèque."
      />

      <BasicCard title="Informations client">
        {client ? (
          <div className="stack">
            <div className="grid-2">
              <ClientInput label="Nom" value={client.name} onChange={(v) => updateField("name", v)} />
              <ClientInput label="Email" value={client.email} onChange={(v) => updateField("email", v)} />
              <ClientInput label="Téléphone" value={client.phone} onChange={(v) => updateField("phone", v)} />
              <ClientInput label="Adresse" value={client.address} onChange={(v) => updateField("address", v)} />
              <ClientInput label="Ville" value={client.city} onChange={(v) => updateField("city", v)} />
            </div>
            <div className="buttons-container">
              <button className="button-primary" onClick={saveClient}>
                Enregistrer
              </button>
              <Link className="button-secondary" href="/dashboard/all_library">
                Retour
              </Link>
            </div>
            <FormMessage message={message} tone={saveFailed ? "error" : "success"} />
          </div>
        ) : (
          <p>Client introuvable.</p>
        )}
      </BasicCard>
    </div>
  );
}

function ClientInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="stack">
      <label className="label">{label}</label>
      <input className="input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
