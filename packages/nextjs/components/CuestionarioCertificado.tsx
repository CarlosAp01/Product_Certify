import { useState, useEffect } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

type AnswerValue = "Si" | "No" | "Omitir";

interface QuestionState {
    value: AnswerValue;
    obs: string;
}

export const CuestionarioCertificado = () => {
    const { address } = useAccount();
    const [productoSeleccionado, setProductoSeleccionado] = useState<number | null>(null);

    const preguntas = [
        "¿El producto cumple con los estándares técnicos y de seguridad?",
        "¿Se ha verificado la integridad física y funcional del dispositivo?",
        "¿La documentación de fabricación es auténtica y está completa?",
        "¿El producto superó las pruebas de rendimiento y estrés?",
        "¿Cumple con las normativas de calidad internacionales requeridas?"
    ];

    const [respuestas, setRespuestas] = useState<QuestionState[]>(
        preguntas.map(() => ({ value: "No", obs: "" }))
    );
    const [score, setScore] = useState(0);

    const { data: productos } = useScaffoldReadContract({
        contractName: "ProductCertifier",
        functionName: "getUserProducts",
        args: [address],
    });

    const { writeContractAsync: mintCertification } = useScaffoldWriteContract("ProductCertifier");

    useEffect(() => {
        const validas = respuestas.filter(r => r.value !== "Omitir");
        if (validas.length === 0) {
            setScore(0);
            return;
        }
        const siCount = respuestas.filter(r => r.value === "Si").length;
        const nuevoScore = Math.round((siCount / validas.length) * 100);
        setScore(nuevoScore);
    }, [respuestas]);

    const handleUpdate = (index: number, value: AnswerValue, obs?: string) => {
        const nuevas = [...respuestas];
        if (value !== undefined) nuevas[index].value = value;
        if (obs !== undefined) nuevas[index].obs = obs;
        setRespuestas(nuevas);
    };

    const handleCertificar = async () => {
        if (productoSeleccionado === null) return;
        try {
            await mintCertification({
                functionName: "mintCertification",
                args: [BigInt(productoSeleccionado), BigInt(score)],
            });
            alert("¡Certificación generada correctamente!");
        } catch (e) {
            console.error("Error al certificar", e);
        }
    };

    return (
        <div className="card w-full max-w-2xl bg-slate-900 shadow-2xl p-8 border border-blue-500/20">
            <h2 className="card-title text-blue-500 mb-6 text-3xl font-black italic tracking-tighter">AUDITORÍA TÉCNICA DE CALIDAD</h2>

            <div className="mb-8">
                <label className="label text-[10px] text-slate-500 uppercase font-black tracking-widest">Activo a Evaluar</label>
                <select
                    className="select select-bordered w-full bg-slate-800 text-white border-slate-700 focus:border-blue-500 transition-all font-bold"
                    onChange={e => setProductoSeleccionado(Number(e.target.value))}
                >
                    <option disabled selected>Seleccione el producto del inventario...</option>
                    {productos?.map((p: any, i: number) => (
                        !p.hasNFT && <option key={i} value={i}>{p.name} - {p.serial}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-6 mb-10">
                {preguntas.map((pregunta, index) => (
                    <div key={index} className="p-5 bg-slate-800/40 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                        <p className="text-sm text-slate-200 mb-4 font-medium leading-relaxed">{pregunta}</p>

                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            {/* Selector de Respuesta */}
                            <div className="join border border-white/5 p-1 bg-slate-950/50 rounded-xl">
                                {(["Si", "No", "Omitir"] as AnswerValue[]).map((opt) => (
                                    <button
                                        key={opt}
                                        className={`join-item btn btn-xs px-4 font-bold border-none transition-all ${respuestas[index].value === opt
                                                ? opt === "Si" ? "bg-emerald-600 text-white" : opt === "No" ? "bg-rose-600 text-white" : "bg-slate-600 text-white"
                                                : "bg-transparent text-slate-500 hover:text-slate-300"
                                            }`}
                                        onClick={() => handleUpdate(index, opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            {/* Campo de Observaciones */}
                            <input
                                type="text"
                                placeholder="Notas de auditoría..."
                                className="input input-xs w-full bg-slate-950/50 border-white/5 text-[11px] text-slate-400 focus:border-blue-500/50 italic"
                                value={respuestas[index].obs}
                                onChange={(e) => handleUpdate(index, respuestas[index].value, e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Panel de Resultados */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 shadow-inner">
                    <span className="block text-[10px] text-slate-500 uppercase font-black mb-1">Puntaje Auditoría</span>
                    <span className={`text-4xl font-black ${score >= 60 ? "text-emerald-400" : "text-rose-500"}`}>
                        {score}<span className="text-sm ml-1 opacity-50">%</span>
                    </span>
                </div>
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 shadow-inner flex flex-col justify-center">
                    <span className="block text-[10px] text-slate-500 uppercase font-black mb-1">Veredicto Final</span>
                    <span className={`text-sm font-black uppercase tracking-widest ${score >= 60 ? "text-emerald-400" : "text-rose-500"}`}>
                        {score >= 60 ? "✓ Apto para Certificar" : "✗ Calidad Insuficiente"}
                    </span>
                </div>
            </div>

            <button
                className="btn btn-lg btn-success w-full font-black tracking-[0.2em] uppercase disabled:opacity-20 shadow-[0_10px_30px_rgba(16,185,129,0.15)] hover:shadow-success/20 transition-all border-none"
                disabled={score < 60 || productoSeleccionado === null}
                onClick={handleCertificar}
            >
                EMITIR CERTIFICADO NFT
            </button>

            {score < 60 && productoSeleccionado !== null && (
                <div className="mt-4 flex items-center justify-center gap-2 text-rose-500/80 animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    <p className="text-[10px] uppercase font-black tracking-widest">
                        Se requiere un cumplimiento mínimo del 60%
                    </p>
                </div>
            )}
        </div>
    );
};
