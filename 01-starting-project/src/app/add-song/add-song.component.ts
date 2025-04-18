import { Component } from '@angular/core';
import { SongService } from '../song.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.css'
})
export class AddSongComponent {
  title: string = '';
  selectedFile: File | null = null;

  constructor(private songService: SongService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.title.trim()) {
      alert('Title is required!');
      return;
    }

    if (!this.selectedFile) {
      alert('Please upload an MP3 file!');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const audioUrl = reader.result as string;

      const newSong = {
        id: 'id' + Date.now(),
        title: this.title.trim(),
        artist: 'Custom Upload',
        album: 'User Upload',
        genre: 'Unknown',
        year: '2025',
        cover: 'assets/covers/default.jpg',
        audioUrl: audioUrl
      };

      this.songService.addSong(newSong);
      alert(`✅ "${newSong.title}" has been added!`);

      // Reset form
      this.title = '';
      this.selectedFile = null;
    };

    reader.readAsDataURL(this.selectedFile); // Converts to base64
  }
}
