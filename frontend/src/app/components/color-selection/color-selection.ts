import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-color-selection',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChipModule, DividerModule],
  templateUrl: './color-selection.html',
  styleUrls: ['./color-selection.css']
})
export class ColorSelection {
  nextRun = '7H : 52M : 25S';

  runAutomation() {
    console.log('Running automated process...');
  }

  runManual() {
    console.log('Running manual color process...');
  }

  importColors() {
    console.log('Importing colors...');
  }
  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log('Selected file:', file);

    // TODO: Add your CSV parsing or processing here
  }
}

}