import {AuthorizeStep} from 'aurelia-auth';

export class App {
  configureRouter(config, router) {
    this.router = router;
     config.addPipelineStep('authorize', AuthorizeStep); 
    config.title = 'Event Me!!';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'modules/home',
        title: 'Home',
        auth: false
      },
      {
        route: 'users',
        name: 'users',
        moduleId: 'modules/users',
        title: 'Users',
        //auth: true

      },
      {
        route: 'vendors',
        name: 'vendors',
        moduleId: 'modules/vendors',
        title: 'Vendors',
        auth: true
      }
    ]);
  }
}
