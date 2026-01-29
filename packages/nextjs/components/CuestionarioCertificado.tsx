import { useState, useEffect } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const CuestionarioCertificado = () => {
    const { address } = useAccount();
    const [productoSeleccionado, setProductoSeleccionado] = useState<number | null>(null);
    const [respuestas, setRespuestas] = useState<boolean[]>([false, false, false, false, false]);
    const [score, setScore] = useState(0);

    const { data: productos } = useScaffoldReadContract({
        contractName: "ProductCertifier",
        functionName: "getUserProducts",
        args: [address],
    });

    const { writeContractAsync: mintCertification } = useScaffoldWriteContract("ProductCertifier");

    const preguntas = [
        "¿El producto cumple con los estándares técnicos y de seguridad?",
        "¿Se ha verificado la integridad física y funcional del dispositivo?",
        "¿La documentación de fabricación es auténtica y está completa?",
        "¿El producto superó las pruebas de rendimiento y estrés?",
        "¿Cumple con las normativas de calidad internacionales requeridas?"
    ];

    useEffect(() => {
        const nuevoScore = respuestas.filter(r => r).length * 20;
        setScore(nuevoScore);
    }, [respuestas]);

    const handleToggle = (index: number) => {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[index] = !nuevasRespuestas[index];
        setRespuestas(nuevasRespuestas);
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
        <div className="card w-full max-w-md bg-slate-900 shadow-2xl p-6 border border-blue-500/20">
            <h2 className="card-title text-blue-500 mb-4 text-2xl font-black italic">EVALUACIÓN TÉCNICA</h2>

            <div className="mb-6">
                <label className="label text-xs text-slate-500 uppercase font-bold">Producto a Certificar</label>
                <select
                    className="select select-bordered w-full bg-slate-800 text-white border-slate-700"
                    onChange={e => setProductoSeleccionado(Number(e.target.value))}
                >
                    <option disabled selected>Selecciona un producto...</option>
                    {productos?.map((p: any, i: number) => (
                        !p.hasNFT && <option key={i} value={i}>{p.name} - {p.serial}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4 mb-8">
                {preguntas.map((pregunta, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                        <p className="text-xs text-slate-300 pr-4">{pregunta}</p>
                        <input
                            type="checkbox"
                            className="toggle toggle-info toggle-sm"
                            checked={respuestas[index]}
                            onChange={() => handleToggle(index)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-blue-500/30 mb-6">
                <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-black">Puntaje Total</span>
                    <span className={`text-2xl font-black ${score >= 60 ? "text-success" : "text-error"}`}>{score}%</span>
                </div>
                <div className="text-right">
                    <span className="block text-[10px] text-slate-500 uppercase font-black">Estado</span>
                    <span className={`text-xs font-bold uppercase ${score >= 60 ? "text-success" : "text-error"}`}>
                        {score >= 60 ? "Aprobado" : "Insuficiente"}
                    </span>
                </div>
            </div>

            <button
                className="btn btn-success w-full font-black tracking-widest disabled:opacity-30 shadow-lg shadow-success/10"
                disabled={score < 60 || productoSeleccionado === null}
                onClick={handleCertificar}
            >
                GENERAR CERTIFICADO NFT
            </button>

            {score < 60 && productoSeleccionado !== null && (
                <p className="text-error text-[10px] mt-4 text-center uppercase font-black animate-pulse">
                    Mínimo 60% requerido para certificar
                </p>
            )}
        </div>
    );
};
