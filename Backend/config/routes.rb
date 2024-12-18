Rails.application.routes.draw do
  get "lockers/index"
  get "lockers/show"
  get "lockers/create"
  get "lockers/update"
  get "lockers/destroy"
  get "lockers/toggle_state"
  get "locker_controllers/index"
  get "locker_controllers/show"
  get "locker_controllers/create"
  get "locker_controllers/update"
  get "locker_controllers/destroy"

  # devise_for :users, controllers: {
  #   omniauth_callbacks: 'users/omniauth_callbacks'
  # }

  resources :gesture_files, only: [:index, :create, :update, :destroy]
  get 'locker_events/daily_openings', to: 'locker_events#daily_openings'
  
  resources :locker_controllers, only: [:index, :show, :create, :update, :destroy] do
    collection do
      get :count
    end
    resources :lockers, only: [:index, :show, :create, :update, :destroy] do
      member do
        post :send_code 
        patch :toggle_state
        put :update_email
      end
    end
  end

  resources :lockers, only: [] do
    collection do
      get 'active_count'
    end
  end

  resources :users, only: [] do
    collection do
      get :count
    end
  end

  namespace :api do
    namespace :v1 do
      get 'auth_status', to: 'sessions#auth_status'
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get '/auth/google_oauth2/callback', to: 'sessions#create_google'
  get '/auth/failure', to: 'sessions#failure'
  post '/login/email', to: 'sessions#create_email'
  # Defines the root path route ("/")
  # root "posts#index"
end
