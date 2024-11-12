require "test_helper"

class LockersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get lockers_index_url
    assert_response :success
  end

  test "should get show" do
    get lockers_show_url
    assert_response :success
  end

  test "should get create" do
    get lockers_create_url
    assert_response :success
  end

  test "should get update" do
    get lockers_update_url
    assert_response :success
  end

  test "should get destroy" do
    get lockers_destroy_url
    assert_response :success
  end

  test "should get toggle_state" do
    get lockers_toggle_state_url
    assert_response :success
  end
end
