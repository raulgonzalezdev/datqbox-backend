const { User, UserCompany, Branch, PaymentMethod, InvoiceItem, Invoice, CurrencyType, ExchangeRate } =  require('../../models'); 

const resolvers = {
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
    async createInvoice(_, { input }) {
      try {
        // Validación de entrada
        if (!input.userId || !input.branchId || !input.paymentMethodId) {
          throw new Error('Input inválido');
        }
  
        // Crear la factura
        const newInvoice = await Invoice.create(input);
  
        return newInvoice;
      } catch (error) {
        console.error(error);
        throw new Error('Error al crear la factura');
      }
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
    paymentMethod: async (invoice) => {
      return await PaymentMethod.findByPk(invoice.paymentMethodId);
    },
    invoiceItems: async (invoice) => {
      return await InvoiceItem.findAll({ where: { invoiceId: invoice.id } });
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

module.exports = resolvers;
