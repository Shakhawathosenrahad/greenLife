// navBar menu button
const menu = document.querySelectorAll("nav .material-symbols-outlined");
const links = document.querySelector("nav .links");


menu.forEach((btn, index) => {
    btn.onclick = () => {
        if(index === 1) {
            links.style.right = 0;
            setTimeout(() => {
            links.style.borderRadius = "3% 0 0 3%";
            }, 50);
        }
        else {
            links.style.right = "-300px";
            setTimeout(() => {
            links.style.borderRadius = "30% 0 0 50%";
            }, 50);
        }
    }
})


// our installation in green house

function DynamicInsert(ul) {
    this.props = {
        ul,
        list: ["Internal transportation", "Greenhouse automation", "Concrete works", "Assimilation lighting", "Grow lights", "Tube rail carts", "Monorail carts", "Container system", "Sulphur burners", "Flower processing machine", "Mist system", "Horizonal air fans", "Sprayers", "Circulation pumps", "Mixing value", "Drip irrigation", "Drain gutters", "CO2 tubing", "Miscellaneoussupplies"]
    }
    for(let i = 0; i < this.props.list.length; i++) {
        ul.insertAdjacentHTML("beforeend", `<li>${this.props.list[i]}</li>`);
    }
}

DynamicInsert(document.querySelector(".green_house ul"));


// our gallery

const gallery = document.querySelector(".gallery_img");
const carousel_dot = document.querySelectorAll(".gallery .carousel_dot span");
let isScrolling = false, prevPageX, prevScrollLeft;

const scrolling = (e) => {
  if(!isScrolling) return;
  e.preventDefault();
  let positionDiff = e.pageX - prevPageX;
  if(innerWidth <= 500) {
    gallery.scrollLeft = positionDiff.toString().slice(0, 1) == "-" ? prevScrollLeft - positionDiff+200 : prevScrollLeft - positionDiff-200 ;
  }
  else {
    gallery.scrollLeft = prevScrollLeft - positionDiff;
  }
  carousel_dot.forEach(dot => {
    dot.classList.remove("active");
    let width = gallery.scrollLeft;
    if(width <= 183) {
      carousel_dot[0].classList.add("active");
    }
    else if(width <= 366) {
      carousel_dot[1].classList.add("active");
    }
    else {
      carousel_dot[2].classList.add("active");
    }
  })
};

const scrollStart = (e) => {
  isScrolling = true;
  prevPageX = e.pageX;
  prevScrollLeft = gallery.scrollLeft;
}

gallery.addEventListener("pointermove", scrolling);
gallery.addEventListener("pointerdown", scrollStart);
document.addEventListener("pointerup", () => isScrolling = false);



// our projects


function swiper(wrapper) {
  let cardIndex = 0;
  this.props = {
    wrapper,
    carousel: wrapper.querySelector(".carousel"),
    cards: wrapper.querySelectorAll(".carousel-card"),
    dots: wrapper.querySelector(".carousel-container .dot-container"),
    arrows: wrapper.querySelectorAll(".carousel-container > .fa-solid")
  }
  
  this.props.cards.forEach((card, index) => {
    if(index > this.props.cards.length - 2) return;
    let dot = document.createElement("label");
    this.props.dots.insertAdjacentElement("beforeend", dot);
    dot.addEventListener("click", () => {
      cardIndex = index;
      UpdateCarousel(index)
    })
  })
  this.props.dots.children[cardIndex].classList.add("active");
  this.props.cards[cardIndex + 1].classList.add("focus")

  this.props.arrows.forEach((arrow, index) => {
    arrow.onclick = () => {
      let total = responsive();
      if(index === 0) {
        cardIndex -= 1;
        if(cardIndex < 0) cardIndex = this.props.cards.length - total;
      }
      if(index === 1) {
          cardIndex += 1;
        if(cardIndex > this.props.cards.length - total) cardIndex = 0;
      }
      UpdateCarousel(cardIndex);
    }
  })

  UpdateCarousel = (dataindex) => {
    let total = responsive();
    this.props.carousel.style.transform = `translateX(-${dataindex * (100 / total)}%)`;
    
    this.props.cards.forEach(card => {
      card.classList.remove("focus");
    })
    this.props.cards[cardIndex + 1].classList.add("focus")
  
    for (let i = 0; i < this.props.dots.children.length; i++) {
      if(i === cardIndex) {
        this.props.dots.children[i].classList.add("active");
      }
      else {
        this.props.dots.children[i].classList.remove("active");
      }
    }
  }

  responsive = () => {
    let total = 3;
    if(innerWidth < 900 && innerWidth > 600) total = 2;
    else if(innerWidth <= 600) total = 1;
    return total;
  }

};


const carouselWrapper = new swiper(document.querySelector(".carousel-wrapper"));


for(let prop in window) {
  console.log(prop);
}

console.log(location);


// location.reload();