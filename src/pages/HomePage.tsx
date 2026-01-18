export default function HomePage() {
  const array = [];
  for (let i = 0; i < 100; i++) {
    array.push("text " + i);
  }

  return (
    <main>
      <h1>Welcome to the Game Kit Store </h1>
      <p>Carosel goes here</p>
    </main>
  );
}
