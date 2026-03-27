import { ImageResponse } from "next/og";

export const alt = "Marcin Jankiewicz — Strategy matters. Shipping decides.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 72% 32%, rgba(88,118,216,0.3), transparent 24%), radial-gradient(circle at 20% 16%, rgba(255,255,255,0.06), transparent 26%), linear-gradient(180deg, #0b0b0c 0%, #08090d 100%)",
          color: "#f3f4f6",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.34) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 116,
            top: 132,
            display: "flex",
            width: 72,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(172,194,255,0.96), rgba(95,126,226,0.84), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 184,
            top: 126,
            width: 14,
            height: 14,
            borderRadius: 9999,
            background: "#dfe8ff",
            boxShadow: "0 0 0 16px rgba(88,118,216,0.14), 0 0 40px rgba(88,118,216,0.24)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "104px 112px 76px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              marginTop: 68,
              maxWidth: 760,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 88,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                fontWeight: 600,
              }}
            >
              Strategy matters.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 88,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                fontWeight: 600,
              }}
            >
              Shipping decides.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 40,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                maxWidth: 540,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                  color: "rgba(243,244,246,0.74)",
                }}
              >
                Product leadership across strategy, delivery and business reality.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  lineHeight: 1,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(190,196,206,0.72)",
                }}
              >
                Marcin Jankiewicz
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                }}
              >
                Product Leader
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
