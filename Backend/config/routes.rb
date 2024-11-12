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
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :lockers, only: [:index]
  # Defines the root path route ("/")
  # root "posts#index"
end
