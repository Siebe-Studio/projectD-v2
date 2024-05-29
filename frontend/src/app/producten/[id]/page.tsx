export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // You can use the `id` variable here to fetch data for the product with this ID

  return (
    <div>
      <h1>ProductPage: {id}</h1>
    </div>
  );
}
