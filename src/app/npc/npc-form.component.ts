import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Personagem} from "../models/personagem.model";

export class FormCriarPersonagens {
    static criar(): Personagem {
        return {
            nome: 'Bili De Quibe',
            vida: 100,
            bracos: 5,
            pernas: 5,
            torso: 2,
            cabeca: 1
        }
    };
}