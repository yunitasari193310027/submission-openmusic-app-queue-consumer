const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name FROM playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1;`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPlaylistSong(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
      WHERE playlist_songs.playlist_id = $1
      GROUP BY songs.id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;   
  }
}
 
module.exports = PlaylistsService;
