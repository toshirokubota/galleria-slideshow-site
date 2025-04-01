import {getData} from './shared.js';

const container = document.getElementById('masonry-grid');
const pictures = await getData('gallery_data', './data.json');
const row_span = 10;

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

for(let pic of pictures) {
    //console.log(pic);
    const fig = document.createElement('figure');

    fig.innerHTML = `
        <img src="${pic.images.thumbnail}" alt="thumbnail of ${pic.name}"/>
        <figurecaption>
            <span class='picture-name font-heading2'>${pic.name}</span>
            <span class='artist-name font-heading3'>${pic.artist.name}</span>
        </figurecaption>    
    `;

    // const img = fig.children[0];
    // const rows = Math.ceil(img.clientHeight / row_span);
    // console.log(img.clientHeight, rows);
    // fig.style.setProperty('--row-span', 5);
    container.appendChild(fig);
    //container.innerHTML += (populateThumbnail(pic));
}

window.onload = () => {
  for(let fig of container.children) {
    const img = fig.children[0];
    const rows = Math.ceil(img.clientHeight / row_span);
    console.log(img.clientHeight, rows);
    fig.style.setProperty('--row-span', rows);
  }    
}

