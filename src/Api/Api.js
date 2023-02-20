import axios from 'axios';

export const imagesWithQuery = async (searchQuery, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=31879858-48b8240230109758709fe8f87&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
