const client = require('../redis/redisClient');
const { UserInputError } = require('apollo-server');
const { Image, Product } = require('../../models');

const ImageResolvers = {
  Query: {
    images: async () => {
      let images = await client.get(`images`);
      if (!images) {
        images = await Image.findAll({
          include: [{ model: Product }]
        });
        await client.set(`images`, JSON.stringify(images));
      } else {
        images = JSON.parse(images);
      }
      return images;
    },
    image: async (_, { id }) => {
      let image = await client.get(`image:${id}`);
      if (!image) {
        image = await Image.findByPk(id, {
          include: [{ model: Product }]
        });
        await client.set(`image:${id}`, JSON.stringify(image));
      } else {
        image = JSON.parse(image);
      }
      return image;
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
      await client.del(`images`);
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
      await client.del(`images`);
      return newImages;
    },
    
    removeImage: async (_, { id }) => {
      const image = await Image.findByPk(id);
      if (!image) {
        throw new UserInputError(`Image with id ${id} not found`);
      }
      await image.destroy();
      await client.del(`images`);
      await client.del(`image:${id}`);
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
      await client.del(`images`);
      return true;
    }
  }
};

module.exports = ImageResolvers;
