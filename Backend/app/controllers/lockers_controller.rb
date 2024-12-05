class LockersController < ApplicationController
  before_action :set_locker, only: [:show, :update, :destroy, :update_email]
  before_action :set_locker_controller, only: [:index, :create]

  after_action :publish_mqtt_message_mailer, only: :send_code

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

    previous_state = @locker.abierto

    if @locker.update(abierto: params[:abierto])
      if previous_state != @locker.abierto
        publish_mqtt_message_state_change(params[:servo], @locker.abierto, params[:controller_id])
        LockerMailer.state_change_notification(@locker).deliver_now
      end
      render json: @locker
    else
      render json: @locker.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @locker.destroy
    head :no_content
  end

  def update_email
    if @locker.update(owner_email: params[:email])
      # Enviar correo al nuevo propietario
      LockerMailer.email_update_notification(@locker).deliver_now
  
      render json: { message: 'Email updated successfully', locker: @locker }, status: :ok
    else
      render json: { error: 'Failed to update email' }, status: :unprocessable_entity
    end
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
    new_int_password = Array.new(4) { rand(1..6) }.join.to_i
    @locker.update!(key_sequence: new_key_sequence, intPassword: new_int_password)

    puts "Generated key_sequence: #{new_key_sequence}"
    puts "Generated intPassword: #{new_int_password}"
  
    # Send the email
    LockerMailer.send_code(@locker).deliver_now
    render json: { message: 'Email sent successfully with new code' }, status: :ok
  end

  def active_count
    total_lockers_count = Locker.count
    render json: { count: total_lockers_count }
  end

  private

  def publish_mqtt_message_state_change(servo, state, controller)
    topic = 'ChangePassword'
    message = {
      estado: state,
      servo: servo,
      controller_id: controller,
  }.to_json
    MQTT_CLIENT.publish(topic, message)
    Rails.logger.info "Publicado mensaje MQTT: #{topic} -> #{message}"
  rescue StandardError => e
    Rails.logger.error "Error al publicar mensaje MQTT: #{e.message}"
  end

  def publish_mqtt_message_mailer
      topic = 'ChangePassword'
      message = {
          newPassword: @locker.intPassword,
          servo: params[:servo],
          controller_id: params[:controller_id],
      }.to_json
      MQTT_CLIENT.publish(topic, message)
  rescue StandardError => e
      Rails.logger.error "Error al publicar mensaje MQTT: #{e.message}"
  end

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