import { LucideCircleX, LucideGlobe } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const IMPORT_STATUS = {
  IMPORTING: Spinner,
  COMPLETED: LucideGlobe,
  FAILED: LucideCircleX,
} as const;

export { IMPORT_STATUS };
