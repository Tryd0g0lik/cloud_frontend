/**
 * src\components\NavbarTop\NavbarEnd\tasks\task0.ts
 */
import handlerLogin from "src/components/LoginLogout/handlers/handlerOfProfileActivation";

const task0 = () => new Promise<void>(resolve => {
  setTimeout(() => {
    const login = handlerLogin();
    login("is_active");
    resolve();
  }, 200);

});
export default task0;
