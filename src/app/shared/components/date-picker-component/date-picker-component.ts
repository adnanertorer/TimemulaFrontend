import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-date-picker",
  templateUrl: './date-picker-component.html',
  styleUrls: ['./date-picker-component.scss'],
  standalone: true
})
export class DatePickerComponent {
  @Input() id = "date-picker";
  @Input() label = "";
  @Input() value = "";
  @Input() min = "";
  @Input() max = "";
  @Input() disabled = false;
  @Input() required = false;
  @Input() className = "";
  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedDate = new Date(target.value + "T00:00:00Z");
    const utcDate = selectedDate.toISOString();
    this.valueChange.emit(utcDate);
  }
  
  get formattedValue(): string {
    if (!this.value) return "";
    const date = new Date(this.value);
    return date.toISOString().split("T")[0];
  }
}