import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${localStorage.getItem("spotifyToken")}` },
      })
      .then((res) => setPlaylists(res.data.items));
  }, []);

  return (
    <div>
      <h1>Your Playlists</h1>
      <ul>
        {playlists.map((playlist: any) => (
          <li key={playlist.id}>
            <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
