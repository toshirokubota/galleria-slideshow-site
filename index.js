import {getData} from './shared.js';

const container = document.getElementById('masonry-grid');
const pictures = await getData('gallery_data', './data.json');
const row_span = 10;
const row_gap = 32;

//console.log(pictures);

// const populateThumbnail = (picture) => {
//     return `
//       <figure>
//         <img src="${picture.images.thumbnail}" alt="thumbnail of ${picture.name}"/>
//         <figurecaption>
//             <span class='picture-name font-heading2'>${picture.name}</span>
//             <span class='artist-name font-heading3'>${picture.artist.name}</span>
//         </figurecaption>
//       </figure>
//     `;
//   }

const figmap = new Map();
for(let i=0; i<pictures.length; ++i) {
  const pic = pictures[i];

  const fig = document.createElement('figure');

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

figmap.forEach((value, key) => {
  //console.log(key, value);
  key.addEventListener('click', () => {
    window.open(`./slide.html?index=${value}`, '_self');
  })
});


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

