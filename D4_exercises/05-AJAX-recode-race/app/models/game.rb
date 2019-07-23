class Game < ActiveRecord::Base
    has_many :players
    validate :just_two_players_in_the_game
 
  def just_two_players_in_the_game
    if self.players.length > 2
      errors.add(:expiration_date, "Just two players can be in the game")
    end
  end
end