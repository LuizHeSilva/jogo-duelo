import { Component, EventEmitter, Injectable, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { DialogConfigModel } from "../models/dialog-config.model";

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
@Injectable()
export class DialogComponent {

    @Input() public modalConfig: DialogConfigModel;
    @Output() fecharEmit: EventEmitter<any> = new EventEmitter();
    @ViewChild('modal') private modalContent: TemplateRef<DialogComponent>;
    private modalRef: NgbModalRef;

    constructor(private modalService: NgbModal) { }

    open(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.modalRef = this.modalService.open(this.modalContent)
            this.modalRef.result.then(resolve, resolve)
        })
    }

    async close(): Promise<void> {
        if (this.modalConfig.confirmacaoFechar === undefined || (await this.modalConfig.confirmacaoFechar())) {
            const result = this.modalConfig.onFechar === undefined || (await this.modalConfig.onFechar())
            this.modalRef.close(result)
            this.fecharEmit.emit();
        }
    }

    async dismiss(): Promise<void> {
        if (this.modalConfig.confirmacaoCancelar === undefined || (await this.modalConfig.confirmacaoCancelar())) {
            const result = this.modalConfig.onCancelar === undefined || (await this.modalConfig.onCancelar())
            this.modalRef.dismiss(result);
            this.fecharEmit.emit();
        }
    }
}
