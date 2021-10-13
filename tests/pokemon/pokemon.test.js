const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = 'http://localhost:4000/api/pokemons'

describe('Recupère la liste des pokemons', function() {
  it('Retourne un code 200', async () => {
    const res = await request(app).get(url);
    expect(res.statusCode).to.equal(200);
  });

  it('La réponse est un array', async () => {
    const res = await request(app).get(url);
    expect(res.body).is.an('array');
  });

  it('Retourne Raichu', async () => {
    const res = await request(app).get(url);
    expect(res.body[0]).has.property('name', 'Raichu')
    expect(res.body[0]).has.property('hp', 100)
    expect(res.body[0]).has.property('cp', 100)
  });
});