const { SupabaseClient } = require("@supabase/supabase-js");

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  throw new Error("Service role key is not specified.");
}

const supabase = new SupabaseClient(
  "http://127.0.0.1:54321",
  supabaseServiceRoleKey,
);

const createUsers = async () => {
  const { error } = await supabase.auth.signUp({
    email: "user1@example.com",
    password: "test123",
  });

  if (error) throw new Error(`Failed to create user ${error.message}`);
};

void createUsers();
