class GestureFile < ApplicationRecord
    has_one_attached :file
  
    validates :name, presence: true
    validates :file, presence: true
    validates :gesture1, :gesture2, :gesture3, :gesture4, :gesture5, :gesture6, presence: true
    
    private
  
    def correct_file_type
      if file.attached? && !file.content_type.in?(%w(text/plain application/octet-stream))
        errors.add(:file, 'Debe ser un archivo .cc')
      elsif file.attached? == false
        errors.add(:file, 'Es obligatorio')
      end
    end
  end
  