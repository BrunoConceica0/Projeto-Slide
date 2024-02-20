import { SlideNav } from "./slide.js";

const slide = new SlideNav(".slide", ".wrapper");
slide.init();
slide.changeSlide(0);
slide.activePrevSlide();
slide.addArrow(".prev", ".next");
slide.addControl();
