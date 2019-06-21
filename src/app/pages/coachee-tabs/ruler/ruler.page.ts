import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import SlideRuler from "slide-ruler";

@Component({
  selector: 'app-ruler',
  templateUrl: './ruler.page.html',
  styleUrls: ['./ruler.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RulerPage implements OnInit {
  @Input('max') max;
  @Input('min') min;
  @Input('currentValue') currentValue;
  @Output() onChange = new EventEmitter()
  @ViewChild('Ruler') ruler;
  constructor() { }
  ngOnInit() {
    this._renderRuler()
  }
  handleValue = (value) => {

    this.currentValue = value
    this.onChange.emit(value)
  }
  _renderRuler() {
    return new SlideRuler(
      {
        el: this.ruler.nativeElement,
        maxValue: this.max,
        minValue: this.min,
        currentValue: this.currentValue,
        handleValue: this.handleValue,
        precision: 0.1,
        canvasHeight: 60
      }
    );
  }
}
