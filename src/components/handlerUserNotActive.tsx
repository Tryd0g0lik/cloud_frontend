import { CookieUser } from "@Services/cookieServices";
import { LocalRef } from "@Interfaces";
// import { useNavigate } from "react-router";

export function HandlerStateActivation() {
  // const navigate = useNavigate();
  // CHECK THE ACTIVATION OF USER'S COOCKIE
  const cookie = new CookieUser();
  if (!cookie.checkCoockie("is_active")) {
    // navigate();
    if (window.location.href === LocalRef.ACTIVATION) {
      return false;
    }
    window.location.href = LocalRef.ACTIVATION;
    
  }
}
