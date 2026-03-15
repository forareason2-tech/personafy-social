"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [personaType, setPersonaType] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, username, bio, avatar_url, persona_type")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data) {
        setFullName(data.full_name ?? "");
        setUsername(data.username ?? "");
        setBio(data.bio ?? "");
        setAvatarUrl(data.avatar_url ?? "");
        setPersonaType(data.persona_type ?? "");
      }

      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  async function saveProfile() {
    setSaving(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        full_name: fullName,
        bio,
        avatar_url: avatarUrl,
        persona_type: personaType,
      })
      .eq("id", user.id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile saved successfully");
    }

    setSaving(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#111827",
          color: "white",
          padding: 40,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Loading dashboard...</h1>
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
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <p>This is your personal dashboard.</p>

      <div style={{ maxWidth: 500, marginTop: 30 }}>
        <label>Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 6, marginBottom: 16 }}
        />

        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 6, marginBottom: 16 }}
        />

        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 6, marginBottom: 16, minHeight: 100 }}
        />

        <label>Avatar URL</label>
        <input
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 6, marginBottom: 16 }}
        />

        <label>Persona Type</label>
        <select
          value={personaType}
          onChange={(e) => setPersonaType(e.target.value)}
          style={{ width: "100%", padding: 12, marginTop: 6, marginBottom: 20 }}
        >
          <option value="">Select one</option>
          <option value="AI DJ">AI DJ</option>
          <option value="AI Artist">AI Artist</option>
          <option value="AI Influencer">AI Influencer</option>
          <option value="AI Meme Creator">AI Meme Creator</option>
          <option value="AI Coach">AI Coach</option>
        </select>

        <button
          onClick={saveProfile}
          disabled={saving}
          style={{ padding: "12px 20px", marginRight: 12, cursor: "pointer" }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        <button onClick={logout} style={{ padding: "12px 20px", cursor: "pointer" }}>
          Logout
        </button>

        {message && <p style={{ marginTop: 20 }}>{message}</p>}
      </div>
    </main>
  );
}