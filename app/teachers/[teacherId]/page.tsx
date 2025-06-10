import { createClient } from "@/lib/supabase/server";
import Link from "next/link"

export default async function ClassView({params}:{params: Promise<{teacherId: string}>}) {
    const id = (await params).teacherId
    const supabase = await createClient();
    const {data: teacher} = await supabase.from("teachers").select().eq('id',id).single();
    return (
        <div className="teacher">
            <h1>Teacher: {teacher.first_name} {teacher.last_name}</h1>
            <h2>{teacher.description}</h2>
        </div>
    )
}