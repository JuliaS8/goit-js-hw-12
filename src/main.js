import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const galleryContainer = document.getElementById('gallery');
  const loader = document.getElementById('loader');
  let lightbox;

  if (searchForm) {
    searchForm.addEventListener('submit', async event => {
      event.preventDefault();
      const query = document.getElementById('search-query').value.trim();
      if (!query) {
        showError('Please enter a search query');
        return;
      }
      try {
        loader.classList.add('loader-show');
        galleryContainer.innerHTML = '';

        const images = await fetchImages(query);
        if (images.length === 0) {
          showError(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        } else {
          renderImages(images, galleryContainer);
          if (lightbox) {
            lightbox.refresh();
          } else {
            lightbox = new SimpleLightbox('.gallery a', {
              captions: false,
              closeText: '×',
              history: false,
            });
          }
        }
      } catch (error) {
        showError('Failed to fetch images. Please try again later.');
      } finally {
        loader.classList.remove('loader-show');
      }
    });
  } else {
    console.error('Search form not found');
  }

  function showError(message) {
    iziToast.error({
      message: message,
      position: 'topRight',
      timeout: 5000,
      messageColor: '#fff',
      backgroundColor: '#EF4040',
      theme: 'dark',
      icon: 'none',
    });
  }
});
