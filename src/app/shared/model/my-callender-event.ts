import { CalendarEvent } from "angular-calendar";
import { EventColor, EventAction } from "calendar-utils";
import { PatientInfoModel } from "./patient-info-model";
import { VPatientInfoModel } from "./v-patient-info-model";

export class MyCallenderEvent<MetaType = any> implements CalendarEvent {
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    color?: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: { beforeStart?: boolean; afterEnd?: boolean; };
    draggable?: boolean;
    meta?: any;
    patientInfo: PatientInfoModel;
    vPatientInfo: VPatientInfoModel;
}
