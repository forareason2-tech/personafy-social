import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProfilePage({ params }: any) {
  const username = params.username

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single()

  if (!data) {
    return (
      <main style={{ padding: 40 }}>
        <h1>User not found</h1>
      </main>
    )
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
      <h1>{data.full_name}</h1>
      <p>@{data.username}</p>

      {data.avatar_url && (
        <img
          src={data.avatar_url}
          alt={data.username}
          style={{ width: 120, borderRadius: 100 }}
        />
      )}

      <p style={{ marginTop: 20 }}>{data.bio}</p>

      <p style={{ marginTop: 20 }}>
        Persona Type: <b>{data.persona_type}</b>
      </p>
    </main>
  )
}