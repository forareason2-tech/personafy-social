export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Personafy Social
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          Build your AI persona. Customize your world. Connect with creators.
        </p>
        <p style={{ fontSize: "1rem", opacity: 0.8 }}>
          This is the beginning of your MySpace-style social platform for the AI era.
        </p>
      </div>
    </main>
  );
}
