const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Comunidade Conectada API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota para frontend
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '../frontend' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
});