export function Modal({ type, title, subTitle, onClose, onConfirm, rejectReason, onRejectReasonChange }) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-30">
            <div className="bg-black border-global p-5 rounded-2xl font-heading flex flex-col items-center gap-4 relative w-80">

                {(type === "success" || type === "error") &&
                    <button onClick={onClose} className="absolute top-3 right-3 text-white/40 hover:text-white/80">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </button>
                }

                {type === "error" &&
                    <svg width="60" height="60" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="38" fill="#3d0a0a"/>
                        <circle cx="40" cy="40" r="30" fill="#5c1010"/>
                        <circle cx="40" cy="40" r="23" fill="#7a1515"/>
                        <circle cx="40" cy="40" r="17" fill="#c0272d"/>
                        <path d="M40 33 L40 42" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                        <circle cx="40" cy="47" r="1.8" fill="#fff"/>
                    </svg>
                }

                {type === "success" &&
                    <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="38" fill="#0a1f0a"/>
                        <circle cx="40" cy="40" r="30" fill="#0f2e0f"/>
                        <circle cx="40" cy="40" r="23" fill="#154015"/>
                        <circle cx="40" cy="40" r="17" fill="#1a5c1a"/>
                        <path d="M27 40 L37 51 L54 30" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                }

                <div className="text-center">
                    <p className="text-white">{title}</p>
                    <p className="text-white/50 text-sm">{subTitle}</p>
                </div>

                {type === "loading" &&
                    <span className="inline-block w-6 h-6 border-4 border-white/30 border-t-orange-500 rounded-full animate-spin" />
                }

                {type === "reject" &&
                    <div className="flex flex-col gap-3 w-full">
                        <textarea
                            className="w-full bg-white/10 text-white text-sm rounded-lg p-3 border border-white/20 resize-none placeholder:text-white/30 focus:outline-none focus:border-white/40"
                            rows={3}
                            placeholder="Enter reason for rejection..."
                            value={rejectReason}
                            onChange={(e) => onRejectReasonChange(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 px-4 rounded-lg font-heading font-bold bg-white/10 hover:bg-white/20 text-white" onClick={onClose}>Cancel</button>
                            <button className="flex-1 py-2 px-4 rounded-lg font-heading font-bold bg-red-700 hover:bg-red-600 text-white" onClick={onConfirm}>Confirm</button>
                        </div>
                    </div>
                }

                { type === "approve" &&
                    <div className="flex gap-2 w-full">
                        <button className="flex-1 bg-muted rounded-lg py-2" onClick={onClose}>Cancel</button>
                        <button className="flex-1 bg-success rounded-lg py-2" onClick={onConfirm}>Approve</button>
                    </div>
                }

                { type === "confirm" &&
                    <div className="flex gap-2 w-full">
                        <button className="flex-1 bg-muted rounded-lg py-2" onClick={onClose}>Cancel</button>
                        <button className="flex-1 bg-danger rounded-lg py-2" onClick={onConfirm}>Delete</button>
                    </div>
                }

            </div>
        </div>
    )

}