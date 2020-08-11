const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));// tells the server that there is a folder called public, where there are all the static files we use

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",(req,res)=>{
  const Email=req.body.email;
  const name=req.body.name;
  const data={
    members:[
      {
      email_address:Email,
      status:"subscribed",
      merge_fields:{
        FNAME:name
      }
    }
    ]
  };
  const JSONdata=JSON.stringify(data);
  const url="https://usx.api.mailchimp.com/3.0/lists/"+CLIENT_ID;// replace x with last number of API_KEY
  const options={
    method:"POST",
    auth:"Anystring:"+API_KEY;
  }
  const request=https.request(url,options,(response)=>{

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",(data)=>{
      console.log(JSON.parse(data));
    });
  });

  request.write(JSONdata);
  request.end();
});

app.post("/failure",(req,res)=>{
  res.sendFile(__dirname+"/signup.html");
})
app.listen(process.env.PORT || 3002,(req,res)=>{
  console.log("Server is connected");
});
