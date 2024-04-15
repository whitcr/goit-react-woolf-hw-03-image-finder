import axios from 'axios';

const API_KEY = '42206478-925606497870cbb45f2a85a6e';
const API_URL = 'https://pixabay.com/api/';

export const fetchImg = async (query, currentPage) => {
  const response = await axios.get(
    `${API_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
