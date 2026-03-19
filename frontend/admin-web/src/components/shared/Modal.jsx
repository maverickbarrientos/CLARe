export function Modal({ type, title, subTitle }) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-30">
            <div className="bg-black border-global p-5 rounded-2xl font-heading">
                <div>
                    <p>{ title }</p>
                    <p>{ subTitle }</p>
                </div>

                { type === "loading" && <span className="inline-block w-6 h-6 border-4 border-white/30 border-t-orange-500 rounded-full animate-spin" /> }
                
                { type === "reject_reservation" &&
                    <div>
                        <button>Cancel</button>
                        <button>Confirm</button>
                    </div> 
                }
            </div>
        </div>
    )

}