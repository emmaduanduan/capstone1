require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
        drop table if exists parks;
        drop table if exists states;

        CREATE TABLE states(
            state_id serial primary key,
            name varchar
        );

        CREATE TABLE parks(
            park_id serial primary key,
            name varchar,
            priority varchar,
            state_id integer references states(state_id)
        );

        INSERT INTO states (name)
        VALUES ('Alabama'),('Alaska'),('Arizona'),('Arkansas'),('California'),('Colorado'),('Connecticut'),('Delaware'),('Florida'),('Georgia'),('Hawaii'),('Idaho'),('Illinois'),('Indiana'),('Iowa'),('Kansas'),('Kentucky'),('Louisiana'),('Maine'),('Maryland'),('Massachusetts'),('Michigan'),('Minnesota'),('Mississippi'),('Missouri'),('Montana'),('Nebraska'),('Nevada'),('New Hampshire'),('New Jersey'),('New Mexico'),('New York'),('North Carolina'),('North Dakota'),('Ohio'),('Oklahoma'),('Oregon'),('Pennsylvania'),('Rhode Island'),('South Carolina'),('South Dakota'),('Tennessee'),('Texas'),('Utah'),('Vermont'),('Virginia'),('Washington'),('West Virginia'),('Wisconsin'),('Wyoming');
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  getStates: (req, res) => {
    sequelize
      .query(`SELECT * FROM states;`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  createPark: (req, res) => {
    sequelize
      .query(
        `INSERT INTO parks (name, priority, state_id) values ('${req.body.name}', '${req.body.priority}', ${req.body.stateId})`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  getParks: (req, res) => {
    sequelize
      .query(
        `SELECT park_id, parks.name, priority, parks.state_id, states.state_id, states.name AS state_name 
      FROM parks
      JOIN states
      ON parks.state_id = states.state_id;`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  deletePark: (req, res) => {
    let { id } = req.params;
    sequelize
      .query(`DELETE from parks where park_id = ${id} ;`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
