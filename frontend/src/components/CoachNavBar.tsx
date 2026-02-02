import { useNavigate, useLocation } from 'react-router-dom';

const CoachNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper para saber si la ruta está activa
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a2e21] border-t border-slate-200 dark:border-slate-800 h-[70px] flex items-center justify-around z-50 pb-2 safe-area-bottom">

            {/* INICIO */}
            <button
                onClick={() => navigate('/dashboard')}
                className={`flex flex-col items-center justify-center p-2 w-16 transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
            >
                <span
                    className="material-symbols-outlined text-[26px]"
                    style={isActive('/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                    home
                </span>
                <span className="text-[10px] font-bold mt-1">Inicio</span>
            </button>

            {/* ATLETAS */}
            <button
                onClick={() => navigate('/coach/athletes')}
                className={`flex flex-col items-center justify-center p-2 w-16 transition-colors ${isActive('/coach/athletes') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
            >
                <span
                    className="material-symbols-outlined text-[26px]"
                    style={isActive('/coach/athletes') ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                    group
                </span>
                <span className="text-[10px] font-bold mt-1">Atletas</span>
            </button>

            {/* ENTRENOS (Placeholder) */}
            <button
                // onClick={() => navigate('/coach/workouts')} 
                className={`flex flex-col items-center justify-center p-2 w-16 transition-colors text-slate-400 dark:text-slate-500 hover:text-primary/50`}
            >
                <span className="material-symbols-outlined text-[26px]">fitness_center</span>
                <span className="text-[10px] font-bold mt-1">Entrenos</span>
            </button>

            {/* EVENTOS (Placeholder) */}
            <button
                // onClick={() => navigate('/coach/events')} 
                className={`flex flex-col items-center justify-center p-2 w-16 transition-colors text-slate-400 dark:text-slate-500 hover:text-primary/50`}
            >
                <span className="material-symbols-outlined text-[26px]">calendar_today</span>
                <span className="text-[10px] font-bold mt-1">Eventos</span>
            </button>

            {/* FORO */}
            <button
                // onClick={() => navigate('/coach/forum')} 
                className={`flex flex-col items-center justify-center p-2 w-16 transition-colors text-slate-400 dark:text-slate-500 hover:text-primary/50`}
            >
                <span className="material-symbols-outlined text-[26px]">forum</span>
                <span className="text-[10px] font-bold mt-1">Foro</span>
            </button>

            {/* PERFIL */}
            <button
                // onClick={() => navigate('/profile')} 
                className={`flex flex-col items-center justify-center p-2 w-16 transition-colors text-slate-400 dark:text-slate-500 hover:text-primary/50`}
            >
                <span className="material-symbols-outlined text-[26px]">account_circle</span>
                <span className="text-[10px] font-bold mt-1">Perfil</span>
            </button>

        </nav>
    );
};

export default CoachNavBar;
