class AddIntPasswordToLockers < ActiveRecord::Migration[7.2]
  def change
    add_column :lockers, :intPassword, :integer
  end
end
