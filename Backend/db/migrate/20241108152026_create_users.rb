class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :nombre, null: false
      t.string :rol, null: false, default: 'administrador'
      t.references :symbol_model, null: false, foreign_key: true

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :rol
  end
end