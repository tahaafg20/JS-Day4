class Player < ActiveRecord::Base
    belongs_to :session
    belongs_to :game 
    validates :name, presence: true
    validates :name, uniqueness: true
end