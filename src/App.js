import StoreController from "./Controller/StoreController.js";

class App {
  async run() {
    this.storeController = new StoreController();
    await this.storeController.Start();
  }
}

export default App;
