class UsersController < ApplicationController
    def count
      user_count = User.count
      render json: { count: user_count }, status: :ok
    end
end
