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
  finder: {
    width: "48rem",                 // wider, feels primary
    height: "48rem",                // optional but recommended
    top: "6rem",
    left: "50%",
    transform: "translateX(-50%)",  // center it
    backgroundColor: "#ffffff",
    boxShadow: "0 35px 80px -20px rgba(0,0,0,0.35)",
    borderRadius: "0.85rem",
    overflow: "hidden",
  },
  contact: {
    width: "52rem",                 // comfy, not skinny
    height: "44rem",                // matches the ContactWindow body height
    top: "7rem",
    left: "50%",
    transform: "translateX(-50%)",

    backgroundColor: "#ffffff",
    boxShadow: "0 35px 80px -20px rgba(0,0,0,0.35)",
    borderRadius: "0.85rem",
    overflow: "hidden",
  },
  appStore: {
    width: "72rem",
    height: "54rem",
    top: "5rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#ffffff",
    boxShadow: "0 50px 120px -30px rgba(0,0,0,0.45)",
    borderRadius: "1rem",
    overflow: "hidden",
  },
  settings: {
    width: "56rem",
    height: "42rem",
    top: "6rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#ffffff",
    boxShadow: "0 40px 90px -20px rgba(0,0,0,0.40)",
    borderRadius: "0.9rem",
    overflow: "hidden",
  },


  resume: {},
  photos: {},
  txtfile: {},
  imgfile: {}
}

export const fontWeight = {
  subTitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 700, default: 400 }
}