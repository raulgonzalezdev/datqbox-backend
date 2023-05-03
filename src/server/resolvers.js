const { User, Address, Branch, Cart, CartItem, Category, Color, PaymentMethod, Product, Review, Size } = require("./models");

const resolvers = {
  Query: {
    users: () => User.findAll(),
    user: (_, { id }) => User.findByPk(id),
    addresses: () => Address.findAll(),
    address: (_, { id }) => Address.findByPk(id),
    branches: () => Branch.findAll(),
    branch: (_, { id }) => Branch.findByPk(id),
    carts: () => Cart.findAll(),
    cart: (_, { id }) => Cart.findByPk(id),
    cartItems: () => CartItem.findAll(),
    cartItem: (_, { id }) => CartItem.findByPk(id),
    categories: () => Category.findAll(),
    category: (_, { id }) => Category.findByPk(id),
    colors: () => Color.findAll(),
    color: (_, { id }) => Color.findByPk(id),
    paymentMethods: () => PaymentMethod.findAll(),
    paymentMethod: (_, { id }) => PaymentMethod.findByPk(id),
    products: () => Product.findAll(),
    product: (_, { id }) => Product.findByPk(id),
    reviews: () => Review.findAll(),
    review: (_, { id }) => Review.findByPk(id),
    sizes: () => Size.findAll(),
    size: (_, { id }) => Size.findByPk(id),
  },
  User: {
    addresses: (user) => Address.findAll({ where: { userId: user.id } }),
    orders: (user) => Order.findAll({ where: { userId: user.id } }),
    cart: (user) => Cart.findOne({ where: { userId: user.id } }),
    reviews: (user) => Review.findAll({ where: { userId: user.id } }),
  },
  Address: {
    user: (address) => User.findByPk(address.userId),
  },
  Branch: {
    products: (branch) => Product.findAll({ where: { branchId: branch.id } }),
  },
  Cart: {
    user: (cart) => User.findByPk(cart.userId),
    cartItems: (cart) => CartItem.findAll({ where: { cartId: cart.id } }),
  },
  CartItem: {
    cart: (cartItem) => Cart.findByPk(cartItem.cartId),
    product: (cartItem) => Product.findByPk(cartItem.productId),
  },
  Category: {
    products: (category) => Product.findAll({ where: { categoryId: category.id } }),
  },
  Color: {
    products: (color) => color.getProducts(),
  },
  PaymentMethod: {
    orders: (paymentMethod) => Order.findAll({ where: { paymentMethodId: paymentMethod.id } }),
  },
  Product: {
    category: (product) => Category.findByPk(product.categoryId),
    branch: (product) => Branch.findByPk(product.branchId),
    sizes: (product) => product.getSizes(),
    colors: (product) => product.getColors(),
    reviews: (product) => Review.findAll({ where: { productId: product.id } }),
  },
  Review: {
    user: (review) => User.findByPk(review.userId),
    product: (review) => Product.findByPk(review.productId),
  },
  Size: {
    products: (size) => size.getProducts(),
  },
};

module.exports = resolvers;

   
