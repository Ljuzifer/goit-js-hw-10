export { fetchBreeds, fetchCatByBreed };

const CAT_BREED_KEY = 'https://api.thecatapi.com/v1/breeds';
const CAT_IMAGE_KEY = 'https://api.thecatapi.com/v1/images/search';

const options = {
  Headers: {
    'x-api-key':
      'live_b58inZFyIYUTFHaXaplUw39kbzxywyhdTVeSssZKw2aEK89V4d79im36h1AQ4xFV',
  },
};

function fetchBreeds() {
  return fetch(CAT_BREED_KEY, options).then(res => {
    console.log(res);
    return res.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${CAT_IMAGE_KEY}?breed_ids=${breedId}`, options)
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res[0];
    });
}
