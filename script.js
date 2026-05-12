// script.js

/* =========================
   SELECT ELEMENTS
========================= */

const images =
document.querySelectorAll('.gallery img');

const lightbox =
document.getElementById('lightbox');

const lightboxImg =
document.getElementById('lightbox-img');

const closeBtn =
document.querySelector('.close');

const nextBtn =
document.getElementById('next');

const prevBtn =
document.getElementById('prev');

const favoriteBtn =
document.getElementById('favoriteBtn');

const themeToggle =
document.getElementById('themeToggle');

const downloadBtn =
document.getElementById('downloadBtn');

const searchBar =
document.getElementById('searchBar');

const categoryButtons =
document.querySelectorAll('.nav-btn');

/* =========================
   VARIABLES
========================= */

let currentIndex = 0;

let zoomLevel = 1;

/* =========================
   OPEN IMAGE
========================= */

images.forEach((img,index)=>{

  img.addEventListener('click',()=>{

    if(lightbox){

      lightbox.style.display='flex';
    }

    if(lightboxImg){

      lightboxImg.src=img.src;
    }

    currentIndex=index;

    if(downloadBtn){

      downloadBtn.href=img.src;
    }

    zoomLevel=1;

    if(lightboxImg){

      lightboxImg.style.transform='scale(1)';
    }
  });
});

/* =========================
   CLOSE LIGHTBOX
========================= */

if(closeBtn){

  closeBtn.onclick=()=>{

    lightbox.style.display='none';
  };
}

/* =========================
   NEXT IMAGE
========================= */

if(nextBtn){

  nextBtn.onclick=()=>{

    currentIndex=
    (currentIndex+1)%images.length;

    updateImage();
  };
}

/* =========================
   PREVIOUS IMAGE
========================= */

if(prevBtn){

  prevBtn.onclick=()=>{

    currentIndex=
    (currentIndex-1+images.length)%images.length;

    updateImage();
  };
}

/* =========================
   UPDATE IMAGE
========================= */

function updateImage(){

  if(lightboxImg){

    lightboxImg.src=
    images[currentIndex].src;
  }

  if(downloadBtn){

    downloadBtn.href=
    images[currentIndex].src;
  }

  zoomLevel=1;

  if(lightboxImg){

    lightboxImg.style.transform='scale(1)';
  }
}

/* =========================
   SEARCH CATEGORIES
========================= */

function searchCategories(){

  if(!searchBar) return;

  const input =
  searchBar.value.toLowerCase();

  categoryButtons.forEach(button=>{

    const text =
    button.innerText.toLowerCase();

    if(text.includes(input)){

      button.style.display='inline-block';

    }else{

      button.style.display='none';
    }
  });
}

/* =========================
   SEARCH IMAGES
========================= */

function searchImages(){

  if(!searchBar) return;

  const input =
  searchBar.value.toLowerCase();

  images.forEach(img=>{

    const name =
    img.getAttribute('data-name') || '';

    if(
      name.toLowerCase().includes(input)
    ){

      img.style.display='block';

    }else{

      img.style.display='none';
    }
  });
}

/* =========================
   IMAGE FILTERS
========================= */

function setFilter(filterType){

  images.forEach(img=>{

    img.style.filter=filterType;
  });
}

/* =========================
   DARK MODE
========================= */

if(themeToggle){

  themeToggle.onclick=()=>{

    document.body.classList.toggle('dark');
  };
}

/* =========================
   FAVORITES
========================= */

if(favoriteBtn){

  favoriteBtn.onclick=()=>{

    alert('Added to Favorites ❤️');
  };
}

/* =========================
   IMAGE ZOOM
========================= */

if(lightboxImg){

  lightboxImg.addEventListener(
    'wheel',
    (e)=>{

      e.preventDefault();

      if(e.deltaY<0){

        zoomLevel+=0.1;

      }else{

        zoomLevel-=0.1;
      }

      zoomLevel=
      Math.max(1,zoomLevel);

      lightboxImg.style.transform=
      `scale(${zoomLevel})`;
    }
  );
}

/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener(
'keydown',
(e)=>{

  if(
    lightbox &&
    lightbox.style.display==='flex'
  ){

    if(e.key==='ArrowRight'){

      if(nextBtn){

        nextBtn.click();
      }
    }

    if(e.key==='ArrowLeft'){

      if(prevBtn){

        prevBtn.click();
      }
    }

    if(e.key==='Escape'){

      lightbox.style.display='none';
    }
  }
});

/* =========================
   CLOSE WHEN CLICK OUTSIDE
========================= */

if(lightbox){

  lightbox.addEventListener(
    'click',
    (e)=>{

      if(e.target===lightbox){

        lightbox.style.display='none';
      }
    }
  );
}
/* =========================
   FAVORITES / UNFAVORITE
========================= */

if(favoriteBtn){

  favoriteBtn.onclick=()=>{

    const currentImage =
    images[currentIndex].src;

    let favorites =
    JSON.parse(
      localStorage.getItem('favorites')
    ) || [];

    /* ADD FAVORITE */

    if(!favorites.includes(currentImage)){

      favorites.push(currentImage);

      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
      );

      favoriteBtn.innerHTML='💖';

      favoriteBtn.style.background='red';

      alert('Added to Favorites ❤️');

    }

    /* REMOVE FAVORITE */

    else{

      favorites =
      favorites.filter(
        img=>img!==currentImage
      );

      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
      );

      favoriteBtn.innerHTML='❤️';

      favoriteBtn.style.background=
      'rgba(255,255,255,0.15)';

      alert('Removed from Favorites');
    }
  };
}