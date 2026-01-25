import { LucideCircleX, LucideGlobe } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const MOBILE_PROJECT_LIMIT = 5;
const SCROLL_THRESHOLD = 5;

const IMPORT_STATUS = {
  IMPORTING: Spinner,
  COMPLETED: LucideGlobe,
  FAILED: LucideCircleX,
} as const;

export { IMPORT_STATUS, MOBILE_PROJECT_LIMIT, SCROLL_THRESHOLD };
