import axios from 'axios';

const PIXABAY_API_KEY = '44431480-fc282bb92f0a21d0f4ab058ec';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, per_page = 15) {
  const url = `${BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}
