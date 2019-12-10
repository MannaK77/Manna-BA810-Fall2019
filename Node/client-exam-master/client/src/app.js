import { AuthorizeStep } from 'aurelia-auth';

export class App {
        configureRouter(config, router) {
                this.router = router;
                //config.addPipelineStep('authorize', AuthorizeStep);
                config.title = 'Widgets';
                config.map([
                        {
                                route: ['', 'home'],
                                name: 'home',
                                moduleId: 'modules/home',
                                title: 'home',
                                auth: false
                        },

                        

                        {
                                route: 'widgets',
                                name: 'Widgets',
                                moduleId: 'modules/widgets',
                                title: 'Widgets',
                                auth: false
                        }

                        

                ]);
        }
}