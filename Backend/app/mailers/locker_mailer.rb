class LockerMailer < ApplicationMailer
    default from: 'manueltagle2002@gmail.com'

    def send_code(locker)
        @locker = locker
        @key_sequence = locker.key_sequence
        @int_password = locker.intPassword
        # mail(to: @locker.owner_email, subject: 'Tu código de apertura')
        mail(to: 'manueltagle2002@gmail.com', subject: 'Tu código de apertura')
    end

end