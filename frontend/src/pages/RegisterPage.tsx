import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'ATHLETE',
        coachId: '',
        categoryId: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const registerResponse = await api.post('/auth/register', formData);

            // Si es Deportista, NO iniciamos sesión automáticamente, porque está PENDING
            if (formData.role === 'ATHLETE') {
                setSuccessMessage('¡Cuenta creada con éxito! Tu registro está pendiente de aprobación por tu entrenador. Te notificaremos cuando puedas acceder.');
                // Limpiamos el formulario o redirigimos después de unos segundos
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            } else {
                // Si es Coach, asumimos que puede entrar directo (o cambiamos esto si también require aprobación)
                const loginResponse = await api.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });

                const { token, firstName, lastName, role } = loginResponse.data;
                login(token, { firstName, lastName, role, email: formData.email });
                navigate('/dashboard');
            }

        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                // Si el backend devuelve un mensaje específico (como el 403 o error de validación)
                setError('Error al registrar: ' + (err.response.data.message || JSON.stringify(err.response.data)));
            } else {
                setError('Ocurrió un error inesperado al conectar con el servidor.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-display bg-mesh flex items-center justify-center p-4 py-8 relative overflow-hidden">

            {/* Contenedor Principal */}
            <div className="relative flex w-full flex-col items-center z-10 animate-enter">

                {/* LOGO SUPERIOR */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary p-3 rounded-xl shadow-[0_0_20px_rgba(13,242,89,0.3)] mb-4 transform hover:scale-105 transition-transform duration-300">
                        {/* Ícono de Bandera (Sports Score) */}
                        <span className="material-symbols-outlined text-background-dark text-4xl font-bold">
                            sports_score
                        </span>
                    </div>
                    <h2 className="text-white text-3xl font-bold tracking-tight">UN-SportHub</h2>
                    <p className="text-primary/80 text-sm font-medium tracking-wide uppercase mt-1">University Athletics</p>
                </div>

                <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-6 border border-white/10 backdrop-blur-sm">

                    <div className="mb-6 text-center">
                        <h1 className="text-gray-900 text-2xl font-bold leading-tight">Crear Cuenta</h1>
                        <p className="text-gray-500 text-sm mt-1">Únete a la comunidad deportiva universitaria</p>
                    </div>

                    {/* MENSAJE DE ERROR VISUAL */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* MENSAJE DE ÉXITO VISUAL */}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm text-center animate-bounce">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* GRID NOMBRE Y APELLIDO */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-700 text-xs font-semibold ml-1">Nombre</p>
                                <div className="flex items-stretch rounded-lg group bg-white border border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                    <input name="firstName" required type="text" className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 px-3 py-2.5 outline-none rounded-l-lg text-sm" placeholder="Juan" value={formData.firstName} onChange={handleChange} />
                                    <div className="pr-3 flex items-center justify-center text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">person</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-700 text-xs font-semibold ml-1">Apellido</p>
                                <div className="flex items-stretch rounded-lg group bg-white border border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                    <input name="lastName" required type="text" className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 px-3 py-2.5 outline-none rounded-l-lg text-sm" placeholder="Pérez" value={formData.lastName} onChange={handleChange} />
                                    <div className="pr-3 flex items-center justify-center text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">badge</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-700 text-xs font-semibold ml-1">Email</p>
                            <div className="flex w-full items-stretch rounded-lg group bg-white border border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <input name="email" required type="email" className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 px-3 py-2.5 outline-none rounded-l-lg text-sm" placeholder="ejemplo@universidad.edu" value={formData.email} onChange={handleChange} />
                                <div className="pr-3 flex items-center justify-center text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">mail</span>
                                </div>
                            </div>
                        </div>

                        {/* CONTRASEÑA */}
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-700 text-xs font-semibold ml-1">Contraseña</p>
                            <div className="flex w-full items-stretch rounded-lg group bg-white border border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <input name="password" required minLength={6} type="password" className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 px-3 py-2.5 outline-none rounded-l-lg text-sm" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                                <div className="pr-3 flex items-center justify-center text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">lock</span>
                                </div>
                            </div>
                        </div>

                        {/* SELECCIÓN DE ROL */}
                        <div className="flex flex-col gap-2 mt-4">
                            <p className="text-gray-700 text-xs font-semibold ml-1">Quiero registrarme como:</p>
                            <div className="grid grid-cols-2 gap-3">
                                {/* Opción: DEPORTISTA */}
                                <div className="relative">
                                    <input className="hidden peer" id="role-athlete" name="role" type="radio" value="ATHLETE" checked={formData.role === 'ATHLETE'} onChange={handleChange} />
                                    <label htmlFor="role-athlete" className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${formData.role === 'ATHLETE' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-500 hover:border-primary/50'}`}>
                                        <span className="material-symbols-outlined mb-1">directions_run</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">Deportista</span>
                                    </label>
                                </div>
                                {/* Opción: ENTRENADOR */}
                                <div className="relative">
                                    <input className="hidden peer" id="role-coach" name="role" type="radio" value="COACH" checked={formData.role === 'COACH'} onChange={handleChange} />
                                    <label htmlFor="role-coach" className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${formData.role === 'COACH' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-500 hover:border-primary/50'}`}>
                                        <span className="material-symbols-outlined mb-1">sports</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">Entrenador</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {formData.role === 'ATHLETE' && (
                            <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-300">
                                    <p className="text-xs flex gap-2">
                                        <span className="material-symbols-outlined text-[16px]">info</span>
                                        Tu cuenta requerirá verificación de tu entrenador.
                                    </p>
                                </div>

                                {/* SELECTOR DE ENTRENADOR */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-700 ml-1">Entrenador</label>
                                    <div className="relative group">
                                        <select
                                            name="coachId"
                                            onChange={handleChange}
                                            value={formData.coachId}
                                            className="w-full p-3 rounded-xl bg-white border border-gray-300 outline-none focus:border-primary appearance-none text-gray-900"
                                        >
                                            <option value="">Selecciona tu entrenador...</option>
                                            <option value="1">Entrenador Principal</option>
                                            {/* Mock data for now */}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-gray-400">expand_more</span>
                                    </div>
                                </div>

                                {/* SELECTOR DE DISCIPLINA */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-700 ml-1">Disciplina Principal</label>
                                    <div className="relative group">
                                        <select
                                            name="categoryId"
                                            onChange={handleChange}
                                            value={formData.categoryId}
                                            className="w-full p-3 rounded-xl bg-white border border-gray-300 outline-none focus:border-primary appearance-none text-gray-900"
                                        >
                                            <option value="">Selecciona disciplina...</option>
                                            <option value="1">Velocidad</option>
                                            <option value="5">Semifondo</option>
                                            <option value="8">Fondo</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-gray-400">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BOTÓN CON ESTADO DE CARGA */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary hover:bg-[#0be050] text-background-dark font-bold py-4 rounded-xl mt-6 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 tracking-wider text-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'CREANDO CUENTA...' : 'REGISTRARSE'}
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 text-sm">
                            ¿Ya tienes cuenta?
                            <Link to="/login" className="text-primary font-bold hover:underline ml-1">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Ícono de Fondo Gigante (Decorativo) - Asegurado que esté detrás */}
            <div className="fixed -bottom-10 -right-10 pointer-events-none opacity-[0.03] select-none z-0">
                <span className="material-symbols-outlined text-[300px] text-white">
                    fitness_center
                </span>
            </div>
        </div>
    );
};
export default RegisterPage;
