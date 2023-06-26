import { refs } from './refs';
import { loadImage } from '../index';

export { handleLoadingActive, handleLoadingDisable };

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
