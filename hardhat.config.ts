import "dotenv/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "hardhat-spdx-license-identifier";
import "hardhat-watcher";
import "solidity-coverage";
import "@tenderly/hardhat-tenderly";
import { TASK_TEST_GET_TEST_FILES, TASK_TEST_SETUP_TEST_ENVIRONMENT } from "hardhat/builtin-tasks/task-names";
import { HardhatUserConfig, task } from "hardhat/config";
import { removeConsoleLog } from "hardhat-preprocessor";

import fs from "fs";
import path from "path";

const accounts = {
    mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, { ethers }) => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(await account.address);
    }
});

task(TASK_TEST_GET_TEST_FILES).setAction(async (args, hre, runSuper) => {
    const files = await runSuper(args);
    return files.filter(file => !file.includes("test/typechain") && !file.includes("test/utils"));
});

task(TASK_TEST_SETUP_TEST_ENVIRONMENT).setAction(async (args, hre, runSuper) => {
    const copyFolderSync = (from, to) => {
        fs.mkdirSync(to);
        fs.readdirSync(from).forEach(element => {
            if (fs.lstatSync(path.join(from, element)).isFile()) {
                fs.copyFileSync(path.join(from, element), path.join(to, element));
            } else {
                copyFolderSync(path.join(from, element), path.join(to, element));
            }
        });
    };

    await runSuper(args);
    const src = "typechain";
    const dest = "test/typechain";
    if (fs.existsSync(dest)) fs.rmdirSync(dest, { recursive: true });
    copyFolderSync(src, dest);
});

const config: HardhatUserConfig = {
    abiExporter: {
        path: "./abis",
        clear: true,
        flat: true,
        spacing: 2,
    },
    defaultNetwork: "hardhat",
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    gasReporter: {
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        currency: "USD",
        enabled: process.env.REPORT_GAS === "true",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        admin: {
            default: 1,
        },
        alice: {
            default: 2,
        },
        bob: {
            default: 3,
        },
        carol: {
            default: 4,
        },
    },
    networks: {
        localhost: {
            live: false,
            saveDeployments: true,
            tags: ["local"],
        },
        hardhat: {
            // Seems to be a bug with this, even when false it complains about being unauthenticated.
            // Reported to HardHat team and fix is incoming
            forking: {
                enabled: process.env.FORKING === "true",
                url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
                blockNumber: Number(process.env.FORKING_BLOCKNUMBER),
            },
            live: false,
            saveDeployments: true,
            tags: ["test", "local"],
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts,
            chainId: 3,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts,
            chainId: 4,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts,
            chainId: 5,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
        kovan: {
            url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts,
            chainId: 42,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
        moonbase: {
            url: "https://rpc.testnet.moonbeam.network",
            accounts,
            chainId: 1287,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
        arbitrum: {
            url: "https://kovan3.arbitrum.io/rpc",
            accounts,
            chainId: 79377087078960,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
        fantom: {
            url: "https://rpcapi.fantom.network",
            accounts,
            chainId: 250,
            live: true,
            saveDeployments: true,
        },
        fantom_testnet: {
            url: "https://rpc.testnet.fantom.network",
            accounts,
            chainId: 4002,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
        matic: {
            url: "https://rpc-mainnet.maticvigil.com",
            accounts,
            chainId: 137,
            live: true,
            saveDeployments: true,
        },
        xdai: {
            url: "https://rpc.xdaichain.com",
            accounts,
            chainId: 100,
            live: true,
            saveDeployments: true,
        },
        bsc: {
            url: "https://bsc-dataseed.binance.org",
            accounts,
            chainId: 56,
            live: true,
            saveDeployments: true,
        },
        bsc_testnet: {
            url: "https://data-seed-prebsc-2-s3.binance.org:8545",
            accounts,
            chainId: 97,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
        },
    },
    preprocess: {
        eachLine: removeConsoleLog(bre => bre.network.name !== "hardhat" && bre.network.name !== "localhost"),
    },
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    tenderly: {
        project: process.env.TENDERLY_PROJECT,
        username: process.env.TENDERLY_USERNAME,
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
    watcher: {
        compile: {
            tasks: ["compile"],
            files: ["./contracts"],
            verbose: true,
        },
    },
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
export default config;
