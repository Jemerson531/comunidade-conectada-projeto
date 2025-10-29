const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Rota de health check melhorada
router.get('/health', async (req, res) => {
  try {
    console.log('🔍 Health check executado');
    
    // Testar conexão com o banco
    connection.execute('SELECT 1 as test', (error, results) => {
      if (error) {
        console.error('❌ Erro no health check:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Database connection failed',
          error: error.message
        });
      }
      
      console.log('✅ Health check - Banco OK');
      res.json({
        status: 'success',
        message: 'API está funcionando!',
        database: 'connected',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });
    
  } catch (error) {
    console.error('❌ Erro crítico no health check:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router;