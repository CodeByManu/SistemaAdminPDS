class CreateSymbolModels < ActiveRecord::Migration[7.2]
  def change
    create_table :symbol_models do |t|
      t.string :nombre, null: false
      t.boolean :activo, default: true, null: false

      t.timestamps
    end

    add_index :symbol_models, :nombre, unique: true
  end
end
