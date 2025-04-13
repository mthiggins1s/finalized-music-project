import { Component, computed, Input, EventEmitter, Output } from '@angular/core';
import { Song } from '../song.model';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export class SongsComponent {

    // song object within an Input Decorator
  @Input({required: true}) song!: Song;

  @Output() select = new EventEmitter;

  imagePath = computed(() => {
    return this.song.cover;
  });

  onSelectSong() {
    this.select.emit(this.song.id);
  }
}
