import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type MobileMenuLinkItem = {
  href: string;
  title: string;
  description: string;
  type: string;
};

type Props = {
  index: number;
  link: MobileMenuLinkItem;
  onClick: () => void;
};

export default function MobileMenuLink({ index, link, onClick }: Props) {
  return (
    <Link
      className="mobile-menu-link"
      href={link.href}
      onClick={onClick}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <span className="mobile-menu-link-index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="mobile-menu-link-text">
        <strong>{link.title}</strong>
        <small>{link.description}</small>
      </span>
      <ArrowUpRight className="mobile-menu-link-icon" size={22} />
    </Link>
  );
}
