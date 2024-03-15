import { Directive, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[addClasses]',
})
export class AddClassesDirective implements AfterViewInit, OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    console.log(this.el);
  }
  ngAfterViewInit() {
    console.log('sdfbfvds');
    const elements = this.el.nativeElement.children;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.tagName.toLowerCase() === 'p') {
        element.classList.add('paragraph');
        element.style.fontSize = '1.4rem';
        element.style.color = 'var(--text-color2)';
        element.style.lineHeight = '1.4';
      } else if (element.tagName.toLowerCase() === 'h2') {
        element.classList.add('heading');
        element.style.fontSize = '2.4rem';
        element.style.marginBottom = '1.2rem';
        element.style.marginTop = '.8rem';
        element.style.color = 'var(--text-color)';
      }
    }
  }
}
