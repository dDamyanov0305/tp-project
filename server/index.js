const express = require('express');
const app = express();
const braintree = require('braintree');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "w9834vrh3k2km7wd",
    publicKey: "c8vk9w93bkx8wdzw",
    privateKey: "415e684205bbb538c9ea16f8b36e84ed"
  });

app.post('/client_token',(req,res)=>{

    gateway.clientToken.generate({
        customerId:req.body.uid,
    },(err,response)=>{
        if(err)
            throw err;
        res.send(response.clientToken);
    })
    
})

app.post('/create_user',(req,res)=>{
    const { firstName, lastName, email, uid, addressLine1, city, postalCode, dateOfBirth, region } = req.body;
    console.log(firstName);

    //make user customer
    gateway.customer.create({
        id:uid,
        firstName,
        lastName,
        email
    },(err,result)=>{
        if(err)
            throw err;
        console.log(result.customer);
    })

    //make user merchant
    merchantAccountParams = {
        individual: {
          firstName,
          lastName,
          email,
          dateOfBirth,
          address: {
            streetAddress: addressLine1,
            locality: city,
            region,
            postalCode
          }
        },
        funding: {
          destination: braintree.MerchantAccount.FundingDestination.Bank,
          accountNumber: "1123581321",
          routingNumber: "071101307"
        },
        tosAccepted: true,
        masterMerchantAccountId: "dimitardamyanov",
        id: uid
      };
      
    gateway.merchantAccount.create(merchantAccountParams,(err, result) => {
        if(err)
            throw err;

        
        console.log(result);
    });
    res.sendStatus(200);

})

const PORT = 5000;
app.listen(PORT,()=>{console.log("Server started on port "+PORT)})