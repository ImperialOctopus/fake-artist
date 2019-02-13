import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import "app.scss";

export class App {
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: "",
        moduleId: PLATFORM.moduleName("menu"),
        name: "menu"
      },
      {
        route: "play",
        moduleId: PLATFORM.moduleName("play"),
        name: "play"
      }
    ]);
  }
}
