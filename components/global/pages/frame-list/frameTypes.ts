export type Frame = {
  title: string;
  id?: string;
  subtitle?: string;
  buy_cost?: number;
  totalPrice?: number;
  margin_line?: string;
  profit_line?: string;
  status?: string;
  favorite?: boolean;
  onDelete?: () => void;
  onToggleFavorite?: () => void;
  lastUpdated?: string;
  created_at?: string;
};

export function formatFrameDate(date: string | undefined) {
  if (!date) return "date inconnue";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "date inconnue";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}
