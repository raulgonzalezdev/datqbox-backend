const { Product, Category, Image, Review, OrderItem, Color, Size } = require("../../models");

const ProductResolvers = {
  Query: {
    products: async () => {
      const products = await Product.findAll({
        include: [Category, Image, Review, OrderItem, Color, Size],
      });
      return products;
    },
    product: async (_, { id }) => {
      const product = await Product.findByPk(id, {
        include: [Category, Image, Review, OrderItem, Color, Size],
      });
      return product;
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      const product = await Product.create(input);
      return product;
    },
    updateProduct: async (_, { id, input }) => {
      await Product.update(input, { where: { id } });
      const updatedProduct = await Product.findByPk(id);
      return updatedProduct;
    },
    deleteProduct: async (_, { id }) => {
      await Product.destroy({ where: { id } });
      return true;
    },
  },
  Product: {
    category: async (product) => {
      const category = await Category.findByPk(product.categoryId);
      return category;
    },
    images: async (product) => {
      const images = await Image.findAll({ where: { productId: product.id } });
      return images;
    },
    reviews: async (product) => {
      const reviews = await Review.findAll({ where: { productId: product.id } });
      return reviews;
    },
    orderItems: async (product) => {
      const orderItems = await OrderItem.findAll({ where: { productId: product.id } });
      return orderItems;
    },
    colors: async (product) => {
      const colors = await product.getColors();
      return colors;
    },
    sizes: async (product) => {
      const sizes = await product.getSizes();
      return sizes;
    },
  },
};

module.exports = ProductResolvers;

  