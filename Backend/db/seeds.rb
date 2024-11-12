# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

# db/seeds.rb

# Crear un modelo de símbolo temporal
symbol_model = SymbolModel.create!(nombre: 'Modelo Temporal', activo: true)

# Crear usuarios con el symbol_model temporal
admin_user = User.create!(
  email: 'admin@ejemplo.com',
  nombre: 'Administrador',
  rol: 'administrador',
  symbol_model_id: symbol_model.id,  # Usamos el modelo temporal
  password: 'password',
  password_confirmation: 'password'
)

# Crear Controladores de Casilleros (Locker Controllers)
controller1 = LockerController.create!(
  nombre: 'Controlador 1',
  estado: 'conectado',
  ultima_conexion: Time.now,
  casilleros_activos: 5,
  alert_sent: false,
  user_id: admin_user.id
)

controller2 = LockerController.create!(
  nombre: 'Controlador 2',
  estado: 'conectado',
  ultima_conexion: Time.now,
  casilleros_activos: 3,
  alert_sent: false,
  user_id: admin_user.id
)

# Crear Casilleros (Lockers) asociados a los Controladores
locker1 = Locker.create!(
  nombre: 'Casillero 1',
  locker_controller_id: controller1.id,
  owner_email: 'usuario1@ejemplo.com',
  key_sequence: 'ABCD1234',
  abierto: false
)

locker2 = Locker.create!(
  nombre: 'Casillero 2',
  locker_controller_id: controller1.id,
  owner_email: 'usuario2@ejemplo.com',
  key_sequence: 'EFGH5678',
  abierto: true
)

locker3 = Locker.create!(
  nombre: 'Casillero 3',
  locker_controller_id: controller2.id,
  owner_email: 'usuario3@ejemplo.com',
  key_sequence: 'IJKL9101',
  abierto: false
)

locker4 = Locker.create!(
  nombre: 'Casillero 4',
  locker_controller_id: controller2.id,
  owner_email: 'usuario4@ejemplo.com',
  key_sequence: 'MNOP1122',
  abierto: true
)

# Imprimir un mensaje de confirmación
puts "Datos de ejemplo creados correctamente."
