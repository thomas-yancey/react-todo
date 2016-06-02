class Todo < ActiveRecord::Base
  has_many :items
end
