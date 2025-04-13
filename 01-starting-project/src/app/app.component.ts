import { Component, computed } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SongsComponent } from './songs/songs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SongService } from './song.service';
import { Song } from './song.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SongsComponent, PlaylistComponent, AddSongComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private songService: SongService) {}

  songs = this.songService.songs;
  selectedSong = this.songService.selectedSong;

  onSelectSong(song: Song) {
    this.songService.selectSong(song);
  }

  onDeleteSong(id: string) {
    this.songService.deleteSong(id);
  }

  onAddSong(song: Song) {
    this.songService.addSong(song);
  }
  
}
