import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Vendor {
    constructor(data) {
            this.data = data;
            this.VENDOR_SERVICE = 'vendors';
        }

newVendor(id){
        this.selectedVendor = {};
        this.selectedVendor.vendor = "";
        this.selectedVendor.detail = "";
        this.selectedVendor.date = new Date();
        this.selectedVendor.status = "Vendor";
        this.selectedVendor.userid = id;
      }
        
     async saveVendor() {
        let serverResponse;
        if (this.selectedVendor) {
          if (this.selectedVendor._id) {
            let url = this.VENDOR_SERVICE + "/" + this.selectedVendor._id;
            serverResponse = await this.data.put(this.selectedVendor, url);
          } else {
            serverResponse = await this.data.post(this.selectedVendor, this.VENDOR_SERVICE);
          }
          return serverResponse;
        }
      }

    async getVendors(userid) {
            let url = this.VENDOR_SERVICE + '/user/' + userid;
            let response = await this.data.get(url);
            if (!response.error) {
              this.vendorsArray = response;
            } else {
              this.vendorsArray = [];
            }
          }

        async deleteVendor(id){
            let url = this.VENDOR_SERVICE + '/' + id;
            await this.data.delete(url);
        }
}