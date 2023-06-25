import { refs } from './js/refs';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
// import { renderByOptions, createBreedsList } from './js/select-list';

createBreedsList();

refs.catBreedsList.addEventListener('change', createCatDescription);

function renderByOptions(base) {
  const markup = base
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  refs.catBreedsList.insertAdjacentHTML('beforeend', markup);
}

function createBreedsList() {
  const startOption = `<option value="-Tap here-"><span class="start-tap">-Tap here-</span></option>`;
  refs.catBreedsList.insertAdjacentHTML('afterbegin', startOption);
  fetchBreeds().then(res => {
    renderByOptions(res);
  });
}

function createCatDescription() {
  refs.catInfoRef.innerHTML = '';
  let breedId = refs.catBreedsList.value;
  fetchCatByBreed(breedId).then(data => {
    renderDescription(data);
  });
}

function renderDescription(data) {
  const catDescr = data.map(({ url, breeds }) => {
    return `<img class="cat-img" src=${url} alt=${breeds[0].name} width="500">
      <div class="cat-descr">
        <h2 class="cat-name">${breeds[0].name}</h2>
        <p class="about">${breeds[0].description}</p>
        <p class="tempo">Temperament: ${breeds[0].temperament}</p>
      </div>`;
  });

  refs.catInfoRef.insertAdjacentHTML('beforeend', catDescr);
}
