import { useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const CuestionarioCertificado = () => {
    const { address } = useAccount();
    const [productoSeleccionado, setProductoSeleccionado] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const { data: productos } = useScaffoldReadContract({
        contractName: "ProductCertifier",
        functionName: "getUserProducts",
        args: [address],
    });

    const { writeContractAsync: mintCertification } = useScaffoldWriteContract("ProductCertifier");

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
            <select className="select select-bordered w-full bg-slate-800 text-white border-slate-700 mb-4" onChange={e => setProductoSeleccionado(Number(e.target.value))}>
                <option disabled selected>Selecciona un producto registrado</option>
                {productos?.map((p: any, i: number) => (
                    !p.hasNFT && <option key={i} value={i}>{p.name} - {p.serial}</option>
                ))}
            </select>

            <div className="flex flex-col gap-4 mb-6">
                <p className="text-slate-300 text-sm">Nivel de cumplimiento de estándares de calidad:</p>
                <input type="range" min="0" max="100" value={score} className="range range-info range-xs" onChange={e => setScore(Number(e.target.value))} />
                <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <span className="text-xs text-slate-500">Puntaje</span>
                    <span className={`text-xl font-bold ${score >= 60 ? "text-success" : "text-error"}`}>{score} / 100</span>
                </div>
            </div>

            <button
                className="btn btn-success w-full font-black tracking-widest disabled:opacity-30"
                disabled={score < 60 || productoSeleccionado === null}
                onClick={handleCertificar}
            >
                GENERAR CERTIFICADO NFT
            </button>
            {score < 60 && productoSeleccionado !== null && (
                <p className="text-error text-[10px] mt-2 text-center uppercase font-bold">Puntaje insuficiente para certificar (Mín: 60)</p>
            )}
        </div>
    );
};
