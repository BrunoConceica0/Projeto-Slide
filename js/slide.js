export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
  }
  onStart(event) {
    event.preventDefault();
    console.log("Mousedown");
    this.wrapper.addEventListener("mousemove", this.onMove);
  }
  onMove(event) {
    // console.log("moveu");
  }
  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }
  onEnd(event) {
    // console.log("acabou");
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }
  bindEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  init() {
    this.bindEvent();
    this.addSlideEvent();
    return this;
  }
}
