"use server";

import { redirect } from "next/navigation";

export async function submit(formData: FormData) {
  const rawFormData = {
    url: formData.get("url"),
  };

  redirect(`/analyze?url=${rawFormData.url}`);
}
