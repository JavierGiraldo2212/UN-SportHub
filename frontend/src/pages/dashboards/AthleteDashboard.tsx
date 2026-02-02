import type { User } from '../../context/AuthContext';

interface Props {
    user: User;
}

const AthleteDashboard = ({ user }: Props) => {
    // MOCK DATA: Simulación de datos (luego conectaremos con API)
    const todayWorkout = {
        type: 'CARRERA',
        title: 'Fondo Largo + Cambios',
        description: 'Calentamiento 15min suaves + 10km a ritmo Z2 sostenido + 5x100m progresivos.',
        duration: '1h 10m',
        kms: 12.5
    };

    const myCoach = {
        name: "Entrenador Principal",
        email: "coach@unsport.com"
    };

    const recentHistory = [
        { date: '01/02', title: 'Series 400m', kms: 8, feedback: 'Buenas sensaciones' },
        { date: '30/01', title: 'Rodaje Suave', kms: 6, feedback: 'Cansancio acumulado' },
        { date: '28/01', title: 'Fuerza Gimnasio', kms: 0, feedback: 'Peso muerto 80kg' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">

            {/* 1. SECCIÓN SUPERIOR: ENTRENAMIENTO DE HOY & COACH */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* TARJETA: ENTRENAMIENTO DE HOY (Destacada) */}
                <div className="lg:col-span-2 bg-gradient-to-br from-background-dark to-[#1a2e21] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[100px]">timer</span>
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
                                Entrenamiento de Hoy
                            </span>
                            <span className="text-primary font-display font-bold text-lg">{todayWorkout.duration}</span>
                        </div>

                        <h2 className="text-3xl font-bold mb-2">{todayWorkout.title}</h2>
                        <p className="text-slate-300 mb-6 text-sm leading-relaxed max-w-lg">
                            {todayWorkout.description}
                        </p>

                        <div className="flex gap-4">
                            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                <p className="text-xs text-slate-400 uppercase">Distancia</p>
                                <p className="font-bold text-xl">{todayWorkout.kms} km</p>
                            </div>
                            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                <p className="text-xs text-slate-400 uppercase">Tipo</p>
                                <p className="font-bold text-xl">{todayWorkout.type}</p>
                            </div>
                        </div>

                        <button className="mt-6 w-full sm:w-auto bg-primary text-background-dark font-bold py-3 px-6 rounded-xl hover:bg-[#0be050] transition-colors shadow-lg shadow-primary/20">
                            Registrar Feedback
                        </button>
                    </div>
                </div>

                {/* TARJETA: MI ENTRENADOR */}
                <div className="bg-white dark:bg-[#1a2e21] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 mb-4">
                        <span className="material-symbols-outlined text-4xl">sports</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Mi Entrenador</h3>
                    <p className="text-xl font-bold text-primary mt-1">{myCoach.name}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{myCoach.email}</p>

                    <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        Enviar Mensaje
                    </button>
                </div>
            </div>

            {/* 2. HISTORIAL RECIENTE */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    Actividad Reciente
                </h3>

                <div className="bg-white dark:bg-[#1a2e21] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600 dark:text-slate-300">
                            <thead className="bg-gray-50 dark:bg-white/5 uppercase text-xs font-bold text-gray-500 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4">Entrenamiento</th>
                                    <th className="px-6 py-4">Distancia</th>
                                    <th className="px-6 py-4">Mis Notas</th>
                                    <th className="px-6 py-4">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                {recentHistory.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium">{item.date}</td>
                                        <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{item.title}</td>
                                        <td className="px-6 py-4">{item.kms > 0 ? `${item.kms} km` : '-'}</td>
                                        <td className="px-6 py-4 italic text-gray-500">{item.feedback}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completado</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteDashboard;
