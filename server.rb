require 'sinatra'
require 'mcollective'
require 'fact_getter'
require 'pp'
require 'multi_json'


get '/' do
  "it worked"
end

get '/ping' do
  MCollective::Applications.run 'ping'
end

get '/fact/:fact' do
  facts = FactGetter.query_fact params[:fact]
  pp facts
  facts.to_json
end

