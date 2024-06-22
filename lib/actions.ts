"use server";

import { redirect } from "next/navigation";

export async function submit(formData: FormData) {
  const rawFormData = {
    url: formData.get("url"),
  };

  console.log(rawFormData);
  redirect(`/analyze?url=${rawFormData.url}`);
}
