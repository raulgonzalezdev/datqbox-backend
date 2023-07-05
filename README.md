# datqbox-backend

## Description

This is the "datqbox-backend" project, version 1.0.0. It is a backend application developed using Node.js, Express, and Sequelize ORM. It provides GraphQL API endpoints for a commerce platform.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://gitlab.com/datqbox/datqbox-backend`
2. Install the dependencies: `npm install`
3. Set up the PostgreSQL database:
   - Ensure PostgreSQL is installed and running.
   - Create a database named "ecommerce".
   - Set up the database connection in the `.env` file.
4. Run database migrations: `npx sequelize-cli db:migrate`
5. Start the server: `npm start`

## Scripts

- `start`: Starts the server using Node.js
- `chmod`: Grants execution permissions to shell scripts
- `db`: Runs the shell script to set up the database
- `test`: Runs the tests (currently no tests specified)

## Dependencies

- [apollo-server](https://www.npmjs.com/package/apollo-server) - v3.12.0
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - v2.4.3
- [cors](https://www.npmjs.com/package/cors) - v2.8.5
- [crypto](https://nodejs.org/api/crypto.html) - v1.0.1
- [dotenv](https://www.npmjs.com/package/dotenv) - v16.0.3
- [express](https://www.npmjs.com/package/express) - v4.18.2
- ... (list of other dependencies)

## License

This project is licensed under the [MIT License](LICENSE).

## Notes

- Ensure PostgreSQL is installed and running with a database named "ecommerce" before starting the server.

For more information, please refer to the [GitLab repository](https://gitlab.com/datqbox/datqbox-backend).
