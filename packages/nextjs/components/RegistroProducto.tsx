import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const RegistroProducto = () => {
    const [nombre, setNombre] = useState("");
    const [fabricante, setFabricante] = useState("");
    const [año, setAño] = useState(2024);
    const [modelo, setModelo] = useState("");
    const [serial, setSerial] = useState("");

    const { writeContractAsync: registerProduct } = useScaffoldWriteContract("ProductCertifier");

    const handleRegistro = async () => {
        try {
            await registerProduct({
                functionName: "registerProduct",
                args: [nombre, fabricante, BigInt(año), modelo, serial],
            });
            alert("Producto registrado correctamente en la Blockchain");
        } catch (e) {
            console.error("Error al registrar producto", e);
        }
    };

    return (
        <div className="card w-full max-w-md bg-slate-900 shadow-2xl p-6 border border-blue-500/20">
            <h2 className="card-title text-blue-500 mb-4 text-2xl font-black">REGISTRAR PRODUCTO</h2>
            <div className="flex flex-col gap-3">
                <input type="text" placeholder="Nombre del Producto" className="input input-bordered w-full bg-slate-800 text-white border-slate-700 focus:border-blue-500" onChange={e => setNombre(e.target.value)} />
                <input type="text" placeholder="Fabricante" className="input input-bordered w-full bg-slate-800 text-white border-slate-700 focus:border-blue-500" onChange={e => setFabricante(e.target.value)} />
                <input type="number" placeholder="Año" className="input input-bordered w-full bg-slate-800 text-white border-slate-700 focus:border-blue-500" value={año} onChange={e => setAño(Number(e.target.value))} />
                <input type="text" placeholder="Modelo" className="input input-bordered w-full bg-slate-800 text-white border-slate-700 focus:border-blue-500" onChange={e => setModelo(e.target.value)} />
                <input type="text" placeholder="Número de Serie" className="input input-bordered w-full bg-slate-800 text-white border-slate-700 focus:border-blue-500" onChange={e => setSerial(e.target.value)} />
                <button className="btn btn-primary mt-4 font-black tracking-widest" onClick={handleRegistro}>
                    GUARDAR EN BLOCKCHAIN
                </button>
            </div>
        </div>
    );
};
