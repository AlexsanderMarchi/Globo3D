import { create } from 'apisauce';
import CountryStore from '../../store/countryStore';

const apiCountryImage = create({
    baseURL: 'https://images-api.nasa.gov'
  })
  
  async function getCountryImages(countryName) {
    const response = await apiCountryImage.get(`/search?q=${countryName}`);
    if (response.data && response.data.collection && response.data.collection.items.length > 0) {
      const firstItem = response.data.collection.items[0];

      const itemResponse = await fetch(firstItem.href);
    const itemData = await itemResponse.json();

    
        CountryStore.getState().countryImageStore(itemData);
        // console.log(CountryStore.getState().countryImages);
        return response.data;
      } else {
        console.log("Country information not found");
        return null
      }
  }
  export default getCountryImages;