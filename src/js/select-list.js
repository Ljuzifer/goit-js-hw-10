import { refs } from './refs';
import { fetchBreeds } from './cat-api';

export { renderByOptions, createBreedsList };

function renderByOptions(base) {
  const markup = base
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  refs.catBreedsList.insertAdjacentHTML('beforeend', markup);
}

function createBreedsList() {
  fetchBreeds().then(breeds => {
    renderByOptions(breeds);
  });
}
