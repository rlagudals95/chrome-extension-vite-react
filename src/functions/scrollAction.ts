//let scrollHeight = window.document.body.scrollHeight;

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const scrollAction = () => {
  let moveScrollRandom;
  let moveScrollTime;
  const scrollHeight = window.scrollY;
  const winowHeight = window.innerHeight;
  const totalHeight = document.body.offsetHeight;
  const isBottom = winowHeight + scrollHeight === totalHeight;

  if (isBottom) {
    window.scroll(0, 0);
  } else {
    //let scrollInterval = setInterval(randomScroll, moveScrollTime);

    for (let i = 0; i < 6; i++) {
      if (winowHeight + scrollHeight === totalHeight) return;
      moveScrollRandom = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000;
      moveScrollTime = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
      window.scrollBy(0, moveScrollRandom);
    }

  }
};


export default scrollAction;

