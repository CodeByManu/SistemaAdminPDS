class LockerMailer < ApplicationMailer
    default from: 'ialiberon@miuandes.cl'

    def send_code(locker)
        @locker = locker
        @key_sequence = locker.key_sequence
        # mail(to: @locker.owner_email, subject: 'Tu código de apertura')
        mail(to: 'ialiberon@miuandes.cl', subject: 'Tu código de apertura')
    end
end
