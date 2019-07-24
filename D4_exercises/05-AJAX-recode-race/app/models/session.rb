class Session < ActiveRecord::Base
    has_many :games
    has_many :players
end