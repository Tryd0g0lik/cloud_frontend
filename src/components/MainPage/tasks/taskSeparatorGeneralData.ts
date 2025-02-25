/**
 * src\components\MainPage\tasks\taskSeparatorGeneralData.ts
 */
export const task1 = (generaldata: { users: [any], files: [any] }) => new Promise(resolve => {
  /**
   *  @return {quantityAllUsers, quantityAllFiles, [{userId: number, userName: string, quantityFiles: numbers}]}
   */
  const generalValue = Object.values(generaldata);
  if (generalValue.length === 0 || (generalValue.length > 0 &&
    Object.keys(generalValue[0]).length === 0)
  ) {

    return new Object({});
  }
  const files = generaldata["files"];
  const users = generaldata["users"];
  const quantityAllUsers = users.length;
  const quantityAllFiles = files.length;
  interface UserMeta {
    userId: number;
    userName: string;
    quantityFiles: number;
    administrators: boolean
  }
  const userMeta = users.map((user) => {
    // GET USER NAME
    const username = user["username"] ? user["username"] : user["first_name"];
    // GET USER ID
    const userid = user["id"];
    // GET STATUS ADMINISTRATOR
    const admin = user["is_staff"];
    return [username, userid, admin];
  });
  //
  const userNewMeta: UserMeta[] = [];
  // FIND USERS WITH FILES
  userMeta.forEach((user, ind) => {
    let calculate = 0;
    for (let i = 0; i < files.length; i++){
      if (Number(user[0]) === Number(files[i]["user"])) {
        calculate += 1;

    }}
    userNewMeta.push({ userId: user[1], userName: user[0], quantityFiles: calculate, administrators: user[2] });

  });

  // FIND FILES AFTER DOWNLOADING
  const filesDownloading = [];
  files.forEach((file) => {
    if (file["last_downloaded"]) {
      filesDownloading.push(file["id"]);
    }
  });

  resolve({ quantityAllUsers, quantityAllFiles, filesDownloading: filesDownloading.length, userNewMeta });

});
