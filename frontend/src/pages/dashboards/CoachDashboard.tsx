import type { User } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import CoachNavBar from '../../components/CoachNavBar';

interface Props {
    user: User;
}

const CoachDashboard = ({ user }: Props) => {
    // MOCK DATA: Feedbacks recientes de los atletas
    const athleteFeedbacks = [
        { id: 1, athlete: 'Juan Pérez', session: 'Fondo 10k', date: 'Hace 2h', feeling: 'bad', notes: 'Sentí molestia en el isquio derecho al km 7.' },
        { id: 2, athlete: 'Maria López', session: 'Series 10x400', date: 'Hace 5h', feeling: 'good', notes: 'Ritmos muy sólidos, me sentí rápida.' },
        { id: 3, athlete: 'Carlos Ruiz', session: 'Técnica', date: 'Ayer', feeling: 'neutral', notes: 'Cumplido.' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">

            {/* 0. HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hola, {user.firstName} 👋</h2>
                    <p className="text-slate-500 dark:text-slate-400">Aquí tienes el resumen de tu equipo hoy.</p>
                </div>
                {/* 
                <Link to="/coach/athletes" className="bg-background-dark text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-black transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined">group</span>
                    Gestionar Atletas
                </Link>
                */}
            </div>

            {/* 1. RESUMEN DE EQUIPO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1a2e21] p-6 rounded-2xl shadow-sm border-l-4 border-primary">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Atletas Activos</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">24</p>
                </div>
                <div className="bg-white dark:bg-[#1a2e21] p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Feedback Pendiente</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">3</p>
                </div>
                <div className="bg-white dark:bg-[#1a2e21] p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Planificación</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">Semana actual completa ✅</p>
                </div>
            </div>

            {/* 2. FEEDBACK RECIENTE (LO MÁS IMPORTANTE PARA EL COACH) */}
            <div>
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">notifications_active</span>
                        Últimos Comentarios de Atletas
                    </h3>
                    <button className="text-sm text-primary font-bold hover:underline">Ver todos</button>
                </div>

                <div className="grid gap-4">
                    {athleteFeedbacks.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-[#1a2e21] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-slate-300">
                                        {item.athlete.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{item.athlete}</h4>
                                        <p className="text-xs text-primary font-medium uppercase">{item.session}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">{item.date}</span>
                            </div>

                            <div className="mt-4 pl-14 relative">
                                {/* Icono de sensación */}
                                <div className="absolute left-2 top-0">
                                    {item.feeling === 'good' && <span className="material-symbols-outlined text-green-500">sentiment_satisfied</span>}
                                    {item.feeling === 'bad' && <span className="material-symbols-outlined text-red-500">sentiment_dissatisfied</span>}
                                    {item.feeling === 'neutral' && <span className="material-symbols-outlined text-gray-400">sentiment_neutral</span>}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-black/20 p-3 rounded-lg rounded-tl-none italic">
                                    "{item.notes}"
                                </p>
                            </div>

                            <div className="mt-3 pl-14 flex gap-3">
                                <button className="text-xs font-bold text-blue-600 hover:underline">Responder</button>
                                <button className="text-xs font-bold text-gray-500 hover:text-gray-700">Marcar como leído</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <CoachNavBar />
        </div>
    );
};

export default CoachDashboard;
