"use client";

import { useContext } from "react";
import { WeddingConfigContext } from "../providers/WeddingConfigProvider";

export interface NavItem {
  label: string;
  href: string;
  name: string;
}

export const useNavigationSections = (): NavItem[] | undefined => {
  const context = useContext(WeddingConfigContext);
  return context.sections
    ?.filter((section) => section.name)
    .map((section) => ({
      label: section.name!,
      href: `#${section.id}`,
      name: section.name!,
    }));
};
