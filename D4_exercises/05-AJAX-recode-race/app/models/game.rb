class Game < ActiveRecord::Base
    has_one :session
    has_many :players 
    # validate :two_players_in_the_game
 
  def two_players_in_the_game
    if self.players.length < 2
      errors.add(:player_limitation, "There has to be two players in the game")
    end
  end
end