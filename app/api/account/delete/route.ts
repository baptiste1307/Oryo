import { NextResponse } from "next/server";
import { deleteAccountData } from "@/lib/accountDeletion";
import { createSupabaseAdmin, getUserFromAuthorization } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const user = await getUserFromAuthorization(request);
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const supabase = createSupabaseAdmin();
    await deleteAccountData(supabase, user.id);
    const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
    if (authError) throw authError;

    return NextResponse.json({ deleted: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete account.";
    console.error("Account deletion error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
