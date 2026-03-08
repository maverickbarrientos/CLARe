export function DetailsPanel ({ title, content }) {

    return (
        <div className="border-l-glow px-4">
            <p className="font-heading">{ title }</p>
            <p className="font-sans font-bold">{ content }</p>
        </div>
    )
}