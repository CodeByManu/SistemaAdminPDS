class LockerController < ApplicationRecord
  belongs_to :user
  has_many :lockers
end
