interface Environment {
  supabase: {
    url: string;
    anonKey: string;
  };
}

export const getEnvironment = (): Environment => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as unknown;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as unknown;

  if (typeof supabaseUrl !== "string")
    throw new Error("Supabase URL not found");
  if (typeof supabaseAnonKey !== "string")
    throw new Error("Supabase anon key not found");

  return {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
  };
};
