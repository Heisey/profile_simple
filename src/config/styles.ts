import type { FeatureWindowKey } from "types";

export const WINDOW_LAYOUT: Record<FeatureWindowKey, React.CSSProperties> = {
  terminal: {
    width: "36rem",          // w-xl
    top: "8rem",             // top-32
    left: "8.333333%",       // left-1/12
    backgroundColor: "#fff", // bg-white
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", // shadow-2xl
    borderRadius: "0.75rem", // rounded-xl
    overflow: "hidden",
  },

  safari: {
    width: "56rem",          // w-4xl
    top: "10rem",            // top-40
    left: "16.666667%",      // left-2/12
    backgroundColor: "#fff",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    borderRadius: "0.75rem", // rounded-xl
    overflow: "hidden",
  },
  pdfReader: {
    width: "64rem",
    top: "9rem",
    left: "12.5%",
    backgroundColor: "#fff",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    borderRadius: "0.75rem",
    overflow: "hidden",
  },
  // add others later (finder, safari, etc)
  finder: {},
  contact: {},
  resume: {},
  photos: {},
  txtfile: {},
  imgfile: {},
}

export const fontWeight = {
    subTitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 700, default: 400 }
}