"use client";

import { Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeletionPopUp from "../DeletionPopUp";
import { deleteCalculation, toggleCalculationFavorite } from "@/lib/calculations";
import { formatFrameDate, Frame } from "./frameTypes";

export default function CalculationFrames({ frames }: { frames: Frame[] }) {
  const router = useRouter();
  const [frameToDelete, setFrameToDelete] = useState<Frame | null>(null);

  return (
    <>
      {frames.map((frame, index) => (
        <div
          className="clickable-frame"
          onClick={() => frame.id && router.push(`/dashboard/build_calculation?frameId=${frame.id}`)}
          key={frame.id ?? index}
        >
          <div className="title_and_trash_header_line">
            <strong>{frame.title}</strong>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                className="favorite-link"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!frame.id) return;
                  await toggleCalculationFavorite(frame.id, !frame.favorite);
                  frame.onToggleFavorite?.();
                }}
                style={{ color: frame.favorite ? "var(--primary)" : undefined }}
              >
                <Star size={16} fill={frame.favorite ? "currentColor" : "none"} />
              </button>
              <button
                type="button"
                className="trash-link"
                onClick={(e) => {
                  e.stopPropagation();
                  setFrameToDelete(frame);
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <p style={{ color: "var(--text)" }}>{frame.subtitle}</p>
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>{frame.profit_line}</span>
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>{frame.margin_line}</span>
          <p>Créé le {formatFrameDate(frame.created_at)}</p>
        </div>
      ))}

      <DeletionPopUp
        title="Voulez-vous vraiment supprimer ce calcul ?"
        isOpen={frameToDelete !== null}
        onCancel={() => setFrameToDelete(null)}
        onConfirm={async () => {
          if (!frameToDelete?.id) return;
          await deleteCalculation(frameToDelete.id);
          frameToDelete.onDelete?.();
          setFrameToDelete(null);
        }}
      />
    </>
  );
}
