import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Vendor} from '../resources/data/vendor-object';
@inject(Vendor)

export class Vendors {
  constructor(vendor) {
    this.vendor = vendor;
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.statuses = ['Available', 'UnAvailable'];
    this.isCheckedUnAvailable = true;
  }
  
  async attached() {
    await this.getVendors();
  }
  async getVendors() {
    await this.vendor.getVendors(this.userObj._id);
    this.showForm = false;
  }

  updateVendor(vendor) {
    this.vendor.selectedVendor = vendor;
    this.saveVendor();
  }

  newVendor() {
    this.vendor.newVendor(this.userObj._id);
    this.showForm = true;
  }

  editVendor(vendor) {
    this.vendor.selectedVendor = vendor;
    this.showForm = true;
  }

  async saveVendor() {
    await this.vendor.saveVendor()
    this.getVendors();
  }
  

  async deleteVendor(vendor) {
    await this.vendor.deleteVendor(vendor._id);
    this.getVendors();
    
  }

  Cancel() {
    this.showForm = false;
  }

  }