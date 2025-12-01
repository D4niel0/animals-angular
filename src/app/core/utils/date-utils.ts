import { differenceInYears, parse } from "date-fns";
import { format } from "date-fns";

export function getAgeYears(birthdate: string | undefined): number {
  if (!birthdate) {
    return 0;
  }
  const parsed = parse(birthdate, "dd/MM/yyyy", new Date());
  return differenceInYears(new Date(), parsed);
}

export function formatBirthdateISO(birthdate: Date | undefined): string {
  if (!birthdate) return "";
  return format(birthdate, "yyyy-MM-dd");
}
