class RemoveUserIdFromLockerControllers < ActiveRecord::Migration[7.2]
  def change
    remove_column :locker_controllers, :user_id, :bigint
  end
end
