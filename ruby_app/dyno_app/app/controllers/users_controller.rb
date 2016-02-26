class UsersController < ApplicationController
  # before_action :logged_in?, only: [:show]

  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def create
    user_params = params.require(:user).permit(:email, :handle, :info, :image, :password)
    @user = User.create(user_params)
    login(@user)
    redirect_to "/users/#{@user_id}"
  end

  def show
    @user = User.find(params[:id])
    current_user
    render :show
  end
end
