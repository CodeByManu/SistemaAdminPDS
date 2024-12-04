class GestureFilesController < ApplicationController
    before_action :set_gesture_file, only: [:show, :update, :destroy]
  
    def index
        @gesture_files = GestureFile.all
        render json: @gesture_files, only: [:id, :name, :gesture1, :gesture2, :gesture3, :gesture4, :gesture5, :gesture6]
      end
  
    def create
      @gesture_file = GestureFile.new(gesture_file_params)
    
      # Adjuntar el archivo si está presente
      if params[:gesture_file][:file].present?
        @gesture_file.file.attach(params[:gesture_file][:file])
      end
    
      if @gesture_file.save
        render json: @gesture_file, only: [:id, :name, :gesture1, :gesture2, :gesture3, :gesture4, :gesture5, :gesture6], status: :created
      else
        render json: @gesture_file.errors, status: :unprocessable_entity
      end
    end      
  
    def show
        render json: @gesture_file.as_json.merge(file_url: url_for(@gesture_file.file))
    end
  
    def update
      @gesture_file = GestureFile.find(params[:id])
      if @gesture_file.update(gesture_file_params)
        render json: @gesture_file, status: :ok
      else
        render json: @gesture_file.errors, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Archivo no encontrado' }, status: :not_found
    end
  
    def destroy
      @gesture_file.destroy
      head :no_content
    end
  
    private
  
    def set_gesture_file
      @gesture_file = GestureFile.find(params[:id])
    end
  
    def gesture_file_params
      params.require(:gesture_file).permit(:name, :file, :gesture1, :gesture2, :gesture3, :gesture4, :gesture5, :gesture6)
    end
  end
  