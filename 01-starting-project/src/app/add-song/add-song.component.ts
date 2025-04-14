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

