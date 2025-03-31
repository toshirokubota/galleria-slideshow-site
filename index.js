import {getData} from './shared.js';

const container = document.getElementById('gallery-container');
const pictures = await getData('gallery_data', './data.json');

//console.log(pictures);

const populateThumbnail = (picture) => {
    return `
      <figure>
        <img src="${picture.images.thumbnail}" alt="thumbnail of ${picture.name}"/>
        <figurecaption>
            <span class='picture-name font-heading2'>${picture.name}</span>
            <span class='artist-name font-heading3'>${picture.artist.name}</span>
        </figurecaption>
      </figure>
    `;
  }

for(let pic of pictures) {
    console.log(pic);
    container.innerHTML += (populateThumbnail(pic));
}

