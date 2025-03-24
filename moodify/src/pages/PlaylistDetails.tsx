import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("spotifyToken")}` },
      })
      .then((res) => setSongs(res.data.items));
  }, [id]);

  const removeSong = (trackId: string) => {
    axios.delete(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("spotifyToken")}` },
      data: { tracks: [{ uri: `spotify:track:${trackId}` }] },
    });

    setSongs(songs.filter((song: any) => song.track.id !== trackId));
  };

  return (
    <div>
      <h1>Playlist Songs</h1>
      <ul>
        {songs.map((song: any) => (
          <li key={song.track.id}>
            {song.track.name} - {song.track.artists[0].name}
            <button onClick={() => removeSong(song.track.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetails;
