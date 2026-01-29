import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
    11155111: {
        ProductCertifier: {
            address: "0xec22efAF3A052827d302d24108ff3Bfc28745150",
            abi: [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "serial",
                            "type": "string"
                        }
                    ],
                    "name": "NFTMinted",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "serial",
                            "type": "string"
                        }
                    ],
                    "name": "ProductRegistered",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "getUserProducts",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "manufacturer",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "year",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "model",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "serial",
                                    "type": "string"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "hasNFT",
                                    "type": "bool"
                                }
                            ],
                            "internalType": "struct ProductCertifier.Product[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "productIndex",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "score",
                            "type": "uint256"
                        }
                    ],
                    "name": "mintCertification",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_manufacturer",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_year",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_model",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_serial",
                            "type": "string"
                        }
                    ],
                    "name": "registerProduct",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
        },
    },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
