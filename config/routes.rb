Rails.application.routes.draw do
  resources :tasks
  root to: 'static_pages#todogarage'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
