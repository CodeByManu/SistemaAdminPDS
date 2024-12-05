// Mock de datos para métricas
const lockerStats = {
    totalLockers: 100,
    activeLockers: 80,
    totalControllers: 10,
    activeControllers: 8,
    dailyOpenings: [15, 20, 18, 25, 30, 12, 20], // Últimos 7 días
  };
  
  const getDashboardMetrics = (req, res) => {
    const metrics = {
      totalUsers: 2, // Cambia a un conteo real de usuarios
      ...lockerStats,
      averageDailyOpenings: lockerStats.dailyOpenings.reduce((a, b) => a + b) / lockerStats.dailyOpenings.length,
    };
    res.json(metrics);
  };
  
  module.exports = { getDashboardMetrics };