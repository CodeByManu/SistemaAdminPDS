class CreateLockerEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :locker_events do |t|
      t.references :locker, null: false, foreign_key: true
      t.string :event_type, null: false
      t.datetime :timestamp, null: false
      t.string :ip_address

      t.timestamps
    end

    add_index :locker_events, [:locker_id, :event_type, :timestamp], name: 'index_locker_events_on_locker_and_event_and_timestamp'
  end
end