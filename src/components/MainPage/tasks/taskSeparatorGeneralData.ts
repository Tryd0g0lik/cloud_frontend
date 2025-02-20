
export const task1 = (generaldata: { data: { users: [any], files: [any] } }) => new Promise(resolve => {
  /**
   *  @return {quantityAllUsers, quantityAllFiles, [{userId: number, userName: string, quantityFiles: numbers}]}
   */
  const generalValue = Object.values(generaldata);
  if (generalValue.length === 0) {
    return {};
  }
  const files = generaldata["data"]["files"];
  const users = generaldata["data"]["users"];
  const quantityAllUsers = users.length;
  const quantityAllFiles = files.length;
  interface UserMeta {
    userId: number;
    userName: string;
    quantityFiles: number;
  }
  const userMeta = users.map((user) => {
    // GET USER NAME
    const v = user["username"] ? user["username"] : user["first_name"];
    // GET USER ID
    const k = user["id"];
    return [k, v]
  });
  //
  const userNewMeta: UserMeta[] = [] ;
  userMeta.forEach((user, ind) => {
    let calculate = 0;
    for (let i = 0; i < files.length; i++){
      if (user[0] === files[i]["user_id"]) {
        calculate += 1;

    }}
    userNewMeta.push({userId: user[0], userName: user[1], quantityFiles: calculate});
  });
  return { quantityAllUsers, quantityAllFiles, userNewMeta};
})
