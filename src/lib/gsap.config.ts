import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let configured = false;

export const configureGsap = (): void => {
  if (configured) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  configured = true;
};

export { gsap, ScrollTrigger };
