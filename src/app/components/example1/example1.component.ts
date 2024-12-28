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
  pdfIsUploaded: Boolean = false;

  base64PDF: string = ""; //ONLY BASE64 DATA 
  atobB64PDF!: string; //This one adds the necesary metadata for the iframe (this one is actually the one iframe uses)
  pdfData!: any; //this stores the uploaded metada info. From the <input> node
  @ViewChild("iframe") iframe!: ElementRef;

  pdfHasBeenUploaded($event: any) {
    this.pdfIsUploaded = true;
    this.pdfData = $event.target.files[0];
    this.parsePDFtoB64();
  }

  /*____PARSE FUNCTIONS____*/
  parsePDFtoB64() {
    const reader = new FileReader();
    reader.readAsDataURL(this.pdfData);
    reader.onload = () => {
      this.base64PDF = (reader.result as string).split(',')[1]
    }
  }

  parseB64toPDF() {
    this.atobB64PDF = atob(this.base64PDF);
    const byteArrays = new Uint8Array(this.atobB64PDF.length);
    // Convertir la cadena binaria a un array de bytes
    console.log(this.atobB64PDF)
    for (let i = 0; i < this.atobB64PDF.length; i++) {
        byteArrays[i] = this.atobB64PDF.charCodeAt(i);
    }
    const blob = new Blob([byteArrays], { type: 'application/pdf' });

    this.iframe.nativeElement.src = URL.createObjectURL(blob); //WE "INFLATE" THE IFRAME
  }

  /*____END PARSE FUNCTIONS____*/

  seeBase64() {
    if(this.base64PDF!=''){
      console.group("RESULT (BASE64)");
        console.log("THIS IS THE BASE64'S PDF");
        console.log(this.base64PDF);
      console.groupEnd();

      console.group("RESULT (PDF)");
        console.log("THIS IS THE PDF'S METADATA");
        console.log(this.pdfData);
      console.groupEnd()

      console.group("RESULT (ATOB)");
        console.log("THIS IS THE ATOB'S PDF TO PARSE FROM B64 TO PDF");
        if(this.atobB64PDF == undefined){
          console.warn("PRESS THE '👉UPLOAD PDF to iframe' BUTTON FIRST!!!");
        } else {
          console.log(this.atobB64PDF);
        }
      console.groupEnd()
    }
    else{
      console.warn("AUN NO HAS SUBIDO UN PDF")
    }
  }

  clearPDF() {
    this.pdfIsUploaded = false;
    
    this.iframe.nativeElement.value = "";
    this.base64PDF = "";
    this.pdfData = "";
  }
}
