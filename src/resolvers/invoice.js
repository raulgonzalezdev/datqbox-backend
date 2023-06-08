const { User, UserCompany, Branch, PaymentMethod, InvoiceItem, Invoice, CurrencyType, ExchangeRate, InvoicePaymentMethod } =  require('../../models'); 

const InvoiceResolvers = {
  Query: {
    async getInvoice(_, { id }) {
      return await Invoice.findByPk(id);
    },
    async getAllInvoices() {
      return await Invoice.findAll({
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC']
        ]
      });
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
  
      return newInvoice;
    },
    async updateInvoice(_, { id, input }) {
      await Invoice.update(input, { where: { id } });
      return await Invoice.findByPk(id);
    },
    async deleteInvoice(_, { id }) {
      return await Invoice.destroy({ where: { id } });
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
    taxInvoices: async (invoice) => await invoice.getTaxInvoices(), 
    // currency: async (invoice) => {
    //   return await CurrencyType.findByPk(invoice.currencyId);
    // },
    exchangeRate: async (invoice) => {
      return await ExchangeRate.findByPk(invoice.exchangeRateId);
    },
  },
  
};

module.exports = InvoiceResolvers;
