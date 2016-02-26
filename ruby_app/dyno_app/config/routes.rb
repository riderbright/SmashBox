Rails.application.routes.draw do
  
  root to: "users#index"

  get "/users", to: "users#index", as: "users"

  get "/users/new", to: "users#new", as: "new_user" #shows new user form

  post "/users", to: "users#create" # after new user form is submitted

  get "/users/:id", to: "users#show" 

  
  get "/sign_in", to: "sessions#new" # shows sign-in form after user created

  post "/sessions", to: "sessions#create"  # after sign-in form submitted

  delete "/sessions/:id", to: "sessions#destroy"
  
  
  get "/fossils", to: "fossils#index", as: "fossil"
  
  get "/fossils/new", to: "fossils#new", as: "new_fossil"

  post "/fossils", to: "fossils#create"

  get "/fossils/:id", to: "fossils#show"



end
