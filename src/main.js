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
  const loadMoreButton = document.getElementById('load-more');
  const loadMoreLoader = document.getElementById('load-more-loader');
  let lightbox;
  let currentPage = 1;
  let currentQuery = '';
  let imagesLoaded = false;

  function skipOldElement() {
    const liElem = galleryContainer.children[0];
    if (liElem) {
      const height = liElem.getBoundingClientRect().height;
      scrollBy({
        top: height * 3,
        behavior: 'smooth',
      });
    }
  }

  if (searchForm) {
    searchForm.addEventListener('submit', async event => {
      event.preventDefault();
      currentQuery = document.getElementById('search-query').value.trim();
      currentPage = 1;
      if (!currentQuery) {
        showError('Please enter a search query');
        return;
      }
      await fetchAndRenderImages(true);
    });
  } else {
    console.error('Search form not found');
  }

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', async () => {
      currentPage += 1;
      loadMoreLoader.classList.add('load-more-loader-show');
      await fetchAndRenderImages(false);
    });
  } else {
    console.error('Load more button not found');
  }

  async function fetchAndRenderImages(isNewQuery) {
    try {
      if (isNewQuery) {
        loader.classList.add('loader-show');
        galleryContainer.innerHTML = '';
        loadMoreButton.style.display = 'none';
        imagesLoaded = false;
      }
      const data = await fetchImages(currentQuery, currentPage);
      const { hits: images, totalHits } = data;
      if (images.length === 0 && currentPage === 1) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else {
        renderImages(images, galleryContainer, isNewQuery);
        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery a', {
            captions: false,
            closeText: '×',
            history: false,
          });
        }
        if (currentPage * 9 >= totalHits) {
          loadMoreButton.style.display = 'none';
          showError(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          loadMoreButton.style.display = 'block';
        }
        if (imagesLoaded) {
          skipOldElement();
        } else {
          imagesLoaded = true;
        }
      }
    } catch (error) {
      showError('Failed to fetch images. Please try again later.');
    } finally {
      loader.classList.remove('loader-show');
      loadMoreLoader.classList.remove('load-more-loader-show');
    }
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
