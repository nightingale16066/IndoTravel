const fly = document.createElement('div');
const docEl = document.documentElement;
// const mQuery = window.matchMedia('(max-width: 758px)');
const flyStyle = `
  position: fixed;
  width: 50px;
  height: 50px;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
  background: url('img/airplane.svg') center/contain no-repeat;
`
let scrollPos = 0;

const removeFly = () => {
  if (window.innerWidth < 758) {
    fly.style.cssText = ''
  } else {
    fly.style.cssText = flyStyle;
    fly.style.transform = calcPositionFly()
  }
}

const calcPositionFly = () => {
  const maxBottom = docEl.clientHeight - fly.clientHeight; 
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  const persentScroll = (window.pageYOffset * 100) / maxScroll;
  const bottom = maxBottom * (persentScroll / 100);

  let style;
  let st = window.scrollY;
  
  if (st > scrollPos) {
    style = fly.style.transform =`translateY(-${bottom}px)`;
  } else {
    style = fly.style.transform =`translateY(-${bottom}px) rotate(180deg)`;
  }
  scrollPos = st;
  return style;
}

document.body.append(fly);

window.addEventListener('scroll', calcPositionFly);
window.addEventListener('resize', removeFly);

calcPositionFly();
removeFly();
