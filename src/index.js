import './css/main.css';
import { Notify } from 'notiflix';
import { refs } from './js/refs';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { handleLoadingActive, handleLoadingDisable } from './js/loading';

new SlimSelect({
  select: '#single',
});

const notiOps = {
  width: '555px',
  fontSize: '18px',
  position: 'center-bottom',
  distance: '33px',
  borderRadius: '13px',
  timeout: 2200,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};

refs.catBreedsList.setAttribute('id', 'single');
refs.loaderRef.insertAdjacentHTML(
  'beforebegin',
  `<div class="load"><span class='load-img'></span></div>`
);
export const loadImage = document.querySelector('div.load');

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
  fetchBreeds()
    .then(res => {
      renderByOptions(res);
      Notify.success(
        'Hi!!! There are many interesting cat breeds for you!!!',
        notiOps
      );
    })
    .catch(err => {
      console.log(err);
      refs.catBreedsList.style.visibility = 'hidden';
      Notify.failure(`${refs.errorRef.textContent}`, notiOps);
    });
}

function createCatDescription() {
  handleLoadingActive();
  refs.catInfoRef.innerHTML = '';
  let breedId = refs.catBreedsList.value;
  fetchCatByBreed(breedId)
    .then(data => {
      if (breedId === '--Tap here--') {
        handleLoadingDisable();
        Notify.success('Tap and try to choose one...', notiOps);
        return;
      }
      renderDescription(data);
      Notify.success('Very good choice!!! :)', notiOps);
    })
    .catch(err => {
      console.log(err);
      handleLoadingDisable();
      refs.catBreedsList.style.visibility = 'hidden';
      Notify.failure(`${refs.errorRef.textContent}`, notiOps);
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

// function handleLoadingActive() {
//   refs.catBreedsList.style.visibility = 'hidden';
//   refs.loaderRef.classList.add('active');
//   loadImage.classList.add('active');
// }

// function handleLoadingDisable() {
//   refs.catBreedsList.style.visibility = 'visible';
//   refs.loaderRef.classList.remove('active');
//   loadImage.classList.remove('active');
// }
