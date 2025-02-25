import { profileLoader } from "@Services/request/profileloading";




const task5 = () => new Promise(resolve => {
  const regexp = /profile\/\w+\/*/i;
  if (regexp.test(window.location.href) ){
    profileLoader()
    .then((response =>{
      resolve(response);
    }));
  };
});
export default task5;
