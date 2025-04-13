import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SongsComponent } from "./songs/songs.component";
import { songs_list } from './songs-list';
import { PlaylistComponent } from "./playlist/playlist.component";
import { Song } from './song.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SongsComponent, PlaylistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  // dynamic display of songs instead of static
  songs = signal<Song[]>(songs_list);

  // ✅ Use a signal for selected song
  selectedSong = signal<Song | null>(null);

  onSelectSong(song: Song) {
    this.selectedSong.set(song);
  }
}
