const mongoose = require('mongoose');

if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log(
    'Invalid argument: use either "node mongo.js [YOUR_PASSWORD] [PERSON_NAME] [PERSON_NUMBER]", or "node mongo.js [YOUR_PASSWORD]"',
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://full-stack-open:${password}@cluster0.pl9nayr.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const personName = process.argv[3];
  const personNumber = process.argv[4];

  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person.save().then(() => {
    console.log(`added name:"${personName}" number:"${personNumber}" to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
