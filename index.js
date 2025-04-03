import {getData} from './shared.js';

const container = document.getElementById('masonry-grid');
const pictures = await getData('gallery_data', './data.json');
const row_span = 10; //this needs to match .masonry-grid's grid-auto-rows property in style.scss
const row_gap = 32;  //this should match with .masonry-grid's column-gap for consistent gaps

//populate the gallery with images dynamically and make the association between figure element and its order in the DOM tree.
//the association is stored in FIGMAP and needed to open the right slide page for the figure element. 
const figmap = new Map();
for(let i=0; i<pictures.length; ++i) {
  const pic = pictures[i];

  const fig = document.createElement('figure');
  fig.setAttribute('tabindex', 0);
  fig.innerHTML = `
      <img src="${pic.images.thumbnail}" alt="thumbnail of ${pic.name}"/>
      <figurecaption>
          <span class='picture-name font-heading2'>${pic.name}</span>
          <span class='artist-name font-heading3'>${pic.artist.name}</span>
      </figurecaption>    
  `;
  container.appendChild(fig);
  figmap.set(fig, i);
}

//Event handlers for each figure.
figmap.forEach((value, key) => {
  //console.log(key, value);
  key.addEventListener('click', () => {
    window.open(`./slide.html?index=${value}`, '_self');
  });
  key.addEventListener('keydown', (e) => {
    if(e.keyCode == 13 || e.keyCode == 32) { //respond to Enter and Space keys
      window.open(`./slide.html?index=${value}`, '_self');
    }
  });
  key.addEventListener('focus', ()=> {
    key.scrollIntoView({
      behavior: 'auto', //smooth does not work well on FireFox.
      block: 'center',
      inline: 'nearest'});
  });
});

//need to wait for the entire DOM being populated to calculate the accurate --row-span of each figure.
const updateLayout = () => {
  for(let fig of container.children) {
    const img = fig.children[0];
    const rows = Math.ceil((img.clientHeight * (fig.clientWidth / img.clientWidth) + row_gap) / row_span);
    //console.log(img.clientHeight, img.clientWidth, rows);
    fig.style.setProperty('--row-span', rows);
    //console.log(img.clientWidth, img.clientHeight, rows, fig.clientWidth, fig.clientHeight);
  }    
}

window.onload = updateLayout;

window.onresize = updateLayout;

