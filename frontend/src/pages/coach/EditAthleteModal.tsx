import { useState } from 'react';
import { updateAthleteStatus } from '../../services/api';

interface Props {
    athlete: any;
    onClose: () => void;
}

const EditAthleteModal = ({ athlete, onClose }: Props) => {
    // Si viene categoryName es la subcategoría, si tiene parentCategoryName esa es la principal.
    // O si no tiene parent, categoryName es la principal.
    const initialCategory = athlete.parentCategoryName || (['FONDO', 'VELOCIDAD', 'SEMIFONDO'].includes(athlete.categoryName) ? athlete.categoryName : 'FONDO');
    // Si tiene parent, la subcategoría es categoryName. Si no, está vacía.
    const initialSubCategory = athlete.parentCategoryName ? athlete.categoryName : '';

    const [category, setCategory] = useState(initialCategory);
    const [subCategory, setSubCategory] = useState(initialSubCategory);

    // Status
    const [status, setStatus] = useState(athlete.status || 'ACTIVE');

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Si el usuario es nuevo (pendiente), por defecto queremos activarlo
    const isPending = athlete.status === 'PENDING';

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateAthleteStatus(athlete.id, {
                status: status, // Usamos el estado seleccionado
                categoryName: category,
                subCategoryName: subCategory
            });
            window.location.reload();
            onClose();
        } catch (error) {
            console.error("Error updating athlete", error);
            alert("Error al actualizar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1a2e21] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="flex h-5 w-full items-center justify-center shrink-0">
                    <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-white/10 mt-2"></div>
                </div>

                <div className="flex items-center px-6 pb-2 justify-between shrink-0">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold flex-1 truncate pr-4">
                        {isPending ? 'Verificar Deportista' : 'Editar Deportista'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined dark:text-white">close</span>
                    </button>
                </div>

                <div className="px-6 py-2 overflow-y-auto">

                    <div className="py-3">
                        <p className="text-slate-900 dark:text-white/80 text-sm font-medium mb-1.5">Correo Electrónico</p>
                        <div className="flex w-full items-center rounded-lg bg-green-50 dark:bg-primary/5 h-12 px-4 text-green-700 dark:text-primary border border-transparent">
                            <span className="text-sm">{athlete.email}</span>
                            <span className="material-symbols-outlined ml-auto text-sm opacity-50">lock</span>
                        </div>
                    </div>

                    {/* SELECTOR DE ESTADO */}
                    <div className="py-2">
                        <p className="text-slate-900 dark:text-white/80 text-sm font-medium mb-1.5">Estado de Cuenta</p>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={`w-full h-14 rounded-lg border px-4 font-bold outline-none appearance-none ${status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' :
                                        status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                            'bg-red-50 text-red-700 border-red-200'
                                    }`}
                            >
                                <option value="ACTIVE">ACTIVO (Permitir Acceso)</option>
                                <option value="PENDING">PENDIENTE (Revisión)</option>
                                <option value="INACTIVE">INACTIVO (Bloquear Acceso)</option>
                            </select>
                            <span className="absolute right-4 top-4 material-symbols-outlined pointer-events-none opacity-50">expand_more</span>
                        </div>
                    </div>

                    <h3 className="text-slate-900 dark:text-white text-lg font-bold pt-4 pb-2">Asignación de Categoría</h3>

                    {/* Categoría Principal (Custom Dropdown) */}
                    <div className="py-2 relative">
                        <p className="text-slate-900 dark:text-white/80 text-sm font-medium mb-1.5">Categoría Principal</p>
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className={`flex w-full items-center justify-between rounded-lg border-2 h-14 px-4 transition-all ${isCategoryOpen
                                ? 'border-primary bg-white dark:bg-slate-800'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                                }`}
                        >
                            <span className="text-base font-bold dark:text-white text-gray-900">{category}</span>
                            <span className={`material-symbols-outlined transition-transform ${isCategoryOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`}>expand_more</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isCategoryOpen && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden animate-in slide-in-from-top-2">
                                {['FONDO', 'VELOCIDAD', 'SEMIFONDO'].map(cat => (
                                    <div
                                        key={cat}
                                        onClick={() => { setCategory(cat); setIsCategoryOpen(false); }}
                                        className={`px-4 py-3 cursor-pointer flex justify-between items-center ${category === cat ? 'bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <span className={`font-medium ${category === cat ? 'text-primary' : 'dark:text-white text-gray-900'}`}>{cat}</span>
                                        {category === cat && <span className="material-symbols-outlined text-primary text-sm">check_circle</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sub Categoría (Dependiente) */}
                    <div className="py-2 mb-20">
                        <p className="text-slate-900 dark:text-white/80 text-sm font-medium mb-1.5">Especialidad</p>
                        <select
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            className="w-full h-14 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-white/5 px-4 text-slate-900 dark:text-white outline-none focus:border-primary appearance-none"
                        >
                            <option value="">Selecciona especialidad...</option>
                            {category === 'FONDO' && (
                                <>
                                    <option value="5K">5K</option>
                                    <option value="10K">10K</option>
                                </>
                            )}
                            {category === 'VELOCIDAD' && (
                                <>
                                    <option value="100m">100m</option>
                                    <option value="200m">200m</option>
                                </>
                            )}
                            {category === 'SEMIFONDO' && (
                                <>
                                    <option value="800m">800m</option>
                                    <option value="1500m">1500m</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white dark:bg-[#1a2e21] border-t border-slate-100 dark:border-slate-800 shrink-0 flex flex-col gap-3">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full h-14 bg-primary hover:bg-[#0be050] text-[#102216] rounded-xl font-bold text-base tracking-wide shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'GUARDANDO...' : (isPending ? 'APROBAR Y GUARDAR' : 'GUARDAR CAMBIOS')}
                    </button>

                    {/* Si es pendiente, mostramos rechazar, si es activo mostramos cancelar */}
                    {isPending ? (
                        <button className="w-full h-12 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                            RECHAZAR SOLICITUD
                        </button>
                    ) : (
                        <button onClick={onClose} className="w-full h-12 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                            CANCELAR
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditAthleteModal;
