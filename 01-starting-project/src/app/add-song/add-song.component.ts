import { Component } from '@angular/core';
import { SongService } from '../song.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.css'
})
export class AddSongComponent {
  title: string = '';

  constructor(private songService: SongService) {}

  onSubmit() {
    if (!this.title.trim()) {
      alert('Title is required!');
      return;
    }

    this.songService.addSongFromTitle(this.title);
    this.title = '';
  }
}

