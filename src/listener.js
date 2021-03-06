class Listener {
    constructor(playlistsService, mailSender) {
      this._playlistsService = playlistsService;
      this._mailSender = mailSender;
     
      this.listen = this.listen.bind(this);
    }
     
    async listen(message) {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
          
        const lagu = await this._playlistsService.getPlaylistSong(playlistId);
        const playlist = await this._playlistsService.getPlaylistById(playlistId);
        
         playlist.songs = lagu;
  
        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
        console.log(result);

        // console.log(playlist);
        
        // console.log(playlistId); 
      } catch (error) {
        console.error(error);
      }
    }
  }
     
  module.exports = Listener;