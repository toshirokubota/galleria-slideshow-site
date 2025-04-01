import {getData} from './shared.js';
const pictures = await getData('gallery_data', './data.json');
const picture_container = document.getElementById('picture');
const artist_image = document.getElementById('artist-image');
const artist_name = document.querySelectorAll('.artist-name');
const picture_name = document.querySelectorAll('.picture-name');
const description = document.getElementById('description');
const goToSource = document.getElementById('go-to-source');
const year = document.getElementById('year-painted');
const back_btn = document.getElementById('back-button');
const next_btn = document.getElementById('next-button');
const view_btn = document.getElementById('view-button');
const close_btn = document.getElementById('close-button');
const lightbox = document.getElementById('lightbox');
const lightbox_img = document.getElementById('lightbox-img');
const progress = document.getElementById('progress-bar');

let index = 0;

back_btn.addEventListener('click', ()=> {
    if(index > 0) {
        index = index - 1;
        populateSlide(pictures[index]);    
        updateStates();
    }
});
next_btn.addEventListener('click', ()=> {
    if(index < pictures.length - 1) {
        index = index + 1;
        populateSlide(pictures[index]);
        updateStates();
    }
});
view_btn.addEventListener('click', ()=> {
    lightbox.classList.toggle('shown');
});
close_btn.addEventListener('click', ()=> {
    lightbox.classList.toggle('shown');
});

const populateSlide = (picture)=> {
    if(picture) {
        console.log(picture);
        picture_container.innerHTML = `
            <source srcset="${picture.images.hero.large}" media="(min-width: 640px")>
            <img src="${picture.images.hero.small}" alt="${picture.name}">          
        `
        description.innerText = picture.description;
        year.innerText = '' + picture.year;
        for(let n of artist_name) {
            n.innerText = picture.artist.name;
        }
        for(let n of picture_name) {
            n.innerText = picture.name;
        }
        artist_image.setAttribute('src', picture.artist.image);
        artist_image.setAttribute('alt', picture.artist.image);
        goToSource.setAttribute('href', picture.source);
        lightbox_img.setAttribute('src', picture.images.gallery);
        lightbox_img.setAttribute('alt', picture.name);
    }
}

const updateStates = () => {
    if(index == 0) {
        //disable back button
        back_btn.setAttribute('disabled', true);
    } else {
        back_btn.removeAttribute('disabled');
    }
    if(index == pictures.length - 1) {
        //disable next button
        next_btn.setAttribute('disabled', true);
    } else {
        next_btn.removeAttribute('disabled');
    }
    progress.value = index + 1;
}

populateSlide(pictures[index]);

