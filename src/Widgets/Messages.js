function getGreeting(){
    const d = new Date();
    const hours = d.getHours();
  
    var greeting =''
  
      if(hours < 3 || hours > 22){
        greeting = "おやすみんさい";
      } else if (hours < 12){
        greeting = "おはようございます";
      } else if (hours < 18){
        greeting = "こんにちは";
      } else {
        greeting = "こんばんは"
      }
  
      return greeting;
  }

export {getGreeting};
