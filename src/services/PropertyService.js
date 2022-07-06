import axios from 'axios';

import { API_URL } from '../constants/main';

const PropertyService = {
  async getPropertyList({
    recent,
    bedrooms,
    bathrooms,
    minPrice,
    maxPrice,
    area,
    hasPool,
    hasHOAFee,
    type,
    region,
    floorCount,
    action,
  }) {
    const response = await axios.get(`${API_URL}/property`, {
      params: {
        recent,
        bedrooms,
        bathrooms,
        minPrice,
        maxPrice,
        area,
        hasPool,
        hasHOAFee,
        type,
        region,
        floorCount,
        action,
      },
    });
    return response.data;
  },

  async getSingleProperty(id) {
    const response = await axios.get(`${API_URL}/property/${id}`);
    return response.data;
  },
};

export default PropertyService;