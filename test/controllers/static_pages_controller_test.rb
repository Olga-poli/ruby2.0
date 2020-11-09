require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get todogarage" do
    get static_pages_todogarage_url
    assert_response :success
  end

end
