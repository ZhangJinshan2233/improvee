import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IndicatorRecordService } from '../../../services/indicator-record.service'
import {
  compareDesc
} from 'date-fns';
@Component({
  selector: 'app-indicator-record-detail',
  templateUrl: './indicator-record-detail.page.html',
  styleUrls: ['./indicator-record-detail.page.scss'],
})

export class IndicatorRecordDetailPage implements OnInit {
  newRecordForm: FormGroup
  isUpdate = false;
  indicator: any;
  isSubmitted = false
  mode = "add"
  constructor(private navParams: NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private indicatorRecordService: IndicatorRecordService) { }

  ngOnInit() {
    this.create_new_record_form()
    this.indicator = this.navParams.data['indicator']
    console.log(this.indicator)
    this.mode = this.navParams.data['mode']
    if (this.mode == "update") {
      this.isUpdate = true;
      this.newRecordForm.setValue({
        value: this.indicator.value,
        createDate: this.indicator.createDate
      })

    }
  }
  /**
   * create new reocrd form
   */
  create_new_record_form() {
    this.newRecordForm = this.formBuilder.group(
      {
        value: ["", [Validators.required,Validators.pattern(/^[0-9]+([.][0-9]+)?$/)]],
        createDate: [new Date().toISOString(), Validators.required]
      })
  }

  get f() {
    return this.newRecordForm.controls
  }

  /**
   * submit record form
   */
  submit_record_form() {
    this.isSubmitted = true
    if (this.newRecordForm.invalid) return
    let record = {}
    if (this.mode === "add") {
      record = {
        name: this.indicator.name,
        ...this.newRecordForm.value
      }
      //can not create record of future date 
      let isFutureDate = compareDesc(new Date(record['createDate']), new Date())
      if (isFutureDate == -1) return 
      this.indicatorRecordService.create_new_record(record).subscribe(res => {
        this.modalCtrl.dismiss({
          indicatorRecord: res['newRecord']
        })
      })
    } else {
      record = {
        ...this.newRecordForm.value
      }
      this.indicatorRecordService.update_record(this.indicator._id, record).subscribe(res => {
        this.modalCtrl.dismiss({
          method: 'update',
          changedFields: { ...this.newRecordForm.value }
        })
      })
    }

   
  }

  /**
   * close modal
   */
  async colse_modal() {
    this.modalCtrl.dismiss()
  }

  /**
   * delete record 
   */
  async delete_record() {
    this.indicatorRecordService.update_record(this.indicator._id, { createDate: this.indicator.createDate, isObsolete: true }).subscribe(res => {
    
      this.modalCtrl.dismiss({
        method: "delete"
      })
    })

  }

}
