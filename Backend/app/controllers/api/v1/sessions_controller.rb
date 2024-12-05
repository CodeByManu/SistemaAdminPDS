class SessionsController < ApplicationController
  # Login con Google
  def create_google
    auth = request.env['omniauth.auth']
    user = User.from_google(auth)
    session[:user_id] = user.id
    render json: { user: user, status: 'success' }
  end

  # Login con email y contraseña
  def create_email
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { user: user, status: 'success' }
    else
      render json: { error: 'Invalid credentials', status: 'failure' }
    end
  end

  # Handle failure (por ejemplo, error de Google)
  def failure
    render json: { error: 'Authentication failed', status: 'failure' }
  end
end
