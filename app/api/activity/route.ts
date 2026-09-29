import { NextRequest, NextResponse } from "next/server";

import {
  clearActivityState,
  getActivityState,
  setActivityState,
} from "@/lib/activity/state";
import type { ActivityEvent, ActivityType } from "@/lib/activity/types";

const ACTIVITY_API_SECRET = process.env.ACTIVITY_API_SECRET;

function isValidActivityType(value: unknown): value is ActivityType {
  return (
    typeof value === "string" &&
    [
      "vscode",
      "instagram",
      "spotify",
      "gym",
      "sleeping",
      "studying",
      "riding",
      "offline",
    ].includes(value)
  );
}

function isValidSource(
  value: unknown,
): value is ActivityEvent["source"] {
  return (
    value === "mobile" ||
    value === "desktop" ||
    value === "automatic"
  );
}

function isValidTimestamp(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const timestamp = new Date(value);

  return !Number.isNaN(timestamp.getTime());
}

function isAuthorized(request: NextRequest): boolean {
  if (!ACTIVITY_API_SECRET) {
    console.error("ACTIVITY_API_SECRET is not configured");
    return false;
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return false;
  }

  const token = authorization.slice("Bearer ".length).trim();

  return token === ACTIVITY_API_SECRET;
}

export async function GET() {
  const activity = await getActivityState();

  return NextResponse.json(
    {
      activity,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  let body: Partial<ActivityEvent>;

  try {
    body = (await request.json()) as Partial<ActivityEvent>;
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON body",
      },
      {
        status: 400,
      },
    );
  }

  if (
    body.event !== "activity.set" &&
    body.event !== "activity.clear" &&
    body.event !== "activity.heartbeat"
  ) {
    return NextResponse.json(
      {
        error: "Invalid activity event",
      },
      {
        status: 400,
      },
    );
  }

  if (!isValidTimestamp(body.timestamp)) {
    return NextResponse.json(
      {
        error: "Invalid timestamp",
      },
      {
        status: 400,
      },
    );
  }

  if (body.event === "activity.clear") {
    await clearActivityState();

    return NextResponse.json({
      activity: null,
    });
  }

  if (body.event === "activity.heartbeat") {
    if (!isValidSource(body.source)) {
      return NextResponse.json(
        {
          error: "Invalid activity source",
        },
        {
          status: 400,
        },
      );
    }

    const currentActivity = await getActivityState();

    if (!currentActivity) {
      return NextResponse.json(
        {
          error: "No active activity to heartbeat",
        },
        {
          status: 409,
        },
      );
    }

    const activity = await setActivityState({
      ...currentActivity,
    });

    return NextResponse.json({
      activity,
    });
  }

  if (!("activity" in body) || !isValidActivityType(body.activity)) {
    return NextResponse.json(
      {
        error: "Invalid activity type",
      },
      {
        status: 400,
      },
    );
  }

  if (!isValidSource(body.source)) {
    return NextResponse.json(
      {
        error: "Invalid activity source",
      },
      {
        status: 400,
      },
    );
  }

  const currentActivity = await getActivityState();

  const now = new Date().toISOString();

  const startedAt =
    currentActivity?.activity === body.activity
      ? currentActivity.startedAt
      : now;

  const activity = await setActivityState({
    activity: body.activity,
    source: body.source,
    startedAt,
    lastSeen: now,
    expiresAt: null,
  });

  return NextResponse.json({
    activity,
  });
}