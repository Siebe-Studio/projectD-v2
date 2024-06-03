export default function LocationPage({params}: {params: { id: string}}) {
    return (
        <div>
            <h1>LocationPage: {params.id}</h1>
        </div>
    );
}