import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import wishRoutes from './routes/wishRoutes';
import { swaggerSpec } from '../swagger';
import type { ErrorRequestHandler } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || '';

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main API routes
app.use('/v1/wishes', wishRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export default app;
