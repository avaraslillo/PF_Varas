import { FormControl } from "@angular/forms";
import { ICourse } from "./course.model";
import { IStudent } from "./student.model";

export interface IInscription {
    id: number;
    estudiante: IStudent | null;
    curso: ICourse | null;
}

export interface IInscriptionForm {
    estudiante: FormControl<IStudent | null>;
    curso: FormControl<ICourse | null>;
  }

  export interface IInscriptionCreateData{
    estudiante?: IStudent | null;
    curso?: ICourse | null;
  }  