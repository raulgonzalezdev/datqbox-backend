const { Product, Category, Image, Review, OrderItem, Color, Size, ProductColor, ProductSize } = require("../../models");


const ProductResolvers = {
  Query: {
    products: async () => {
      const products = await Product.findAll({
        include: [Category, Image, Review, OrderItem, ProductColor, ProductSize],
      });
      return products;
    },
    product: async (_, { id }) => {
      const product = await Product.findByPk(id, {
        include: [Category, Image, Review, OrderItem, ProductColor, ProductSize],
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
    productColors: async (product) => {
      const productColors = await ProductColor.findAll({ where: { ProductId: product.id } });
      return productColors;
    },
    productSizes: async (product) => {
      const productSizes = await ProductSize.findAll({ where: { ProductId: product.id } });
      return productSizes;
    },
  },
};

module.exports = ProductResolvers;
