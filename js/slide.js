export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    if (!this.wrapper || !this.slide) {
      console.error("Wrapper or slide not found.");
      return;
    }
    // Este objeto vai ser geral, vai ter referencia dos números, na onde esta o slide, quando foi movido o mouse, finalPosition = posição final, startX = pegando referencia inicial onde foi executado o click ,movement= o total que se moveu
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }
  //atualzar o movement
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.finalPosition - this.dist.movement;
  }
  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }
  //o evento que começe
  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault(); //evitar que não ocorra a puxar a imagem
      this.dist.startX = event.clientX;
      console.log(event);
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      console.log(event);
      movetype = "touchmove";
    }
    // console.log("Mousedown");
    // o mousemouve sera excutado quando somento houver click e executará o callback de onMove

    this.wrapper.addEventListener(movetype, this.onMove);
  }
  onMove(event) {
    // console.log("moveu");

    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }
  //adicionamdo os evento ao clicar e mouver
  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }
  // remove o mouse move ao desclicar o evento
  onEnd(event) {
    // console.log("acabou");
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";

    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }
  // colocando todos callback no bind em forma de paramentro
  bindEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }
  // iniciar os eventos
  init() {
    this.bindEvent();
    this.addSlideEvent();
    return this;
  }
}
