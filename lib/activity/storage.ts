import { Redis } from "@upstash/redis";

import type { ActivityState } from "./types";

export interface ActivityStorage {
  get(): Promise<ActivityState | null>;
  set(activity: ActivityState): Promise<ActivityState>;
  clear(): Promise<void>;
}

let activityState: ActivityState | null = null;

const ACTIVITY_STORAGE_KEY = "portfolio:activity";

const redisUrl = process.env.STORAGE_KV_REST_API_URL;
const redisToken = process.env.STORAGE_KV_REST_API_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

export const memoryActivityStorage: ActivityStorage = {
  async get() {
    return activityState;
  },

  async set(activity) {
    activityState = activity;
    return activity;
  },

  async clear() {
    activityState = null;
  },
};

export const redisActivityStorage: ActivityStorage = {
  async get() {
    const activity =
      await redis?.get<ActivityState>(ACTIVITY_STORAGE_KEY);

    return activity ?? null;
  },

  async set(activity) {
    const expiresAt = new Date(activity.expiresAt ?? 0).getTime();
    const ttlSeconds = Math.max(
      1,
      Math.ceil((expiresAt - Date.now()) / 1000),
    );

    await redis?.set(
      ACTIVITY_STORAGE_KEY,
      activity,
      {
        ex: ttlSeconds,
      },
    );

    return activity;
  },

  async clear() {
    await redis?.del(ACTIVITY_STORAGE_KEY);
  },
};

export const activityStorage =
  redis !== null
    ? redisActivityStorage
    : memoryActivityStorage;