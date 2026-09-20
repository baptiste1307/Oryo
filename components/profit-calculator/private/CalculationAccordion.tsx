import CompanySection from "@/components/dashboard/company/CompanySection";
import { Calculation } from "@/context/CalculationContext";
import { useState } from "react";
import CostSection from "./sections/CostSection";
import IdentificationSection from "./sections/IdentificationSection";
import NotesSection from "./sections/NotesSection";
import PricingSection from "./sections/PricingSection";
import ResultsSection from "./sections/ResultsSection";
import ScenarioSection from "./sections/ScenarioSection";
import { UpdateCalculationField } from "./shared/types";

type SectionKey =
  | "identification"
  | "costs"
  | "pricing"
  | "results"
  | "scenarios"
  | "notes";

type CalculationAccordionProps = {
  calculation: Calculation;
  updateField: UpdateCalculationField;
};

export default function CalculationAccordion({
  calculation,
  updateField,
}: CalculationAccordionProps) {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    identification: false,
    costs: false,
    pricing: false,
    results: false,
    scenarios: false,
    notes: false,
  });

  function toggleSection(section: SectionKey) {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <CompanySection
        title="Identification"
        open={openSections.identification}
        onToggle={() => toggleSection("identification")}
      >
        <IdentificationSection
          calculation={calculation}
          updateField={updateField}
          showHeader={false}
        />
      </CompanySection>

      <CompanySection
        title="Coûts"
        open={openSections.costs}
        onToggle={() => toggleSection("costs")}
      >
        <CostSection
          calculation={calculation}
          updateField={updateField}
          showHeader={false}
        />
      </CompanySection>

      <CompanySection
        title="Prix et objectifs"
        open={openSections.pricing}
        onToggle={() => toggleSection("pricing")}
      >
        <PricingSection
          calculation={calculation}
          updateField={updateField}
          showHeader={false}
        />
      </CompanySection>

      <CompanySection
        title="Résultat"
        open={openSections.results}
        onToggle={() => toggleSection("results")}
      >
        <ResultsSection calculation={calculation} showHeader={false} />
      </CompanySection>

      <CompanySection
        title="Scénarios de prix"
        open={openSections.scenarios}
        onToggle={() => toggleSection("scenarios")}
      >
        <ScenarioSection
          calculation={calculation}
          updateField={updateField}
          showHeader={false}
        />
      </CompanySection>

      <CompanySection
        title="Notes"
        open={openSections.notes}
        onToggle={() => toggleSection("notes")}
      >
        <NotesSection notes={calculation.notes} updateField={updateField} />
      </CompanySection>
    </div>
  );
}
