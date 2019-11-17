
# F1 - smava recruitment tasks for front-end developers

Hello! We are very happy to see that you have reached this challenge! The task requires some creativity, we are giving you some description, which is very close to the stuff we do at smava.

Solutions need to be provided as a bunch of files. For this task you may want to use some build tools, so we are expecting source code from you but not the minified output because the **code quality** is also important for us.

Also, we want to see how you use **Unit tests**. So please include Unit tests where they are meaningful for you.

We wish you best of luck and hope you will have a nice time while solving this task!

## Make a registration form

We would kindly ask you to show us your ability to create a form. We are expecting a solution based on React library, written in es2015+.
Try to not spend more than 3 hours on this task.

### Technical description

1. When a user opens a page he or she sees the following: ![first](https://user-images.githubusercontent.com/28978937/35053398-487b06ce-fbaa-11e7-9ee1-999448945ce3.png)

2. The specific input data shall be validated when the field loses the focus and when the submit button is pressed as well (validation rules - please see bellow). In case of validation errors a
message shall be displayed next to the invalid field. ![second](https://user-images.githubusercontent.com/28978937/35053395-46f695c0-fbaa-11e7-922a-dcfb87826f2c.png)

3. Add a new component below the form that will show the current content of all fields simultaneously as the fields are changed.

4. After submission, a notification message should be spawned over the top of the form (e.g. Congratz! All data is valid) and then it should be hidden after 3 seconds!

5. If the user has tried to submit invalid data first and fixed the validation errors afterwards, the whole data set should be validated again on submission.

### Validation rules

* All fields are mandatory (required)

1. **firstName** - should contain only small and capital letters, no numbers, special characters, etc.
1. **lastName** - same as the **firstName**
1. **email** - must be a valid email address
1. **iban** - we want you to use asynchronous validation. Also, the server is not stable - so it will fail from time-to-time. Please use the small node server script in order to validate IBAN. The server is running on port 3050. What is IBAN? [IBAN] https://en.wikipedia.org/wiki/International_Bank_Account_Number).

### Hints

You are not forced to use this hints but they will make this task easier for you.

- Use create-react-app
- We care about architecture - make sure your structure is scaleable
- Give us instructions how to start / install (Proper Readme.md)


## Server

```
const express = require('express');
const bodyParser = require('body-parser');
const ibanLib = require('iban');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

const router = express.Router();

let count = 0;

router.post('/', (req, res, next) => {
    const { iban } = req.body;
    try {
        if (++count % 3 === 0) {
            throw new Error('Service is not available');
        }
        if (!iban) {
            return res.status(400).json({message: 'Body should contain iban field'})
        }
        const valid = ibanLib.isValid(iban);
        res.json({ valid });
    } catch (e) {
        res.status(500).json({message: e.message || 'Something went wrong. Please, try again'});
    }
});

app.use('/', router);

app.listen(3050, (err) => {
    if (err) {
        throw err;
    }
    console.info('Server is listening on port 3050');
});
```

#### Example package.json

```
{
  "name": "server",
  "version": "1.0.0",
  "description": "Test server",
  "main": "index.js",
  "dependencies": {
    "body-parser": "^1.18.2",
    "express": "^4.16.2",
    "iban": "^0.0.8"
  },
  "devDependencies": {},
  "scripts": {
    "start": "node index.js"
  }
}
