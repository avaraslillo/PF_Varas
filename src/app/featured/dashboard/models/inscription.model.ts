import { FormControl } from "@angular/forms";
import { ICourse } from "./course.model";
import { IStudent } from "./student.model";

export interface IInscription {
    id: string;
    student: IStudent | null;
    course: ICourse | null;
}

export interface IInscriptionForm {
    student: FormControl<IStudent | null>;
    course: FormControl<ICourse | null>;
  }

  export interface IInscriptionCreateData{
    student?: IStudent | null;
    course?: ICourse | null;
  }  