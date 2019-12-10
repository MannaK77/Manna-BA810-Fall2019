import { AuthorizeStep } from 'aurelia-auth';

export class App {
        configureRouter(config, router) {
                this.router = router;
                config.addPipelineStep('authorize', AuthorizeStep);
                config.title = 'Widgets';
                config.map([
                        

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