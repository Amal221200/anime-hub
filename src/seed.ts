import db from "@/utils/db"
import animes from "../backup/animes.json"

let done = false;

export async function addAnime() {
    const queries = []

    if(done){
        return console.log("Done");
    }

    for (let anime of animes) {
        queries.push(db.anime.create({
            data: {
                title: anime.title,
                description: anime.description,
                studio: anime.studio,
                artist: anime.artist,
                status: anime.status === "ongoing" ? "ONGOING" : "COMPLETED",
                episodes: anime.episodes,
                episodeDuration: anime.episodeDuration,
                imageLink: anime.imageLink,
                release: anime.release,
                genre: anime.genre,
                createdAt: anime.createdAt?.$date,
                updatedAt: anime.updatedAt?.$date,
                watchLink: anime.watchLink,
            }
        }))
    }

    await db.$transaction(queries);

    done = true;
    console.log("Success");
    
} 