import { effect, Injectable, signal } from "@angular/core";
import { Song } from "./song.model";
import { songs_list } from "./songs-list";

@Injectable({ providedIn: 'root' })
export class SongService {
  private readonly STORAGE_KEY = 'playlist-songs';

  private _songs = signal<Song[]>(this.loadSongs());
  private _selectedSong = signal<Song | null>(null);

  songs = this._songs.asReadonly();
  selectedSong = this._selectedSong.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._songs()));
    });
  }

  private loadSongs(): Song[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : songs_list;
  }

  selectSong(song: Song | null) {
    this._selectedSong.set(song);
  }

  deleteSong(id: string) {
    this._songs.set(this._songs().filter(song => song.id !== id));
    if (this._selectedSong()?.id === id) {
      this._selectedSong.set(null);
    }
  }

  addSong(song: Song) {
    this._songs.set([...this._songs(), song]);
  }

  updateSong(updated: Song) {
    this._songs.set(this._songs().map(song => song.id === updated.id ? updated : song));
  }

  addSongFromTitle(title: string) {
    const newSong: Song = {
      id: 'id' + Date.now(),
      title: title.trim(),
      artist: 'Unknown Artist',
      album: 'Untitled',
      genre: 'Unknown',
      year: '2025',
      cover: 'assets/covers/default.jpg',
      audioUrl: 'assets/audio/default.mp3'
    };

    this._songs.set([...this._songs(), newSong]);
    alert(`✅ "${newSong.title}" has been added to your playlist!`);
  }
}
