import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example1',
  standalone: true,
  imports: [NgIf],
  templateUrl: './example1.component.html',
  styleUrl: './example1.component.css'
})
export class Example1Component {
  base64PDF: string = "";
  @ViewChild("iframe") iframe!: ElementRef;

  pdfHasBeenUploaded() {
    
  }
}
