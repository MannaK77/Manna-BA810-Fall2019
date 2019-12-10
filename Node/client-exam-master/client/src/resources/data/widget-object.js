import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';
@inject(DataServices)
export class Widget {
    constructor(data) {
            this.data = data;
            this.WIDGET_SERVICE = 'widgets';
        }

newWidget(id){
        this.selectedWidget = {};
        this.selectedWidget.widget = "";
        //this.selectedWidget.detail = "";
        this.selectedWidget.dateDue = new Date();
        this.selectedWidget.status = "Widget";
        //this.selectedWidget.userid = id;
      }
        
     async saveWidget() {
        let serverResponse;
        if (this.selectedWidget) {
          if (this.selectedWidget._id) {
            let url = this.WIDGET_SERVICE + "/" + this.selectedWidget._id;
            serverResponse = await this.data.put(this.selectedWidget, url);
          } else {
            serverResponse = await this.data.post(this.selectedWidget, this.WIDGET_SERVICE);
          }
          return serverResponse;
        }
      }

    async getWidgets(userid) {
            let url = this.WIDGET_SERVICE;
            let response = await this.data.get(url);
            if (!response.error) {
              this.widgetsArray = response;
            } else {
              this.widgetsArray = [];
            }
          }

        async deleteWidget(id){
            let url = this.WIDGET_SERVICE + '/' + id;
            await this.data.delete(url);
        }
}