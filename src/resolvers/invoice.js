const client = require('../redis/redisClient');
const { User, UserCompany, Branch, PaymentMethod, InvoiceItem, Invoice, CurrencyType, ExchangeRate, InvoicePaymentMethod } =  require('../../models'); 

const InvoiceResolvers = {
  Query: {
    async getInvoice(_, { id }) {
      let invoice = await client.get(`invoice:${id}`);
      if (!invoice) {
        invoice = await Invoice.findByPk(id);
        await client.set(`invoice:${id}`, JSON.stringify(invoice));
      } else {
        invoice = JSON.parse(invoice);
      }
      return invoice;
    },
    async getAllInvoices() {
      let invoices = await client.get('invoices');
      if (!invoices) {
        invoices = await Invoice.findAll({
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC']
          ]
        });
        await client.set('invoices', JSON.stringify(invoices));
      } else {
        invoices = JSON.parse(invoices);
      }
      return invoices;
    }
  },
  Mutation: {
    createInvoice: async (parent, { input }) => {
      const newInvoice = await Invoice.create(input);
  
      if (input.paymentMethodIds) {
        for (let i = 0; i < input.paymentMethodIds.length; i++) {
          const paymentMethod = await PaymentMethod.findByPk(input.paymentMethodIds[i]);
          if (!paymentMethod) {
            throw new Error(`No se encontró el método de pago con id ${input.paymentMethodIds[i]}`);
          }
          await newInvoice.addPaymentMethod(paymentMethod);
        }
      }
      await client.del('invoices');
      return newInvoice;
    },
    async updateInvoice(_, { id, input }) {
      await Invoice.update(input, { where: { id } });
      const updatedInvoice = await Invoice.findByPk(id);
      await client.del(`invoice:${id}`);
      await client.del('invoices');
      return updatedInvoice;
    },
    async deleteInvoice(_, { id }) {
      const deleted = await Invoice.destroy({ where: { id } });
      if (deleted) {
        await client.del(`invoice:${id}`);
        await client.del('invoices');
      }
      return deleted;
    },
  },
  Invoice: {
    user: async (invoice) => {
      return await User.findByPk(invoice.userId);
    },
    companies: async (invoice) => {
      const userCompanies = await UserCompany.findAll({
        where: { userId: invoice.userId, companyId: invoice.companyId }
      });
    
      const companies = await Promise.all(userCompanies.map(async userCompany => {
        const company = await userCompany.getCompanys();
        return company;
      }));
    
      return companies;
    },
    
    branch: async (invoice) => {
      return await Branch.findByPk(invoice.branchId);
    },

    paymentMethods: async (invoice) => {
      return await invoice.getPaymentMethods();
    },
    invoiceItems: async (invoice) => {
      return await InvoiceItem.findAll({ where: { invoiceId: invoice.id } });
    },
    invoicePaymentMethods: async (invoice) => {
      return await InvoicePaymentMethod.findAll({ where: { invoiceId: invoice.id } });
    },
    taxInvoices: async (invoice) => {
      invoice = await Invoice.findByPk(invoice.id);  // Vuelve a buscar la instancia Sequelize aquí
      return await invoice.getTaxInvoices(); 
    },
    exchangeRate: async (invoice) => {
      return await ExchangeRate.findByPk(invoice.exchangeRateId);
    },
  },
  
};

module.exports = InvoiceResolvers;

