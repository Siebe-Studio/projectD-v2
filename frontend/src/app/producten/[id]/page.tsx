export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>ProductPage: {params.id}</h1>
    </div>
  );
}
