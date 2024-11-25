import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import { Application } from 'express';
import User from '../models/User'; // Importamos el modelo de usuario
// import IUserDocument  from '../models/User';
import { IUserDocument } from '../models/User'; 

export const googleAuth = (app: Application) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_ID!,
                clientSecret: process.env.GOOGLE_SECRET!,
                callbackURL: process.env.GOOGLE_CALLBACK_URL!
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Buscar si el usuario ya existe en la base de datos por el Google ID
                    let user = await User.findOne({ googleId: profile.id });

                    if (!user) {
                        // Si no existe, creamos un nuevo usuario con los datos de Google
                        user = new User({
                            name: profile.displayName,
                            email: profile.emails?.[0].value || '',
                            profilePic: profile.photos?.[0].value || '', // Foto de perfil de Google
                            status: 'ACTIVE', // Estado predeterminado
                        });

                        await user.save(); // Guardamos al usuario en la base de datos
                    }

                    return done(null, user); // Retorna el usuario
                } catch (error) {
                    console.error('Error al autenticar con Google:', error);
                    return done(error, undefined);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user); // Almacena el usuario en la sesión
    });

    passport.deserializeUser((user: unknown, done) => {
        done(null, user as IUserDocument); // Usa el tipo correctamente
    });

    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET_KEY || 'default_secret',
    }));

    app.use(passport.initialize());
    app.use(passport.session());
};
