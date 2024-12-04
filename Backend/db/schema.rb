# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_12_04_021144) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "gesture_files", force: :cascade do |t|
    t.string "name"
    t.string "gesture1"
    t.string "gesture2"
    t.string "gesture3"
    t.string "gesture4"
    t.string "gesture5"
    t.string "gesture6"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gestures", force: :cascade do |t|
    t.bigint "symbol_model_id", null: false
    t.string "gesture_type", null: false
    t.integer "position", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["symbol_model_id", "gesture_type", "position"], name: "index_gestures_on_model_and_gesture_and_position", unique: true
    t.index ["symbol_model_id"], name: "index_gestures_on_symbol_model_id"
  end

  create_table "locker_controllers", force: :cascade do |t|
    t.string "nombre", null: false
    t.string "estado", default: "conectado", null: false
    t.datetime "ultima_conexion"
    t.integer "casilleros_activos", default: 0, null: false
    t.boolean "alert_sent", default: false, null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["estado"], name: "index_locker_controllers_on_estado"
    t.index ["nombre"], name: "index_locker_controllers_on_nombre", unique: true
    t.index ["user_id"], name: "index_locker_controllers_on_user_id"
  end

  create_table "locker_events", force: :cascade do |t|
    t.bigint "locker_id", null: false
    t.string "event_type", null: false
    t.datetime "timestamp", null: false
    t.string "ip_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["locker_id", "event_type", "timestamp"], name: "index_locker_events_on_locker_and_event_and_timestamp"
    t.index ["locker_id"], name: "index_locker_events_on_locker_id"
  end

  create_table "lockers", force: :cascade do |t|
    t.string "nombre", null: false
    t.bigint "locker_controller_id", null: false
    t.string "owner_email", null: false
    t.string "key_sequence", null: false
    t.boolean "abierto", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["locker_controller_id", "nombre"], name: "index_lockers_on_controller_and_nombre", unique: true
    t.index ["locker_controller_id"], name: "index_lockers_on_locker_controller_id"
    t.index ["owner_email"], name: "index_lockers_on_owner_email"
  end

  create_table "symbol_models", force: :cascade do |t|
    t.string "nombre", null: false
    t.boolean "activo", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nombre"], name: "index_symbol_models_on_nombre", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "nombre", null: false
    t.string "rol", default: "administrador", null: false
    t.bigint "symbol_model_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "provider"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["rol"], name: "index_users_on_rol"
    t.index ["symbol_model_id"], name: "index_users_on_symbol_model_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "gestures", "symbol_models"
  add_foreign_key "locker_controllers", "users"
  add_foreign_key "locker_events", "lockers"
  add_foreign_key "lockers", "locker_controllers"
  add_foreign_key "users", "symbol_models"
end
