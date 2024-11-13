class LockersController < ApplicationController
  before_action :set_locker, only: [:show, :update, :destroy]
  before_action :set_locker_controller, only: [:index]

  def index
    @lockers = @locker_controller.lockers
    render json: @lockers
  end

  def show
    render json: @locker
  end

  def create
    @locker = Locker.new(locker_params)
    @locker.key_sequence ||= Gesture.pluck(:gesture_type).sample(4).join('-')
    
    if @locker.save
      render json: @locker, status: :created
    else
      render json: @locker.errors, status: :unprocessable_entity
    end
  end  

  def update
    if @locker.update(locker_params)
      render json: @locker
    else
      render json: @locker.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @locker.destroy
    head :no_content
  end

  # def send_code
  #   locker = Locker.find(params[:id])
  #   LockerMailer.send_code(locker).deliver_now
  #   render json: { message: 'Email sent successfully' }, status: :ok
  # end

  def send_code
    # Debugging step to ensure locker is set
    puts "Locker ID: #{params[:id]}" # Debugging output
    @locker = Locker.find_by(id: params[:id])
  
    # Check if locker was found
    if @locker.nil?
      render json: { error: 'Locker not found' }, status: :not_found
      return
    end
  
    # Generate new key sequence and update locker
    new_key_sequence = Gesture.pluck(:gesture_type).sample(4).join('-')
    @locker.update!(key_sequence: new_key_sequence)
  
    # Send the email
    LockerMailer.send_code(@locker).deliver_now
    render json: { message: 'Email sent successfully with new code' }, status: :ok
  end  

  private

  def set_locker
    @locker = Locker.find(params[:id])
  end

  def set_locker_controller
    @locker_controller = LockerController.find(params[:locker_controller_id])  # Find the locker controller
  end

  def locker_params
    params.require(:locker).permit(:nombre, :locker_controller_id, :owner_email, :key_sequence, :abierto)
  end
end
