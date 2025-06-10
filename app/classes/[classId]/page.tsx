import { createClient } from "@/lib/supabase/server";
import Link from "next/link"

export default async function ClassView({params}:{params: Promise<{classId: string}>}) {
    const id = (await params).classId
    const supabase = await createClient();

    //gets class
    const {data: classInView} = await supabase.from("classes").select().eq('id',id).single();

    //populates teacher_id
    const {data: teacher} = await supabase.from("teachers").select().eq('id',classInView?.teacher_id).single();

    //get image
    const {data: {publicUrl}} = supabase.storage.from("class-imgs").getPublicUrl(classInView.image_path)
    console.log(publicUrl)
    return (
        <div className="classDetailsCard">
            <h1>Class: {classInView.title}</h1>
            <h4>{classInView.description}</h4>
            <Link href={`/teachers/${teacher.id}`}>
                <h3>Teacher: {teacher?.first_name} {teacher?.last_name}</h3>
            </Link>
            {publicUrl && (<img
                                src={publicUrl}
                                alt={classInView.image_path}
                                height={500}
                                width={500}
                            />
            )}
        </div>
    )
}