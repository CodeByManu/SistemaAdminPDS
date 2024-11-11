class CreateLockers < ActiveRecord::Migration[7.2]
  def change
    create_table :lockers do |t|
      t.string :nombre, null: false
      t.references :locker_controller, null: false, foreign_key: true
      t.string :owner_email, null: false
      t.string :key_sequence, null: false
      t.boolean :abierto, default: false

      t.timestamps
    end

    add_index :lockers, [:locker_controller_id, :nombre], unique: true, name: 'index_lockers_on_controller_and_nombre'
    add_index :lockers, :owner_email
  end
end