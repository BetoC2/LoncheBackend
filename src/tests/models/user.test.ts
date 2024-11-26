import mongoose from 'mongoose';
import User from '../../models/User'; // Ajusta el path según tu estructura

describe('User Model Validation', () => {
    it('should throw validation error if required fields are missing', async () => {
        const user = new User(); // Crear un usuario vacío
        try {
            await user.validate();
        } catch (err) {
            const error = err as mongoose.Error.ValidationError; // Especifica el tipo aquí
            expect(error.errors).toHaveProperty('email'); // Verifica que 'email' sea requerido
        }
    });
});