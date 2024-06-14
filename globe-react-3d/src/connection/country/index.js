import { create } from 'apisauce';
import CountryStore from '../../store/countryStore';
import { getCountryData } from "../../connection";

const api = create({
    baseURL: 'https://nominatim.openstreetmap.org'
})

async function getDataForLat(lat, long) {
    const response = await api.get(`/reverse?format=json&lat=${lat}&lon=${long}&zoom=3&accept-language=en`);
    if (
        response.data &&
        response.data.address &&
        response.data.address.country
      ) {
        CountryStore.getState().addCountryStore(response.data.address.country);
        await getCountryData(response.data.address.country);
        return response.data.address.country;
      } else {
        console.log("Country name not found");
        return null
      }
}

export default getDataForLat;


