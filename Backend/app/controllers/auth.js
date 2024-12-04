const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Cambia a una clave segura

// Mock de usuarios (puedes conectar con tu base de datos)
const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'superuser' },
  { id: 2, username: 'user', password: 'userpass', role: 'normal' },
];

// Login y generación de tokens
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send('Credenciales incorrectas');
  
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
  res.json({ token });
};

// Middleware para verificar autenticación y roles
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido');
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = decoded; // Agrega los datos del usuario al request
    next();
  });
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).send('Acceso denegado');
  next();
};

module.exports = { login, authenticate, authorizeRole };s