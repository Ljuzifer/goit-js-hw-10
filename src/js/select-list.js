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
  const startOption = `<option value="-Tap here-"><span class="start-tap">-Tap here-</span></option>`;
  refs.catBreedsList.insertAdjacentHTML('afterbegin', startOption);
  fetchBreeds().then(res => {
    renderByOptions(res);
  });
}
