const { getPlaceLoc } = require('../server/getPlaceLoc');
const axios = require('axios');

jest.mock('axios');

describe('getPlaceLoc function', () => {
  it('should return error message for invalid place', async () => {
    const place = 'invalidPlace';
    const username = 'yourUsername';
    const errorMessage = {
      message: 'No location bearing that name. Please check your again',
      error: true,
    };
    axios.get.mockResolvedValue({ data: { geonames: [] } });
    const result = await getPlaceLoc(place, username);
    expect(result).toEqual(errorMessage);
  });

  it('should return location details for valid place', async () => {
    const place = 'validPlace';
    const username = 'yourUsername';
    const mockData = {
      geonames: [{ name: 'Valid Place', lat: 123, lng: 456 }],
    };
    axios.get.mockResolvedValue({ data: mockData });
    const result = await getPlaceLoc(place, username);
    expect(result).toEqual({
      name: 'Valid Place',
      lat: 123,
      lng: 456,
    });
  });
});
