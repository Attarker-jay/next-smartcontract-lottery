import { ConnectButton } from "web3uikit"
export default function Header() {
    return (
        <div className="border-b-2 flex flex-row">
            <h1 className="py-4 px-4 font-blog text-3xl"> Decentralized Lottery </h1>
            <div className="ml-auto py-2 px-2">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
//17:42:15
