export class AppSettings {
  public static CONFIGURATION = [
    {
      "number":"0",
      "block": "1",
      "video": "1",
      "session":"1",
      "videoQ":"true",
      "blockQ":"false",
      "sessionQ": "false",
      "min":"30",
      "max":"200",
      "videoState":"R",
      "retainability": "40",
      "impairment": ""
    },
    {
      "number":"1",
      "block": "1",
      "video": "2",
      "session":"1",
      "videoQ":"true",
      "blockQ":"true",
      "sessionQ": "false",
      "min":"10",
      "max":"80",
      "videoState":"I",
      "retainability": "60",
      "impairment": "3,5,15,2,50,7"
    },
    {
      "number":"2",
      "block": "1",
      "video": "3",
      "session":"1",
      "videoQ":"true",
      "blockQ":"true",
      "sessionQ": "true",
      "min":"50",
      "max":"130",
      "videoState":"A",
      "retainability": "",
      "impairment": ""
    }
  ];

}
