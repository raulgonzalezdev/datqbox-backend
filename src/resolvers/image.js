const { UserInputError } = require('apollo-server');
const { Image, Product } = require('../../models');

const ImageResolvers = {
  Query: {
    images: async () => {
      return await Image.findAll({
        include: [{ model: Product }]
      });
    },
    image: async (_, { id }) => {
      return await Image.findByPk(id, {
        include: [{ model: Product }]
      });
    }
  },
  Mutation: {
    addImage: async (_, { input }) => {
      const { url, product } = input;
      const productId = product.id;
      const productExists = await Product.findByPk(productId);
      if (!productExists) {
        throw new UserInputError(`Product with id ${productId} not found`);
      }
      const newImage = await Image.create({ url, productId });
      return await Image.findByPk(newImage.id, {
        include: [{ model: Product }]
      });
    },
    addImages: async (_, { input }) => {
      const { images } = input;
      const newImages = [];
    
      for (let imageInput of images) {
        const { url, product } = imageInput;
        const productId = product.id;
        const productExists = await Product.findByPk(productId);
        if (!productExists) {
          throw new UserInputError(`Product with id ${productId} not found`);
        }
        const newImage = await Image.create({ url, productId });
        const newImageWithProduct = await Image.findByPk(newImage.id, {
          include: [{ model: Product }]
        });
        newImages.push(newImageWithProduct);
      }
      return newImages;
    },
    
    removeImage: async (_, { id }) => {
      const image = await Image.findByPk(id);
      if (!image) {
        throw new UserInputError(`Image with id ${id} not found`);
      }
      await image.destroy();
      return true;
    },
    removeProductImages: async (_, { productId }) => {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new UserInputError(`Product with id ${productId} not found`);
      }
      await Image.destroy({
        where: { productId: productId }
      });
      return true;
    }
  }
};

module.exports = ImageResolvers;
