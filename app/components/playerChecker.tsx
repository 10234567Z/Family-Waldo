import { createClient } from "@/utils/supabase/client";

export default async function PlayerCheck(){
    const supabase = createClient()
    if(localStorage.getItem('player') !== null){
        const player_name = localStorage.getItem('player');
        const image_no = localStorage.getItem('image_no');
        await supabase.from(`current_session_${image_no}`).delete().match({player_name: player_name})
        localStorage.removeItem('player');
        localStorage.removeItem('image_no');
    }
}