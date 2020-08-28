const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUserInfo } = require('@credify/credify-js');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8000;

// TEST APP configuration
const mnemonic = "crime cake room tiny mirror exercise idea provide exhaust staff olive raise";
const config = {
  apiKey: "bufIgxAyApnAVUdeZjyEfWXjbOhrEYTSBe3rGzqNbiDEJDtQBpALMumG2n92Q6lF",
  mode: "sandbox" // If you are using Production, it will be `production`.
};

app.post('/', (req, res) => {
  const accessToken = req.body.access_token;
  // const accessToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzo4ZDA1NjJmNS0zMjI0LTQ1OGYtODBkZS01YjczNTdkMWUwMjIiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOltdLCJjbGllbnRfaWQiOiJjMDNlYWVkZC0yYTIyLTQyYWQtYTYxZi1jNzkxZDY2YjMwYzgiLCJleHAiOjE1OTkyMDA1OTIsImV4dCI6e30sImlhdCI6MTU5ODU5NTc5MSwiaXNzIjoiaHR0cHM6Ly9zdGFnZS1vaWRjLWNvcmUuY3JlZGlmeS5vbmUvIiwianRpIjoiZDBkOGJlM2MtNmYyYS00MWJiLThjY2QtZDQ5YTk4ZDA2MTE3IiwibmJmIjoxNTk4NTk1NzkxLCJzY3AiOlsicHJvZmlsZSIsInBob25lIiwiZW1haWwiLCJvcGVuaWQiXSwic3ViIjoiYjg4ZTJjODItMzk3Yi00ZjQxLWE3NDYtZTFmNjU2MTIyNTYyIn0.fU9QBpQajLWONHCP5N8B9qE4sSI9_vWIiJB-1YOn3X57WUNmFQqwjgJPnWUieimUh43xcuVCIEH86fl_KXIRHusMJTOqZwXLXGUal71JHNZlR7v4mECA4CDBWXcZzN-4OwQeJ6OoNmnqAoYQWtE7V-VUbUfrj-XKSFdrNMM-AHytb9Ir3Le_-Kz4OpfkVa680DLo1UXcslF_WToygTzRcsJBc10T0-E9SNk6-LCnp37lEBp7JpnAWinXCfUWU7_IaUj6iFesAYmgLJc6kcC4EeyfDswuOBOfEklb4qVP8fRKBv22KeA9LNcZuC0oVb60gYq8OL20vvcZKZZ7H1uxHAKL1ZeAw5UI9KcCtsVazja_29JXiY2Io0Ge55ecBeiS-D5AfTwJxP56jcKQ-gZ-oAxGUrd8EFVpBf_yGf0z2WJHEEtcCeT68JPoHAnEl9Dv6n84eKxl54nt-1zp8kifni7fqktnChrnunCEZhXfxdtu6yrpRYTMb0YC-Jk90GgDnVkCtC0rr40BJDKqTX9pgjVG8UwLg9myjaobM9bEVLENA_RS_0Pt7VWAUmdgJUyVrnM2FsQuwYLq_Z90dCfI2aFEpFjuZTwH61bVDDzdR6vfV2k5i9hfbEtoNXW3wZ_MTgIwziSYP0M5V1NU-ziJhBfnjroFqGL55sSbYS-pP6M";
  getUserInfo(mnemonic, accessToken, config).then((result) => {
    console.log(result);
    // sid is session ID.
    console.log(`User ID: ${result.sub}`);
    console.log(`Email: ${result.email}`);
    console.log(`Phone Number: ${result.phoneNumber}`);

    // Do your job

    res.send(result);
  }).catch((err) => {
    res.send(err);
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
