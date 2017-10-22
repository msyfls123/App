class Number < Struct.new(:value)
    def to_s
        value.to_s
    end
end

class Add < Struct.new(:left, :right)
end

class Multiply < Struct.new(:left, :right)
end