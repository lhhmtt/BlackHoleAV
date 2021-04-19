import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import PushNotification from 'react-native-push-notification';
import * as RNFS from 'react-native-fs';
import CONST from '../constant';

const onCheckingFile = (event: any) => {
  PushNotification.localNotification(CONST.NOTIFICATION_CONFIG_START);
  let files: any[] = [
    {
      name: "file",
      filename: event['name'],
      filepath: event['path'],
      filetype: 'apk'
    }
  ]

  let uploadBegin = (response: { jobId: any; }) => {
    let jobId = response.jobId;
    console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
  };

  let uploadProgress = (response: { totalBytesSent: number; totalBytesExpectedToSend: number; }) => {
    let percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
    console.log('UPLOAD IS ' + percentage + '% DONE!');
  };

  RNFS.uploadFiles({
    toUrl: encodeURI('http://10.0.2.2:5000/upload'),
    files: files,
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    begin: uploadBegin,
    progress: uploadProgress
  }).promise.then((response) => {
    if (response.statusCode == 200) {
      if(JSON.parse(response.body)['status'] === "clean") {
        PushNotification.localNotification(CONST.NOTIFICATION_CONFIG_CLEAN);
      } else if (JSON.parse(response.body)['status'] === "malware") {
        PushNotification.localNotification(CONST.NOTIFICATION_CONFIG_MALWARE);
      } else if (JSON.parse(response.body)['status'] === "unknown") {
        console.log('Unknown', JSON.parse(response.body)['description']);
      }
      console.log('FILES UPLOADED!', response); 
    } else {
      console.log('SERVER ERROR');
      PushNotification.localNotification(CONST.NOTIFICATION_CONFIG_ERROR);
    }
  })
    .catch((err) => {
      if (err.description === "canceled") {
        console.log("Canceled by user")
      }
      console.log(err);
      PushNotification.localNotification(CONST.NOTIFICATION_CONFIG_ERROR);
    });
  subscription.remove();
  subscription = DeviceEventEmitter.addListener('onCheckingFile', onCheckingFile);
};

let subscription: EmitterSubscription = DeviceEventEmitter.addListener('onCheckingFile', onCheckingFile);

module.exports = async (taskData: any) => {
  console.log(taskData);
};
