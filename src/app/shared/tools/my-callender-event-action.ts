import { CalendarEvent, CalendarEventTimesChangedEventType } from "angular-calendar";
import { MyCallenderEvent } from "../model/my-callender-event";

export class MyCallenderEventAction implements EventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: { event: MyCallenderEvent; sourceEvent: MouseEvent | KeyboardEvent; }) {
        throw new Error("Method not implemented.");
    }
}

export interface EventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: {
        event: MyCallenderEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;
}

export interface MyCalendarEventTimesChangedEvent<MetaType = any> {
    type: CalendarEventTimesChangedEventType;
    event: MyCallenderEvent<MetaType>;
    newStart: Date;
    newEnd?: Date;
    allDay?: boolean;
}
