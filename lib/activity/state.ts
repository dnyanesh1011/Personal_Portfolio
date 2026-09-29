import type { ActivityState } from "./types";
import { activityStorage } from "./storage";

const ACTIVITY_TTL_MS = 2 * 60 * 1000;

function isExpired(activity: ActivityState): boolean {
  return (
    activity.expiresAt !== null &&
    Date.now() >= new Date(activity.expiresAt).getTime()
  );
}

export async function getActivityState(): Promise<ActivityState | null> {
  const activity = await activityStorage.get();

  if (!activity) {
    return null;
  }

  if (isExpired(activity)) {
    await activityStorage.clear();
    return null;
  }

  return activity;
}

export async function setActivityState(
  state: ActivityState,
): Promise<ActivityState> {
  const now = new Date().toISOString();

  const nextState: ActivityState = {
    ...state,
    lastSeen: now,
    expiresAt: new Date(
      Date.now() + ACTIVITY_TTL_MS,
    ).toISOString(),
  };

  return activityStorage.set(nextState);
}

export async function clearActivityState(): Promise<void> {
  await activityStorage.clear();
}