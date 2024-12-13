"use server";
import { z } from "zod";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Podaj poprawny adres e-mail."),
  password: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków.")
    .max(100, "Hasło może mieć maksymalnie 100 znaków."),
});

export async function login(formData: FormData) {
  const supabase = await createClient();
  // Walidacja danych
  const validationResult = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return validationResult.error.errors.map((e) => e.message).join(" ");
  }

  const { error } = await supabase.auth.signInWithPassword(
    validationResult.data,
  );

  if (error) {
    switch (error.code) {
      case "invalid_credentials":
        return "Podano niepoprawne dane logowania.";
      default:
        return error.message;
    }
  }

  revalidatePath("/", "layout");

  return "Zalogowano pomyślnie";
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const validationResult = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return validationResult.error.errors.map((e) => e.message).join(" ");
  }

  const { error } = await supabase.auth.signUp(validationResult.data);

  if (error) {
    switch (error.code) {
      case "user_already_exists":
        return "Użytkownik o podanym adresie e-mail już istnieje.";
      default:
        return error.message;
    }
  }
  return "Sukces! Za chwilę zostaniesz przekierowany do płatności.";
}
