class CreateGestureFiles < ActiveRecord::Migration[7.2]
  def change
    create_table :gesture_files do |t|
      t.string :name
      t.string :gesture1
      t.string :gesture2
      t.string :gesture3
      t.string :gesture4
      t.string :gesture5
      t.string :gesture6

      t.timestamps
    end
  end
end
