import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const searchSongs = async () => {
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_genres=${mood}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("spotifyToken")}` },
      }
    );
    setSongs(response.data.tracks);
  };

  const createPlaylist = async () => {
    // Navigate to playlist page after creating a playlist
    navigate("/playlists");
  };

  return (
    <div>
      <h1>Enter Your Mood</h1>
      <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} />
      <button onClick={searchSongs}>Search Songs</button>
      <button onClick={createPlaylist}>Create Playlist</button>
      <ul>
        {songs.map((song: any) => (
          <li key={song.id}>
            {song.name} - {song.artists[0].name} <button>Add to Playlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
