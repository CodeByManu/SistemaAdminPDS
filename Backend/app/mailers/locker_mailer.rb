class LockerMailer < ApplicationMailer
    default from: 'ialiberon@miuandes.cl'

    def send_code(locker)
        @locker = locker
        @key_sequence = locker.key_sequence
        # mail(to: @locker.owner_email, subject: 'Tu código de apertura')
        mail(to: 'ialiberon@miuandes.cl', subject: 'Tu código de apertura')
    end

    def state_change_notification(locker)
        @locker = locker
        @state = locker.abierto ? 'abierto' : 'cerrado'
        # mail(to: @locker.owner_email, subject: "Notificación de estado del casillero: #{@state}")
        mail(to: 'ialiberon@miuandes.cl', subject: "Notificación de estado del casillero: #{@state}")
    end

    def email_update_notification(locker)
        @locker = locker
        mail(
          to: @locker.owner_email,
          subject: 'Se ha actualizado el correo electrónico del casillero'
        )
    end
    
end