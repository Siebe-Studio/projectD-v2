export default function UserPage({ params }: { params: { id: string } }) {
    return (
      <div>
        <h1>UserPage: {params.id}</h1>
      </div>
    );
  }
  