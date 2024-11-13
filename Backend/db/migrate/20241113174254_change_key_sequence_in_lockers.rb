class ChangeKeySequenceInLockers < ActiveRecord::Migration[7.2]
  def change
    change_column_null :lockers, :key_sequence, false
  end
end
