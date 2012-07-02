require 'sinatra'
require 'sinatra/static_assets'
require 'haml'
require 'json'
require 'facter'

use Rack::Session::Pool, :expire_after => 2592000

get '/' do
  haml :index
end

post '/refresh' do
  puts "refreshing facts"
  session[:fact_names] = Facter.to_hash.keys
  
  {:fact_names => session[:fact_names]}.to_json
end

post '/search' do
  fact_name = params[:fact_name_search]
  puts "searching for #{fact_name}"
  session[:fact_names] ||= Facter.to_hash.keys
  all_facts = session[:fact_names]
  
  facts = {}
  
  if fact_name == ":all"
    puts "we should get all the facts"
    facts = Facter.to_hash  
  elsif fact_name.length > 2
    name_regex = Regexp.compile fact_name
    all_facts.select{|fact| fact =~ name_regex}.each do |fact|
      regex_fact = Facter.value fact
      facts[fact] = regex_fact unless regex_fact.nil?
    end
  else
    exact_fact = Facter.value fact_name
    facts[fact_name] = exact_fact unless exact_fact.nil?
  end
  
  facts.to_json
end
