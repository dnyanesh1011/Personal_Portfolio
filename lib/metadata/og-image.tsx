import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 } as const;
export const ogImageContentType = "image/png";

const fontFamily = "Google Sans";

let fontsPromise: Promise<{ bold: Buffer; regular: Buffer }> | null = null;
let iconPromise: Promise<string> | null = null;

function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(process.cwd(), "app/fonts/og/GoogleSans-Regular.ttf")),
    readFile(join(process.cwd(), "app/fonts/og/GoogleSans-Bold.ttf")),
  ]).then(([regular, bold]) => ({ bold, regular }));

  return fontsPromise;
}

function loadIcon() {
  iconPromise ??= readFile(join(process.cwd(), "app/icon.png")).then(
    (buffer) => `data:image/png;base64,${buffer.toString("base64")}`,
  );

  return iconPromise;
}

type OgImageContent = {
  kicker?: string;
  title: string;
};

export async function renderOgImage({ kicker, title }: OgImageContent) {
  const [{ bold, regular }, iconSrc] = await Promise.all([
    loadFonts(),
    loadIcon(),
  ]);

  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        backgroundColor: "#fdfdfc",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        paddingBottom: "125px",
        paddingLeft: "75px",
        paddingRight: "75px",
        paddingTop: "75px",
        width: "100%",
      }}
    >
      {/* eslint-disable-next-line next/no-img-element -- rendered by Satori inside ImageResponse, not the DOM; next/image is unsupported here */}
      <img alt="" height={64} src={iconSrc} width={64} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {kicker ? (
          <div
            style={{
              color: "#737373",
              fontFamily,
              fontSize: 30,
              fontWeight: 400,
            }}
          >
            {kicker}
          </div>
        ) : null}
        <div
          style={{
            color: "#262626",
            fontFamily,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
      </div>
    </div>,
    {
      ...ogImageSize,
      fonts: [
        { data: regular, name: fontFamily, style: "normal", weight: 400 },
        { data: bold, name: fontFamily, style: "normal", weight: 700 },
      ],
    },
  );
}
