import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const ShowToast=(type:any,title:string,textBody:string)=>{
    Toast.show({
        type: type,
        title: title,
        textBody: textBody,        
      });
}

export default ShowToast;