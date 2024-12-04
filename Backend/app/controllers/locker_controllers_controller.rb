class LockerControllersController < ApplicationController
  def index
    locker_controllers = LockerController.all
    render json: locker_controllers
  end

  def show
    @locker_controller = LockerController.find(params[:id])
    render json: @locker_controller
  end  

  def create
    @locker_controller = LockerController.new(locker_controller_params)
  
    if @locker_controller.save
      render json: @locker_controller, status: :created
    else
      render json: { errors: @locker_controller.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @locker_controller = LockerController.find(params[:id])
  
    if @locker_controller.update(locker_controller_params)
      render json: @locker_controller
    else
      render json: { errors: @locker_controller.errors.full_messages }, status: :unprocessable_entity
    end
  end  

  def destroy
    @locker_controller = LockerController.find(params[:id])
    @locker_controller.destroy
    head :no_content
  end
  
  def count
    count = LockerController.count
    render json: { count: count }
  end

  private

  def locker_controller_params
    params.require(:locker_controller).permit(:nombre, :estado, :user_id)
  end

end