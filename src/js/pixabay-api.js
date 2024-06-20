const PIXABAY_API_KEY = '44431480-fc282bb92f0a21d0f4ab058ec';

export async function fetchImages(query) {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}
