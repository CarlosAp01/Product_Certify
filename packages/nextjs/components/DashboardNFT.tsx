"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const DashboardNFT = () => {
  const { address } = useAccount();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: productos } = useScaffoldReadContract({
    contractName: "ProductCertifier",
    functionName: "getUserProducts",
    args: [address],
  });

  // Filtramos solo los productos que ya tienen un NFT acuñado
  const nfts = productos?.filter((p: any) => p.hasNFT) || [];

  // Lógica de Niveles basada en Psicología del Color (Dorado, Violeta, Cian)
  const obtenerNivelCertificado = (serial: string) => {
    // Simulamos un puntaje basado en el serial para el MVP visual
    const score = ((serial.length * 7) % 41) + 60;

    if (score >= 90) return { nombre: "LEGENDARY", color: "#FBBF24", glow: "rgba(251, 191, 36, 0.4)" }; // Dorado: Excelencia
    if (score >= 75) return { nombre: "ELITE", color: "#8B5CF6", glow: "rgba(139, 92, 246, 0.4)" }; // Violeta: Alta Calidad
    return { nombre: "STANDARD", color: "#06B6D4", glow: "rgba(6, 182, 212, 0.4)" }; // Cian: Verificado
  };

  const descargarImagen = async (index: number, nombre: string) => {
    if (cardRefs.current[index]) {
      try {
        const dataUrl = await toPng(cardRefs.current[index]!, { cacheBust: true, pixelRatio: 2 });
        const link = document.createElement("a");
        link.download = `Certificado-${nombre}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Error al exportar:", err);
      }
    }
  };

  const compartirCertificado = async (nombre: string, serial: string) => {
    const shareData = {
      title: `Certificado PC-PRO: ${nombre}`,
      text: `He verificado la autenticidad de mi ${nombre} en Blockchain. ID: ${serial}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert("Enlace de verificación copiado al portapapeles");
      }
    } catch (err) {
      console.error("Error al compartir: ", err);
    }
  };

  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-[#161D2F] rounded-[2.5rem] border border-white/5 opacity-40">
        <p className="text-sm font-mono tracking-[0.3em] uppercase italic">
          Sin certificados registrados en el protocolo
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* LEYENDA TÉCNICA */}
      <div className="flex flex-wrap justify-center gap-6 mb-12 p-4 bg-slate-900/40 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_8px_#FBBF24]"></div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-white/70">
            Master Tier
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]"></div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-white/70">
            Premium Tier
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]"></div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-white/70">
            Verified Tier
          </span>
        </div>
      </div>

      <div
        className={`grid gap-12 w-full ${nfts.length === 1 ? "grid-cols-1 justify-items-center" : "grid-cols-1 lg:grid-cols-2"}`}
      >
        {nfts.map((nft: any, i: number) => {
          const nivel = obtenerNivelCertificado(nft.serial);
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-6 w-full ${nfts.length === 1 ? "max-w-2xl" : "max-w-full"}`}
            >
              {/* TARJETA NFT */}
              <div
                ref={el => {
                  cardRefs.current[i] = el;
                }}
                className="relative bg-slate-950 rounded-[2.5rem] p-8 w-full overflow-hidden border border-white/10"
                style={{ boxShadow: `0 0 40px ${nivel.glow}` }}
              >
                <div
                  className="absolute -top-20 -left-20 w-40 h-40 opacity-10 blur-[50px]"
                  style={{ backgroundColor: nivel.color }}
                ></div>

                <div className="flex justify-between items-start mb-10 relative z-10 font-mono">
                  <div className="w-14 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-white/5 flex items-center justify-center">
                    <div className="w-8 h-4 border border-blue-500/30 rounded-sm"></div>
                  </div>
                  <div className="text-right">
                    <span
                      className="px-3 py-1 rounded-full text-[9px] font-black tracking-tighter"
                      style={{ backgroundColor: nivel.color, color: "#000" }}
                    >
                      {nivel.nombre}
                    </span>
                    <p className="text-[8px] text-white/20 mt-2 uppercase tracking-[0.2em] font-bold">
                      SECURE-ID: {nft.serial.slice(-8)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-end relative z-10">
                  <div className="flex-grow">
                    <h3 className="text-3xl font-black text-white mb-1 uppercase tracking-tighter italic">
                      {nft.name}
                    </h3>
                    <p className="text-[10px] font-mono mb-6 text-blue-500/70 uppercase tracking-widest font-bold italic">
                      Authenticated Asset
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                          Manufacturer
                        </span>
                        <span className="text-[11px] text-slate-200 font-bold font-mono">{nft.manufacturer}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Model ID</span>
                        <span className="text-[11px] text-slate-200 font-bold font-mono">{nft.model}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Year</span>
                        <span className="text-[11px] text-slate-200 font-bold font-mono">{nft.year.toString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <QRCodeSVG value={`https://sepolia.etherscan.io/address/${address}`} size={90} />
                  </div>
                </div>

                <div className="mt-10 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                  <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
                    PC-PRO INTERNATIONAL PROTOCOL
                  </div>
                  <div className="text-[8px] font-mono text-blue-500/40 font-bold">
                    OWNER: {address?.slice(0, 10)}...
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn btn-outline btn-sm text-white border-slate-800 text-slate-500 hover:text-blue-400 hover:border-blue-400 rounded-full px-6 transition-all"
                  onClick={() => descargarImagen(i, nft.name)}
                >
                  📥 Exportar Certificado
                </button>
                <button
                  className="btn btn-outline btn-sm text-white border-slate-800 text-slate-500 hover:text-blue-400 hover:border-blue-400 rounded-full px-6 transition-all"
                  onClick={() => compartirCertificado(nft.name, nft.serial)}
                >
                  🔗 Compartir
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
