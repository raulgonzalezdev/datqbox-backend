const { UserInputError } = require('apollo-server-express');
const { Invoice, User, Branch, PaymentMethod, InvoiceItem,UserCompany } = require('../../models');

const InvoiceResolvers = {
  Query: {
    getInvoice: async (_, { id }) => {
      const invoice = await Invoice.findByPk(id, {
        include: [
          { model: User, as: 'user' }, 
          { model: UserCompany, as: 'companies' }, 
          { model: Branch, as: 'branch' }, 
          { model: PaymentMethod, as: 'paymentMethod' }, 
          InvoiceItem
        ],
      });

      if (!invoice) {
        throw new UserInputError(`Invoice with id ${id} not found`);
      }

      return invoice;
    },
    getInvoices: async () => {
      const invoices = await Invoice.findAll({
        include: [
          { model: User, as: 'user' }, 
          { model: UserCompany, as: 'companies' },
          { model: Branch, as: 'branch' }, 
          { model: PaymentMethod, as: 'paymentMethod' }, 
          InvoiceItem
        ],
      });
    
      // Filtrar facturas sin usuario asociado
      const invoicesWithUser = invoices.filter(invoice => invoice.user !== null);
    
      return invoicesWithUser;
    },
  },
  Mutation: {
    createInvoice: async (_, { input }) => {
      const { userId, branchId, companyId, paymentMethodId, total, tax, status } = input;
      const user = await User.findByPk(userId);
      if (!user) {
        throw new UserInputError(`User with id ${userId} not found`);
      }
      const branch = await Branch.findByPk(branchId);
      if (!branch) {
        throw new UserInputError(`Branch with id ${branchId} not found`);
      }
      const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
      if (!paymentMethod) {
        throw new UserInputError(`Payment method with id ${paymentMethodId} not found`);
      }
      let userCompany = null;
      if (companyId) {
        userCompany = await UserCompany.findOne({ where: { userId: userId, companyId: companyId } });
        if (!userCompany) {
          throw new UserInputError(`UserCompany with user id ${userId} and company id ${companyId} not found`);
        }
      }
      
  
      return await Invoice.reload({
        include: [User, UserCompany, Branch, PaymentMethod, InvoiceItem],
      });
    },
    updateInvoice: async (_, { id, input }) => {
      const { total, tax, status } = input;
      const invoice = await Invoice.findByPk(id);
      if (!invoice) {
        throw new UserInputError(`Invoice with id ${id} not found`);
      }
      const updatedInvoice = await invoice.update({ total, tax, status });
      return await updatedInvoice.reload({
        include: [User, UserCompany, Branch, PaymentMethod, InvoiceItem],
      });
    },
    deleteInvoice: async (_, { id }) => {
      const invoice = await Invoice.findByPk(id);
      if (!invoice) {
        throw new UserInputError(`Invoice with id ${id} not found`);
      }
      await invoice.destroy();
      return true;
    },
  },
};

module.exports = InvoiceResolvers;
