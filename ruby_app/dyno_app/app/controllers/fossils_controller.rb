class FossilsController < ApplicationController
 
  
  def index
    @fossils = Fossil.all
   
    render :index
  
  end

  def new
    @user = current_user
    @fossil = Fossil.new
    render :new
  end

  def create
    @user = current_user
    fossil_params = params.require(:fossil).permit(:user_id, :status, :image)
    @fossil = Fossil.create(fossil_params)
    redirect_to "/fossils"
  end

  def show
    @fossils = Fossil.all
    @fossil = Fossil.find(params[:id])

    render :show
   
  end
end
