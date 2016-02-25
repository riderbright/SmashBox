class User < ActiveRecord::Base
  has_secure_password
  has_many :fossils
  #has_many :fossil_digs, through: :fossils
  
  def self.confirm(user_params)
    @user = User.find_by({handle: user_params[:handle]})
    @user.try(:authenticate, user_params[:password])
  
  end

end
