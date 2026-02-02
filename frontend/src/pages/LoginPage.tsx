import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redireccionar si ya hay sesión activa
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        setLoginError('');

        if (!validateEmail(email)) {
            setEmailError('Por favor, ingresa un correo electrónico válido');
            return;
        }

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, firstName, lastName, role } = response.data;
            login(token, { firstName, lastName, role, email }); // Se asume que el backend devuelve estos datos
            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                // Verificar si es el error string directo o un objeto JSON
                setLoginError(typeof err.response.data === 'string' ? err.response.data : (err.response.data.message || 'Error desconocido'));
            } else {
                setLoginError('Credenciales incorrectas. Intenta de nuevo.');
            }
        }
    };

    return (
        <div className="min-h-screen font-display bg-mesh flex items-center justify-center p-4 relative overflow-hidden">
            {/* Contenedor Principal */}
            <div className="w-full flex flex-col items-center z-10 animate-enter">

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

                {/* TARJETA DE LOGIN */}
                <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-8 border border-white/5 backdrop-blur-sm">
                    <div className="mb-8 text-center">
                        <h1 className="text-gray-900 text-2xl font-bold leading-tight">Bienvenido</h1>
                        <p className="text-gray-500 text-sm mt-2">Inicia sesión para continuar entrenando</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Error Generico de Login */}
                        {loginError && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">{loginError}</p>}

                        {/* Input Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold ml-1">Correo Electrónico</label>
                            <div className={`flex w-full items-stretch rounded-lg group bg-white border ${emailError ? 'border-red-500' : 'border-gray-300'} focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all`}>
                                <input
                                    type="email"
                                    className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 p-3 outline-none rounded-l-lg"
                                    placeholder="ejemplo@universidad.edu"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (emailError) setEmailError('');
                                    }}
                                />
                                <div className={`pr-4 flex items-center justify-center ${emailError ? 'text-red-500' : 'text-gray-400'} group-focus-within:text-primary transition-colors`}>
                                    <span className="material-symbols-outlined text-[20px]">{emailError ? 'error' : 'mail'}</span>
                                </div>
                            </div>
                            {emailError && <p className="text-red-500 text-xs ml-1 font-medium">{emailError}</p>}
                        </div>

                        {/* Input Contraseña */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-gray-700 text-sm font-semibold">Contraseña</label>
                                <a href="#" className="text-primary text-xs font-medium hover:text-green-600 hover:underline transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div className="flex w-full items-stretch rounded-lg group bg-white border border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <input
                                    type="password"
                                    className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 p-3 outline-none rounded-l-lg"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="pr-4 flex items-center justify-center text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                            </div>
                        </div>

                        {/* Botón Ingresar */}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-[#0be050] text-background-dark font-bold py-3.5 rounded-xl mt-4 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 tracking-wide uppercase text-sm"
                        >
                            Ingresar
                        </button>

                    </form>

                    {/* Separador */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Acceso Institucional</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-gray-600 text-sm">
                            ¿No tienes cuenta?
                            <Link to="/register" className="text-primary font-bold hover:underline ml-1">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Decoración Inferior */}
                <div className="mt-8 opacity-20 w-32">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                </div>

            </div>

            {/* Ícono de Fondo Gigante (Decorativo) */}
            <div className="fixed -bottom-10 -right-10 pointer-events-none opacity-[0.03] select-none">
                <span className="material-symbols-outlined text-[300px] text-white">
                    fitness_center
                </span>
            </div>
        </div>
    );
};

export default LoginPage;
