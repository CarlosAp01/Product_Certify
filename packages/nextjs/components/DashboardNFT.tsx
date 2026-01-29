import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const DashboardNFT = () => {
    const { address } = useAccount();

    const { data: productos } = useScaffoldReadContract({
        contractName: "ProductCertifier",
        functionName: "getUserProducts",
        args: [address],
    });

    const nfts = productos?.filter((p: any) => p.hasNFT);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {nfts?.map((p: any, i: number) => (
                <div key={i} className="card bg-slate-900 text-white shadow-2xl border-2 border-blue-500/50 hover:scale-105 transition-transform duration-300">
                    <div className="card-body p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="card-title text-blue-400 font-black">CERTIFICADO</h3>
                            <div className="badge badge-info gap-2">NFT</div>
                        </div>
                        <div className="space-y-1 font-mono text-xs">
                            <p><span className="text-slate-500">PROD:</span> {p.name}</p>
                            <p><span className="text-slate-500">SERI:</span> {p.serial}</p>
                            <p><span className="text-slate-500">MODL:</span> {p.model}</p>
                            <p><span className="text-slate-500">MANU:</span> {p.manufacturer}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] uppercase font-bold text-green-500">Verificado en Blockchain</span>
                        </div>
                    </div>
                </div>
            ))}
            {(!nfts || nfts.length === 0) && (
                <div className="col-span-full text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-700">
                    <p className="text-slate-500 italic">No se han emitido certificados para esta billetera todavía.</p>
                </div>
            )}
        </div>
    );
};
