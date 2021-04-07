import { DeviceEventEmitter} from 'react-native';
import * as RNFS from 'react-native-fs';

const onCheckingFile = (event: any) => {
  let files: any[] = [
    {
      name: "file",
      filename: event,
      filepath: RNFS.DownloadDirectoryPath + `/${event}`,
      filetype: 'apk'
    }
  ]

  let uploadBegin = (response: { jobId: any; }) => {
    let jobId = response.jobId;
    console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
  };
  
  let uploadProgress = (response: { totalBytesSent: number; totalBytesExpectedToSend: number; }) => {
    let percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
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
        console.log('FILES UPLOADED!');
      } else {
        console.log('SERVER ERROR');
      }
    })
    .catch((err) => {
      if(err.description === "canceled") {
        console.log("Canceled by user")
      }
      console.log(err);
    });

};

module.exports = async (taskData: any) => {
  // do stuff
  DeviceEventEmitter.addListener('onCheckingFile', onCheckingFile);
};
