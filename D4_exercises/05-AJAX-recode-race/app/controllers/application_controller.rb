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

  get '/sessions/:id/games' do

  end

  get '/games/:id/results' do

  end

  post '/sessions/:id/games' do
    request.body.rewind
    @return = JSON.parse(request.body.read)
    @newgame = Game.create(session_id: params[:id], status: "started")
    @first_player = Player.create(name: @return["player1"],session_id: params[:id],game_id: @newgame.id)
    @second_player= Player.create(name: @return["player2"],session_id: params[:id],game_id: @newgame.id)
    game_hash = JSON.parse(@newgame.to_json)
    game_hash[:player] = JSON.parse(@newgame.players.to_json)
    # byebug
    {:session_id => params[:id],:game => game_hash }.to_json
    # {:session_id => params[:id]}.to_json
  end

  patch '/games/:id/finish' do
    
  end
end

