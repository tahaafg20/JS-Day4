class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :game_id
    end
    add_index :players, :name
    add_index :players, :game_id
    add_index :players, [:name, :game_id], unique: true
  end
end
