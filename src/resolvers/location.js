const client = require('../redis/redisClient');
const { Location } = require("../../models");

const LocationResolvers = {
  Query: {
    locations: async () => {
      let locations = await client.get('locations');
      if (!locations) {
        locations = await Location.findAll();
        await client.set('locations', JSON.stringify(locations));
      } else {
        locations = JSON.parse(locations);
      }
      return locations;
    },
    location: async (parent, { id }) => {
      let location = await client.get(`location:${id}`);
      if (!location) {
        location = await Location.findByPk(id);
        await client.set(`location:${id}`, JSON.stringify(location));
      } else {
        location = JSON.parse(location);
      }
      return location;
    },
  },
  Mutation: {
    createLocation: async (parent, { input }) => {
      const newLocation = await Location.create(input);
      await client.del('locations');
      return newLocation;
    },
    updateLocation: async (parent, { id, input }) => {
      const location = await Location.findByPk(id);
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      await location.update(input);
      await client.del(`location:${id}`);
      await client.del('locations');
      return location;
    },
    deleteLocation: async (parent, { id }) => {
      const location = await Location.findByPk(id);
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      await location.destroy();
      await client.del(`location:${id}`);
      await client.del('locations');
      return true;
    },
  },
};

module.exports = LocationResolvers;
