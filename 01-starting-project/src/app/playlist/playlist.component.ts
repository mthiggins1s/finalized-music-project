import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
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

  @Output() delete = new EventEmitter<string>(); // ✅ added

  songs = songs_list;
  audio = new Audio();

  playSong(audioUrl: string) {
    this.audio.src = audioUrl;
    this.audio.load();
    this.audio.play();
  }

  stopSong() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  deleteSong() {
    this.stopSong(); // stop before removing
    this.delete.emit(this.song.id);
  }
}
