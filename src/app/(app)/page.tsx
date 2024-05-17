import CardSection from "@/components/home/CardSection";
import api from "@/services/api";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiPlus } from "react-icons/bi";

export default async function HomePage() {
  const token = cookies().get("token");
  if (!token) return redirect("/auth/login");

  const [forms, responses] = await Promise.all([
    api.forms.getMyForms(token.value),
    api.responses.getMyResponses(token.value)
  ]);

  return (
    <section className="h-full container px-8 pt-6 mb-20 flex flex-col gap-8">
      <CardSection
        name="Shortcuts"
        data={[{ ty: "create" }]}
        renderItem={item => (
          <Link className="h-48 px-4 py-4 flex flex-col items-center justify-center gap-2 border-2 border-white/10 shadow-md hover:bg-white/20" href={`/create`} key={item.ty}>
            <BiPlus className="text-4xl" />
            <span className="text-sm font-semibold">Create Form</span>
          </Link>
        )}
      />

      <CardSection
        name="Your Forms"
        data={forms}
        renderItem={item => (
          <Link className="h-48 px-4 py-4 flex flex-col items-center justify-center gap-2 bg-white/10 shadow-md hover:bg-white/20" href={`/forms/${item._id}`} key={item._id}>
            <h3 className="text-2xl">{item.name}</h3>
            <span className="text-white/30">{item.describtion}</span>
          </Link>
        )}
      />
      
      <CardSection
        name="Your Responses"
        data={responses}
        renderItem={item => (
          <Link className="h-48 px-4 py-4 flex flex-col items-center justify-center gap-2 bg-white/10 shadow-md hover:bg-white/20" href={`/responses/${item._id}`} key={item._id}>
            <h3 className="text-2xl">{item.formName}</h3>
            <span className="text-white/30">{item.describtion}</span>
          </Link>
        )}
      />
    </section>
  );
}