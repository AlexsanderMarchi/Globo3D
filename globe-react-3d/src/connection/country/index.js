import { create } from 'apisauce'

const api = create({
    baseURL: 'https://nominatim.openstreetmap.org'
})

async function getDataForLat(lat, long) {
    const response = await api.get(`/reverse?format=json&lat=${lat}&lon=${long}&zoom=3`);

    if (
        response.data &&
        response.data.address &&
        response.data.address.country
      ) {
        return response.data.address.country;
      } else {
        console.log("Country information not found");
        return null
      }
}

export default getDataForLat