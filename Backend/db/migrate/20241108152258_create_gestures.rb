class CreateGestures < ActiveRecord::Migration[7.2]
  def change
    create_table :gestures do |t|
      t.references :symbol_model, null: false, foreign_key: true
      t.string :gesture_type, null: false
      t.integer :position, null: false

      t.timestamps
    end

    add_index :gestures, [:symbol_model_id, :gesture_type, :position], unique: true, name: 'index_gestures_on_model_and_gesture_and_position'
  end
end