import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Sponge";
    config.map([
      {
        route: "",
        moduleId: PLATFORM.moduleName("menu"),
        title: "Menu"
      },
      {
        route: "play",
        moduleId: PLATFORM.moduleName("play"),
        name: "play"
      }
    ]);
  }
}
