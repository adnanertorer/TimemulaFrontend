import { BloodGroupModel } from "./blood-group-model";
import { ParentTypeModel } from "./parent-type-model";
import { SearchResourceModel } from "./search-resource-model";

export interface Customer {
    id: number;
    name: string;
    surname: string;
    phone: string;
    gsm: string;
    email: string;
    address: string;
    birthDate: Date;
    birthPlace: string;
    instagramAddress: string;
    facebookAddress: string;
    linkedinAddress: string;
    isChild: boolean;
    isActive: boolean;
    bloodGroupId?: number;
    disease: string;
    searchResourceId?: number;
    smsRequest: boolean;
    emailRequest: boolean;
    parentTypeId?: number;
    parentIdentity: string;
    parentName: string;
    parentSurname: string;
    parentEmail: string;
    parentProf: string;
    instagramParentAddress: string;
    facebookParentAddress: string;
    linkedinParentAddress: string;
    isAdult?: boolean;
    gender?: number;
    bloodGroup?: BloodGroupModel;
    parentType?: ParentTypeModel;
    searchResource?: SearchResourceModel;
}
