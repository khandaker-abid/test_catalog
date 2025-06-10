//original classes code, kept here just because

import { createClient } from "@/lib/supabase/server";
// import '../styles/globals.css';

import Link from "next/link";

export default async function ClassCatalog() {
    const supabase = await createClient();
    const {data: classes} = await supabase.from("classes").select();
    return (
        <div className="classes">
            <h1>Classes</h1>
            {(classes && classes.length>0) ? (<ul>
                {classes.map((x) => {
                    const {data: {publicUrl}} = supabase.storage.from("class-imgs").getPublicUrl(x.image_path)
                    return(
                        <li key={x.id} className="class">
                            <Link href={`classes/${x.id}`}>
                            <h2>{x.title}</h2>
                            <p>{x.description}</p>
                            {publicUrl && (
                                <img
                                    src={publicUrl}
                                    alt={x.image_path}
                                    height={500}
                                    width={500}
                                />
                            )}
                            </Link>
                        </li>
                    )
                })}
            </ul>) 
            : (<h2>No classes detected</h2>)}
        </div>
    )
}
