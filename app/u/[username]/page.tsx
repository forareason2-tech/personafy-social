import { supabase } from "../../../lib/supabase";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username.toLowerCase())
    .single();

  if (!profile || error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#111827",
          color: "white",
          padding: 40,
          fontFamily: "Arial",
        }}
      >
        <h1>User not found</h1>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: 40,
        fontFamily: "Arial",
      }}
    >
      <h1>{profile.full_name}</h1>
      <p>@{profile.username}</p>

      {profile.avatar_url && (
        <img
          src={profile.avatar_url}
          alt={profile.username}
          style={{ width: 120, borderRadius: 100 }}
        />
      )}

      <p style={{ marginTop: 20 }}>{profile.bio}</p>

      <p style={{ marginTop: 20 }}>
        Persona Type: <b>{profile.persona_type}</b>
      </p>
    </main>
  );
}