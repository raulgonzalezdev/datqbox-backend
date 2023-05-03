#!/bin/bash

add_relation_to_user() {
  sed -i "/define association here/a\
  this.hasMany(models.Address, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.hasMany(models.Cart, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.hasMany(models.Order, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.belongsToMany(models.Company, { through: models.UserCompany });" models/user.js
}

add_relation_to_company() {
  sed -i "/define association here/a\
  this.belongsToMany(models.User, { through: models.UserCompany });" models/company.js
}

add_relation_to_address() {
  sed -i "/define association here/a\
  this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });" models/address.js
}

add_relation_to_cart() {
  sed -i "/define association here/a\
  this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.hasMany(models.CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });" models/cart.js
}

add_relation_to_cartitem() {
  sed -i "/define association here/a\
  this.belongsTo(models.Cart, { foreignKey: 'cartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });" models/cartitem.js
}

add_relation_to_category() {
  sed -i "/define association here/a\
  this.hasMany(models.Product, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });" models/category.js
}

add_relation_to_color() {
  sed -i "/define association here/a\
  this.belongsToMany(models.Product, { through: models.ProductColor });" models/color.js
}

add_relation_to_product() {
  sed -i '/define association here/a\
  this.belongsTo(models.Category, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });\
  this.hasMany(models.Image, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });\
  this.hasMany(models.Review, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });\
  this.hasMany(models.OrderItem, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });\
  this.belongsToMany(models.Color, { through: models.ProductColor });\
  this.belongsToMany(models.Size, { through: models.ProductSize });' models/product.js
}

add_relation_to_image() {
  sed -i '/define association here/a\
  this.belongsTo(models.Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });' models/image.js
}

#!/bin/bash

add_relation_to_order() {
  sed -i "/define association here/a\
  this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
\
  this.hasMany(models.OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });" models/order.js
}

add_relation_to_orderitem() {
  sed -i "/define association here/a\
  this.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });" models/orderitem.js
}


add_relation_to_review() {
  sed -i '/define association here/a\
  this.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });\
\
  this.belongsTo(models.Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });\
  this.belongsTo(models.Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });' models/review.js
}

add_relation_to_size() {
  sed -i '/define association here/a\
  this.belongsToMany(models.Product, { through: models.ProductSize });' models/size.js
}
add_relation_to_invoice() {
  sed -i "/define association here/a\
  this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.belongsTo(models.Branch, { foreignKey: 'branchId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });\
  this.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });" models/invoice.js
}





# Agrega las relaciones a los archivos de modelos
add_relation_to_user
add_relation_to_company
add_relation_to_address
add_relation_to_cart
add_relation_to_cartitem
add_relation_to_category
add_relation_to_color
add_relation_to_product
add_relation_to_image
add_relation_to_order
add_relation_to_orderitem
add_relation_to_review
add_relation_to_size
add_relation_to_invoice

