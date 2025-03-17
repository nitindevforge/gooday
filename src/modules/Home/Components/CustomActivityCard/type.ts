import { ActivityTrackerState, Icons } from "@app/ui";

export type HomeActivityTrackerState = {
  time?: string;
  icon?: Icons;
  type?: string;
  eventType?: string;
  location?: string;
  friends?: string;
  progress?: number;
  isBetween?: boolean;
  isBefore: boolean;
} & ActivityTrackerState;
