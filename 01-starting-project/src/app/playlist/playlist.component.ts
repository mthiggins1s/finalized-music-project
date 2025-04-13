import { Component, Input, signal } from '@angular/core';
import { songs_list } from '../songs-list';
import { Song } from '../song.model';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  @Input() title: string | undefined;
  @Input() song!: Song;
  // '?' this might not be set, we know.
  // we use '|' because it creates a 'union-type'; tells TS that the type of value that can be stored in something is either is if type string or type undefined. We use this to make it clear that its fine if title is not defined initially.
  songs = songs_list;
  audio = new Audio();
  selectedSong = signal<Song | null>(null);

  // plays the song
  playSong(audioUrl: string) {
    this.audio.src = audioUrl;
    this.audio.load();
    this.audio.play();
  }

  // stops the song
  stopSong() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
