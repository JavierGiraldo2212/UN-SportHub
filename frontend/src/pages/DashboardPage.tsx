import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/api';

// Importamos los sub-dashboards
import AthleteDashboard from './dashboards/AthleteDashboard';
import CoachDashboard from './dashboards/CoachDashboard';

const DashboardPage = () => {
    const { user, logout, updateUser } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Manejo defensivo: Si no ha cargado el user, no mostramos nada
    if (!user) return <div className="p-10 text-center">Cargando perfil...</div>;

    const [editForm, setEditForm] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || ''
    });

    const handleEditClick = () => {
        setEditForm({
            firstName: user.firstName,
            lastName: user.lastName
        });
        setIsEditModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateUserProfile(editForm);
            updateUser(editForm.firstName, editForm.lastName);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
            alert("Error al actualizar");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#102216] font-display transition-colors duration-300">

            {/* NAVBAR COMÚN */}
            <nav className="bg-white dark:bg-[#1a2e21] border-b border-gray-200 dark:border-white/5 px-4 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#1a2e21]/80">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-background-dark text-xl font-bold">sports_score</span>
                    </div>
                    <h1 className="hidden sm:block text-xl font-bold text-gray-800 dark:text-white tracking-tight">UN-SportHub</h1>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-primary font-bold uppercase mt-1 tracking-wider">
                            {user.role === 'COACH' ? 'Entrenador' : 'Atleta'}
                        </p>
                    </div>

                    {/* Avatar / Botón Perfil */}
                    <button onClick={handleEditClick} className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-700 dark:text-white font-bold hover:ring-2 hover:ring-primary transition-all">
                        {user.firstName.charAt(0)}
                    </button>

                    <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1"></div>

                    <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors" title="Cerrar Sesión">
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                </div>
            </nav>

            {/* CONTENIDO PRINCIPAL - AQUÍ OCURRE LA MAGIA DEL ROL */}
            <main className="max-w-7xl mx-auto p-4 lg:p-8">

                {/* Renderizado Condicional según el ROL del usuario */}
                {user.role === 'COACH' ? (
                    <CoachDashboard user={user} />
                ) : (
                    <AthleteDashboard user={user} />
                )}

            </main>

            {/* MODAL DE EDICIÓN (Reutilizable) */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#1a2e21] w-full max-w-md rounded-2xl shadow-2xl p-6">
                        <h3 className="text-lg font-bold dark:text-white mb-4">Editar Perfil</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold dark:text-slate-400">Nombre</label>
                                <input type="text" value={editForm.firstName} onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#102216] dark:text-white border border-gray-200 dark:border-slate-700 outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="text-xs font-bold dark:text-slate-400">Apellido</label>
                                <input type="text" value={editForm.lastName} onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#102216] dark:text-white border border-gray-200 dark:border-slate-700 outline-none focus:border-primary" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Cancelar</button>
                                <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-primary text-background-dark font-bold rounded-xl hover:bg-[#0be050]">{isLoading ? '...' : 'Guardar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
