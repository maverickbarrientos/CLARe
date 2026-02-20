
export function Card({ cardTitle, children, className = "" }) {

    return (
        <div className={`bg-dark-gray border-glow rounded-xl p-5 ${className}`}>
            <p className="font-heading text-lg font-bold text-secondary text-left">
                {cardTitle}
            </p>
            <div className="h-full">
                {children}
            </div>
        </div>
    )

}