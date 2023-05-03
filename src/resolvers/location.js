const { Location } = require('../../models');

const resolvers = {
  Query: {
    locations: async () => {
      const locations = await Location.findAll();
      return locations;
    },
    location: async (parent, { id }) => {
      const location = await Location.findByPk(id);
      return location;
    },
  },
  Mutation: {
    createLocation: async (parent, { input }) => {
      const newLocation = await Location.create(input);
      return newLocation;
    },
    updateLocation: async (parent, { id, input }) => {
      const location = await Location.findByPk(id);
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      await location.update(input);
      return location;
    },
    deleteLocation: async (parent, { id }) => {
      const location = await Location.findByPk(id);
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      await location.destroy();
      return true;
    },
  },
};

module.exports = resolvers;
