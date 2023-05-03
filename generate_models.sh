
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,avatar:string,role:string
npx sequelize model:generate --name Company --attributes name:string,address:string,phoneNumber:string,email:string,legalId:string
npx sequelize model:generate --name UserCompany --attributes userId:integer,companyId:integer
npx sequelize model:generate --name Address --attributes street:string,city:string,state:string,zipCode:string,country:string,userId:integer
npx sequelize model:generate --name Branch --attributes name:string
npx sequelize model:generate --name Cart --attributes userId:integer
npx sequelize model:generate --name CartItem --attributes cartId:integer,productId:integer,quantity:integer,price:float
npx sequelize model:generate --name Category --attributes name:string,image:string
npx sequelize model:generate --name Color --attributes name:string,hexCode:string
npx sequelize model:generate --name Image --attributes url:string,productId:integer
npx sequelize model:generate --name Location --attributes lat:float,lng:float
npx sequelize model:generate --name Order --attributes userId:integer,totalPrice:float,status:string
npx sequelize model:generate --name OrderItem --attributes orderId:integer,productId:integer,quantity:integer,price:float
npx sequelize model:generate --name Product --attributes name:string,vendor:string,image:string,price:float,categoryId:integer,inventory:integer,rentalType:string,featured:boolean,newarrivals:boolean,taxRate:integer
npx sequelize model:generate --name InvoiceItem --attributes invoiceId:integer,productId:integer,quantity:integer,price:float
npx sequelize model:generate --name PaymentMethod --attributes name:string,description:string
npx sequelize model:generate --name ProductColor --attributes productId:integer,colorId:integer
npx sequelize model:generate --name ProductSize --attributes productId:integer,sizeId:integer
npx sequelize model:generate --name Review --attributes userId:integer,productId:integer,rating:integer,comment:text
npx sequelize model:generate --name Size --attributes name:string
npx sequelize model:generate --name Invoice --attributes userId:integer,branchId:integer,paymentMethodId:integer,total:float,tax:float,status:string



npx sequelize db:migrate

npx sequelize seed:generate --name sample-data

