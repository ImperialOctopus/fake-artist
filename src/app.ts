import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import "app.scss";

export class App {
  configureRouter(config: RouterConfiguration, router: Router) {
    //config.title = "Sponge";
    config.map([
      {
        route: "",
        moduleId: PLATFORM.moduleName("menu"),
        name: "manu",
        title: "Menu"
      },
      {
        route: "play",
        moduleId: PLATFORM.moduleName("play"),
        name: "play",
        title: "Play"
      }
    ]);
  }
}
