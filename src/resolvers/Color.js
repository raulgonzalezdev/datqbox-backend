const { Color } = require('../../models');
const ColorResolvers = {
    Query: {
      // Consulta para obtener todos los colores
      colors: async () => {
        try {
          const colors = await Color.findAll();
          return colors;
        } catch (error) {
          console.error(error);
        }
      },
  
      // Consulta para obtener un color específico por ID
      color: async (_, { id }) => {
        try {
          const color = await Color.findByPk(id);
          return color;
        } catch (error) {
          console.error(error);
        }
      },
    },
  
    Mutation: {
      // Mutación para crear un nuevo color
      createColor: async (_, { input }) => {
        try {
          const color = await Color.create(input);
          return color;
        } catch (error) {
          console.error(error);
        }
      },
  
      // Mutación para actualizar un color existente por ID
      updateColor: async (_, { id, input }) => {
        try {
          const color = await Color.findByPk(id);
          if (!color) {
            throw new Error(`Color with ID ${id} not found`);
          }
          await color.update(input);
          return color;
        } catch (error) {
          console.error(error);
        }
      },
  
      // Mutación para eliminar un color existente por ID
      deleteColor: async (_, { id }) => {
        try {
          const color = await Color.findByPk(id);
          if (!color) {
            throw new Error(`Color with ID ${id} not found`);
          }
          await color.destroy();
          return color;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  module.exports = ColorResolvers;  