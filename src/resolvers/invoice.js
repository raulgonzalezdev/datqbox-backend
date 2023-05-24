const { User, UserCompany, Branch, PaymentMethod, InvoiceItem, Invoice } =  require('../../models'); 

const resolvers = {
  Query: {
    async getInvoice(_, { id }) {
      return await Invoice.findByPk(id);
    },
    async getAllInvoices() {
      return await Invoice.findAll();
    }
  },
  Mutation: {
    async createInvoice(_, { input }) {
      const newInvoice = await Invoice.create(input);
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
    paymentMethod: async (invoice) => {
      return await PaymentMethod.findByPk(invoice.paymentMethodId);
    },
    invoiceItems: async (invoice) => {
      return await InvoiceItem.findAll({ where: { invoiceId: invoice.id } });
    },
  },
};

module.exports = resolvers;
