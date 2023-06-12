const { createClient } = require('redis');
const client = createClient();

const { promisify } = require('util');

client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  try {
      await client.connect();
      console.log("Connected to Redis");

      // Move promise bindings here after connection
      global.getAsync = promisify(client.get).bind(client);
      global.setAsync = promisify(client.set).bind(client);
  } catch (err) {
      console.error("Failed to connect to Redis", err);
  }
};
connectRedis();





const { Product, Category, Image, Review, OrderItem, Color, Size, ProductColor, ProductSize, ExchangeRate, CompositeProductItems, ProductCosts } = require("../../models");

const ProductResolvers = {
  Query: {
    products: async () => {
      try {
        let products = await getAsync('products');
        if (!products) {
          products = await Product.findAll({
            include: [Category, Image, Review, OrderItem, ProductColor, ProductSize],
            order: [
              [Category, 'name', 'ASC'],
              ['id', 'ASC'],
            ],
          });
          await setAsync('products', JSON.stringify(products));
        } else {
          products = JSON.parse(products);
        }
        return products;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    product: async (_, { id }) => {
      try {
        let product = await getAsync(`product:${id}`);
        if (!product) {
          product = await Product.findByPk(id, {
            include: [Category, Image, Review, OrderItem, ProductColor, ProductSize],
          });
          await setAsync(`product:${id}`, JSON.stringify(product));
        } else {
          product = JSON.parse(product);
        }
        return product;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      const product = await Product.create(input);
      // Invalidate 'products' cache
      client.del('products');
      return product;
    },
    updateProduct: async (_, { id, input }) => {
      await Product.update(input, { where: { id } });
      const updatedProduct = await Product.findByPk(id);
      // Invalidate 'products' and specific 'product' cache
      client.del(`product:${id}`);
      client.del('products');
      return updatedProduct;
    },
    deleteProduct: async (_, { id }) => {
      await Product.destroy({ where: { id } });
      // Invalidate 'products' and specific 'product' cache
      client.del(`product:${id}`);
      client.del('products');
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
    exchangeRate: async (product) => {
      // Find the most recent exchange rate for the product's currency
      const exchangeRate = await ExchangeRate.findOne({
        where: { currencyId: product.exchangeRateId },
        order: [['date', 'DESC']]
      });

      return exchangeRate;
    },
    mainProducts: async (product) => {
      const mainProducts = await CompositeProductItems.findAll({ where: { mainProductId: product.id } });
      return mainProducts;
    },
    includedProducts: async (product) => {
      const includedProducts = await CompositeProductItems.findAll({ where: { includedProductId: product.id } });
      return includedProducts;
    },
    productCosts: async (product) => {
      const productCosts = await ProductCosts.findOne({ where: { productId: product.id } });
      return productCosts;
    },
  },
};

module.exports = ProductResolvers;
