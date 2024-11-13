module Api
    module V1
      class SessionsController < ApplicationController
        def auth_status
          render json: { logged_in: user_signed_in? }
        end
      end
    end
  end
  