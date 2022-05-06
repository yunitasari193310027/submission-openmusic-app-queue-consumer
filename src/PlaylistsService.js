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
/*
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
      text: `SELECT s.id, s.title, s.performer FROM songs s
      LEFT JOIN playlist_songs ps ON ps.song_id = s.id
      WHERE ps.playlist_id = $1
      GROUP BY s.id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;   
  }
}
 
module.exports = PlaylistsService;
*/