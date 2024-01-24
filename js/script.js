import { SlideNav } from "./slide.js";

const slide = new SlideNav(".slide", ".wrapper");
slide.init();
console.log(slide);
slide.changeSlide(0);
slide.activePrevSlide();
slide.addArrow(".prev", ".next");
console.log(slide);
