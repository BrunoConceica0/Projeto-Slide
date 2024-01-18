export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    // Este objeto vai ser geral, vai ter referencia dos números, na onde esta o slide, quando foi movido o mouse, finalPosition = posição final, startX = pegando referencia inicial onde foi executado o click ,movement= o total que se moveu
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }
  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }
  //o evento que começe
  onStart(event) {
    event.preventDefault(); //evitar que não ocorra a puxar a imagem
    // console.log("Mousedown");
    // o mousemouve sera excutado quando somento houver click e executará o callback de onMove
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }
  onMove(event) {
    // console.log("moveu");
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }
  //adicionamdo os evento ao clicar e mouver
  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }
  // remove o mouse move ao desclicar o evento
  onEnd(event) {
    // console.log("acabou");
    this.wrapper.removeEventListener("mousemove", this.onMove);
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
