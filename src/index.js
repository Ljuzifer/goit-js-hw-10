import { refs } from './js/refs';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { renderByOptions, createBreedsList } from './js/select-list';

createBreedsList();

// refs.catBreedsList.addEventListener('change', createBreedsList);
