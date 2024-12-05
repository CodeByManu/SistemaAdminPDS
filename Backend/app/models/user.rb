class User < ApplicationRecord
  def self.from_google(auth)
    user = User.find_or_create_by(email: auth.info.email) do |user|
      user.name = auth.info.name
      user.image_url = auth.info.image
    end
    user
  end
end
