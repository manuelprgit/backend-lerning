import 'dotenv/config';
import sql from 'mssql';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true
    }
};

export const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Base de datos conectada');
    } catch (error) {
        console.error(error);
    }
};

export default sql;
