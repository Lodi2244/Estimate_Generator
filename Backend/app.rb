require 'sinatra'
require 'sinatra/cross_origin'
require 'pry'

class MyApp < Sinatra::Base
  set :bind, '0.0.0.0'
  configure do
    enable :cross_origin
  end
  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  post '/countwords' do
    hash = JSON.parse(request.body.read)
    text = hash["Source"]
    word_count = Hash.new 0
    words = text.scan(/[\w\u00C0-\u017F'-]+/)
    words.each do |word|
      word_count[word.downcase] += 1
    end
    total_price = word_count.length * hash["pricePerWord"].to_f
    { "totalPrice" => total_price, "words" => word_count }.to_json
  end



  options "*" do
    response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end
end
