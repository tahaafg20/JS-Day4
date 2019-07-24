class ApplicationController < Sinatra::Base

  register Sinatra::ActiveRecordExtension

  configure do
  	set :views, "app/views"
    set :public_dir, "public"
    #enables sessions as per Sinatra's docs. Session_secret is meant to encript the session id so that users cannot create a fake session_id to hack into your site without logging in. 
    enable :sessions
    set :session_secret, "secret"
  end

  get '/' do
    erb :"/home"
  end

  post '/sessions', provides: [:json] do
    @session = Session.create()
    {:session => @session}.to_json
  end

  # get '/sessions/:id/games' do

  # end

  # get '/games/:id/results' do

  # end

  post '/sessions/:id/games' do
    request.body.rewind
    @return = JSON.parse(request.body.read)
    @newgame = Game.create(session_id: params[:id], status: "started")
    @first_player = Player.find_or_create_by(name: @return["player1"]) 
    @first_player.update(session_id: params[:id])
    @first_player.save
    @first_player.update(game_id: @newgame.id)
    @first_player.save
    @second_player= Player.find_or_create_by(name: @return["player2"])
    @second_player.update(session_id: params[:id])
    @second_player.save
    @second_player.update(game_id: @newgame.id)
    @second_player.save
    game_hash = JSON.parse(@newgame.to_json)
    game_hash[:player] = JSON.parse(@newgame.players.to_json)
    # byebug
    {:session_id => params[:id],:game => game_hash }.to_json
    # {:session_id => params[:id]}.to_json
  end

  patch '/games/:id/finish' do
    request.body.rewind
    @return1 = JSON.parse(request.body.read)
    @started_game = Game.find_by(id: params[:id], status: "started")
    # byebug
    @started_game.update(status: "completed", winner: @return1["winner"], elapsed_time: @return1["elapsed_time"])
    # byebug
    @started_game_hash = JSON.parse(@started_game.to_json)
    @started_game_hash[:player] = JSON.parse(@started_game.players.to_json)
    # byebug
    {:session_id => @started_game.session_id,:game => @started_game_hash }.to_json
  end
end

