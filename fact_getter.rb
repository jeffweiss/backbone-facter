require 'mcollective'

class FactGetter 
  extend MCollective::RPC


  def self.query_fact(fact)
    puts "we want to get #{fact}"
    rpcutil = rpcclient("rpcutil")
    rpcutil.progress = false

    facts = {}

    rpcutil.get_fact(:fact => fact) do |resp|
      begin
        value = resp[:body][:data][:value]
        if value
          facts.include?(value) ? facts[value] << resp[:senderid] : facts[value] = [ resp[:senderid] ]
        end
      rescue Exception => e
        STDERR.puts "Could not parse facts for #{resp[:senderid]}: #{e.class}: #{e}"
      end
    end

    facts
  end
end
