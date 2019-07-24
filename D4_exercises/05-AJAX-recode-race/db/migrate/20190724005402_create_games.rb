class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :winner
      t.integer :elapsed_time
      t.string :status
      t.integer :session_id
      t.timestamps
    end
  end
end
