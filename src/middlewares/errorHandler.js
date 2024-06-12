const errorDictionary = {
    VALIDATION_ERROR: 'Error de validación',
    DATABASE_ERROR: 'Error de base de datos',
    UNKNOWN_ERROR: 'Error desconocido'
  };
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const errorType = err.type || 'UNKNOWN_ERROR';
    const errorMessage = errorDictionary[errorType] || 'Error interno del servidor';
    res.status(500).json({ error: errorMessage });
  };
  