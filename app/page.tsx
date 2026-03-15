"use client";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { getSupabase } from "../lib/supabase";

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signUp() {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Check your email.");
    }
  }

  async function login() {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Personafy Social</h1>

      <p>Create your AI persona and connect.</p>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={signUp}>Sign Up</button>

      <button onClick={login} style={{ marginLeft: "10px" }}>
        Login
      </button>

      <p>{message}</p>
    </main>
  );
}