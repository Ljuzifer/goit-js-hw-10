export { fetchBreeds, fetchCatByBreed };

const API_KEY =
  'live_b58inZFyIYUTFHaXaplUw39kbzxywyhdTVeSssZKw2aEK89V4d79im36h1AQ4xFV';
const CAT_BREED_KEY = 'https://api.thecatapi.com/v1/breeds';
const CAT_IMAGE_KEY = 'https://api.thecatapi.com/v1/images/search';

const options = {
  Headers: {
    'x-api-key': API_KEY,
  },
};

function fetchBreeds() {
  return fetch(CAT_BREED_KEY, options).then(res => {
    return res.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${CAT_IMAGE_KEY}?breed_ids=${breedId}&api_key=${API_KEY}`).then(
    res => {
      return res.json();
    }
  );
}
