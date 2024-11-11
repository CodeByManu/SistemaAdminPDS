class CreateLockerControllers < ActiveRecord::Migration[7.2]
  def change
    create_table :locker_controllers do |t|
      t.string :nombre, null: false
      t.string :estado, null: false, default: 'conectado'
      t.datetime :ultima_conexion
      t.integer :casilleros_activos, null: false, default: 0
      t.boolean :alert_sent, null: false, default: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :locker_controllers, :nombre, unique: true
    add_index :locker_controllers, :estado
  end
end