import { useState, useEffect } from 'react';
import EditAthleteModal from './EditAthleteModal';
import { getMyAthletes } from '../../services/api'; // Importamos la API
import CoachNavBar from '../../components/CoachNavBar';
import { useNavigate } from 'react-router-dom';

const AthletesPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('TODOS'); // TODOS, ACTIVO, PENDIENTE
    const [selectedAthlete, setSelectedAthlete] = useState<any | null>(null);
    const [athletes, setAthletes] = useState<any[]>([]); // Estado para los atletas reales
    const [loading, setLoading] = useState(true);

    // Cargamos los atletas al iniciar
    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const data = await getMyAthletes();
                // Mapeamos status PENDING a mi filtro si es necesario, o usamos el string directo
                setAthletes(data);
            } catch (error) {
                console.error("Error cargando atletas", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAthletes();
    }, []);

    // Filtramos según el chip seleccionado
    // Si filter es 'TODOS', mostramos todos. Si no, coincidencia exacta de status.
    const [searchTerm, setSearchTerm] = useState('');

    // Filtramos según el chip y el texto de búsqueda
    const filteredAthletes = athletes.filter(a => {
        const matchesStatus = filter === 'TODOS' ? true : a.status === filter;
        const matchesSearch = (a.firstName + ' ' + a.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (loading) return <div className="p-10 text-center">Cargando atletas...</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-[#102216] font-display pb-24">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a2e21]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex items-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                >
                    <span className="material-symbols-outlined dark:text-white text-gray-800">arrow_back_ios</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold dark:text-white text-gray-800 mr-8">Gestión de Deportistas</h1>
            </header>

            {/* Search */}
            <div className="px-4 py-3">
                <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden h-12">
                    <div className="pl-4 text-primary"><span className="material-symbols-outlined">search</span></div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        className="w-full h-full px-4 bg-transparent outline-none dark:text-white text-gray-800 placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter Chips (Tabs) */}
            <div className="flex gap-3 px-4 pb-2 overflow-x-auto no-scrollbar">
                {['TODOS', 'ACTIVE', 'PENDIENTE', 'INACTIVE'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`flex h-10 px-5 rounded-full items-center justify-center text-sm font-semibold whitespace-nowrap transition-all ${filter === status
                            ? 'bg-primary text-background-dark shadow-md'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                    >
                        {status === 'TODOS' ? 'Todos' : status === 'ACTIVE' ? 'Activos' : status === 'PENDIENTE' ? 'Pendientes' : 'Inactivos'}
                    </button>
                ))}
            </div>

            {/* Lista */}
            <div className="flex flex-col gap-4 px-4 mt-4">
                {filteredAthletes.map(athlete => (
                    <div key={athlete.id} className="flex justify-between gap-4 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in">
                        <div className="flex flex-col justify-between gap-2 flex-1">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${athlete.status === 'ACTIVE' ? 'bg-primary/20 text-primary' : 'bg-yellow-500/20 text-yellow-600'
                                        }`}>
                                        {athlete.status === 'ACTIVE' ? 'Activo' : 'Pendiente'}
                                    </span>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide truncate">{athlete.categoryName || 'Sin asignar'}</p>
                                </div>
                                <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">{athlete.firstName} {athlete.lastName}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{athlete.email}</p>
                            </div>

                            <button
                                onClick={() => setSelectedAthlete(athlete)}
                                className="self-start flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-colors text-sm font-bold"
                            >
                                <span className="material-symbols-outlined text-lg">edit</span>
                                <span>Gestionar</span>
                            </button>
                        </div>
                        <div className="w-24 h-24 bg-primary/10 rounded-xl shrink-0 flex items-center justify-center text-primary text-3xl font-bold">
                            {athlete.firstName.charAt(0)}
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selectedAthlete && (
                <EditAthleteModal
                    athlete={selectedAthlete}
                    onClose={() => setSelectedAthlete(null)}
                />
            )}

            <CoachNavBar />
        </div>
    );
};

export default AthletesPage;
