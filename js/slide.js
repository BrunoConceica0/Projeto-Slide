export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
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
  // slides-config

  // configuração para deixa a imagem no centra do site
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }
  //  transformando o slide em array para pode falar com cada elemento
  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }
  // index da navegação dos slides
  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;

    this.index = {
      preve: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }
  // um metoda que muda o slide com passar do index
  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(this.slideArray[index].position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }
  // iniciar os eventos
  init() {
    this.bindEvent();
    this.addSlideEvent();
    this.slidesConfig();
    this.slidePosition(this.slide);
    return this;
  }
}
