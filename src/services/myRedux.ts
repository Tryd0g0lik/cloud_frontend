
class UserId {
  state: string

  constructor (){
    this.state = "";
  }

  set_state(state: string) {
    this.state = state;
  }
}


const userIdRedux = new UserId();
export default userIdRedux;
