require "test_helper"

class LockerControllersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get locker_controllers_index_url
    assert_response :success
  end

  test "should get show" do
    get locker_controllers_show_url
    assert_response :success
  end

  test "should get create" do
    get locker_controllers_create_url
    assert_response :success
  end

  test "should get update" do
    get locker_controllers_update_url
    assert_response :success
  end

  test "should get destroy" do
    get locker_controllers_destroy_url
    assert_response :success
  end
end
