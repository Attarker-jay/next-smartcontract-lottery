import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnabledLoading } =
        useMoralis()

    //useEffect to not allow page to reset but maintain same state unless otherwise.
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    //useEffect from stopping window from connecting by itself
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`account changedto ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found!")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    connected to {account.slice(0, 6)}....{account.length - 5}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnabledLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

