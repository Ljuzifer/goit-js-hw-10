import './css/main.css';
import { refs } from './js/refs';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
// import { renderByOptions, createBreedsList } from './js/select-list';
new SlimSelect({
  select: '#single',
});

refs.catBreedsList.setAttribute('id', 'single');
refs.loaderRef.insertAdjacentHTML(
  'beforebegin',
  `<div class="load"><span class='load-img'></span></div>`
);
const loadImage = document.querySelector('div.load');

handleLoadingActive();
setTimeout(() => {
  createBreedsList();
}, 800);

refs.catBreedsList.addEventListener('change', createCatDescription);

function renderByOptions(base) {
  handleLoadingDisable();
  const markup = base
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  refs.catBreedsList.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

function createBreedsList() {
  const startOption = `<option value="--Tap here--">--Tap here--</option>`;
  refs.catBreedsList.insertAdjacentHTML('afterbegin', startOption);
  fetchBreeds().then(res => {
    renderByOptions(res);
  });
}

function createCatDescription() {
  handleLoadingActive();
  refs.catInfoRef.innerHTML = '';
  let breedId = refs.catBreedsList.value;
  fetchCatByBreed(breedId).then(data => {
    renderDescription(data);
  });
}

function renderDescription(data) {
  setTimeout(() => {
    const catDescr = data.map(({ url, breeds }) => {
      return `<img class="cat-img" src=${url} alt=${breeds[0].name} width="400">
      <div class="cat-descr">
        <h2 class="cat-name">${breeds[0].name}</h2>
        <p class="about">${breeds[0].description}</p>
        <p><span class="tempo">Temperament: </span>${breeds[0].temperament}</p>
      </div>`;
    });

    refs.catInfoRef.insertAdjacentHTML('beforeend', catDescr);
    handleLoadingDisable();
  }, 800);
}

function handleLoadingActive() {
  refs.catBreedsList.style.visibility = 'hidden';
  refs.loaderRef.classList.add('active');
  loadImage.classList.add('active');
}

function handleLoadingDisable() {
  refs.catBreedsList.style.visibility = 'visible';
  refs.loaderRef.classList.remove('active');
  loadImage.classList.remove('active');
}
