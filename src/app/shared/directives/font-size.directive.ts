import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective implements OnInit{

  @Input('appFontSize')
  size!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', this.size || '16px');
  }


}
