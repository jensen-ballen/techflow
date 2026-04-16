import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});