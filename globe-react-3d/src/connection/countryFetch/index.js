import { create } from 'apisauce';
import CountryStore from '../../store/countryStore';

const apiCountryFetched = create({
    baseURL: 'https://restcountries.com/v3.1/name'
  })
  
  async function getCountryData(countryName) {
    const response = await apiCountryFetched.get(`/${countryName}`);
    if (response.data) {
        CountryStore.getState().countryFetchedStore(response.data);
        console.log(CountryStore.getState().countryFetched);
        return response.data;
      } else {
        console.log("Country information not found");
        return null
      }
  }
  export default getCountryData;