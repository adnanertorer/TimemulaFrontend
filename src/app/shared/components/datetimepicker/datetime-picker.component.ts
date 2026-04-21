import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-datetime-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerComponent),
      multi: true,
    },
  ],
})
export class DatetimePickerComponent implements ControlValueAccessor {
  @Input() id = `dtp-${Math.random().toString(36).slice(2, 9)}`;
  @Input() label = 'Tarih & Saat';
  @Input() placeholder = '';
  @Input() min?: string;
  @Input() max?: string;
  @Input() required = false;
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string | null>();

  value: string | null = null;
  touched = false;

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | Date | null): void {
    if (!value) {
      this.value = null;
      return;
    }

    if (value instanceof Date) {
      this.value = this.toLocalDateTime(value);
      return;
    }

    this.value = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: string): void {
    this.value = value || null;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }
  
  get minInvalid(): boolean {
    if (!this.value || !this.min) return false;
    return this.value < this.min;
  }

  get maxInvalid(): boolean {
    if (!this.value || !this.max) return false;
    return this.value > this.max;
  }

  get requiredInvalid(): boolean {
    return this.required && this.touched && !this.value;
  }

  private toLocalDateTime(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const h = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${y}-${m}-${d}T${h}:${min}`;
  }
}