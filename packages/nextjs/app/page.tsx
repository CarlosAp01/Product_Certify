"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Address } from "@scaffold-ui/components";
import { RegistroProducto } from "~~/components/RegistroProducto";
import { CuestionarioCertificado } from "~~/components/CuestionarioCertificado";
import { DashboardNFT } from "~~/components/DashboardNFT";

const Home: NextPage = () => {
  const { address } = useAccount();
  const [tabActiva, setTabActiva] = useState(0);

  const { data: productos } = useScaffoldReadContract({
    contractName: "ProductCertifier",
    functionName: "getUserProducts",
    args: [address],
  });

  const tieneProductos = (productos && productos.length > 0) || false;
  const tieneNFTs = productos?.some((p: any) => p.hasNFT) || false;

  return (
    <div className="flex items-center flex-col flex-grow pt-10 px-4 bg-[#0f172a] min-h-screen">
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black mb-2 tracking-tighter text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          PRODUCT CERTIFY <span className="text-slate-100">PRO</span>
        </h1>
        <div className="flex justify-center bg-slate-900/80 py-2 px-4 rounded-full shadow-xl border border-white/10 backdrop-blur-md">
          <Address address={address} />
        </div>
      </div>

      {/* Navegación: Botones Estilizados */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl mb-12 font-mono">
        <button
          className={`btn btn-sm h-auto py-4 px-8 transition-all duration-300 border-2 
            ${tabActiva === 0
              ? "border-blue-500 bg-blue-600/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              : "border-slate-800 bg-transparent text-slate-500 hover:border-slate-700 hover:text-slate-300"}`}
          onClick={() => setTabActiva(0)}
        >
          <div className="flex flex-col items-center">
            <span className="text-[9px] tracking-[0.4em] uppercase opacity-50 mb-1">Step 01</span>
            <span className="text-sm font-black uppercase tracking-widest">Registro</span>
          </div>
        </button>

        <button
          disabled={!tieneProductos}
          className={`btn btn-sm h-auto py-4 px-8 transition-all duration-300 border-2 
            ${tabActiva === 1
              ? "border-emerald-500 bg-emerald-600/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              : "border-slate-800 bg-transparent text-slate-500 hover:border-slate-700 hover:text-slate-300 disabled:opacity-20"}`}
          onClick={() => setTabActiva(1)}
        >
          <div className="flex flex-col items-center">
            <span className="text-[9px] tracking-[0.4em] uppercase opacity-50 mb-1">Step 02 {!tieneProductos && "🔒"}</span>
            <span className="text-sm font-black uppercase tracking-widest italic">Certificar</span>
          </div>
        </button>

        <button
          disabled={!tieneNFTs}
          className={`btn btn-sm h-auto py-4 px-8 transition-all duration-300 border-2 
            ${tabActiva === 2
              ? "border-purple-500 bg-purple-600/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              : "border-slate-800 bg-transparent text-slate-500 hover:border-slate-700 hover:text-slate-300 disabled:opacity-20"}`}
          onClick={() => setTabActiva(2)}
        >
          <div className="flex flex-col items-center">
            <span className="text-[9px] tracking-[0.4em] uppercase opacity-50 mb-1">Step 03 {!tieneNFTs && "🔒"}</span>
            <span className="text-sm font-black uppercase tracking-widest">Mis NFTs</span>
          </div>
        </button>
      </div>

      {/* Área de Trabajo */}
      <div className="w-full max-w-5xl flex justify-center pb-20">
        <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          {tabActiva === 0 && <RegistroProducto />}
          {tabActiva === 1 && <CuestionarioCertificado />}
          {tabActiva === 2 && <DashboardNFT />}
        </div>
      </div>
    </div>
  );
};

export default Home;
