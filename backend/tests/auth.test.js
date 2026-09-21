const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

test('inscription et connexion d’un utilisateur', async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api`;
  const emailUnique = `jean.${Date.now()}@example.com`;

  try {
    const inscriptionResponse = await fetch(`${baseUrl}/auth/inscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: 'Jean Dupont',
        email: emailUnique,
        mot_de_passe: 'MotDePasse123!'
      })
    });

    assert.equal(inscriptionResponse.status, 201);
    const inscriptionData = await inscriptionResponse.json();
    assert.equal(inscriptionData.utilisateur.email, emailUnique);

    const connexionResponse = await fetch(`${baseUrl}/auth/connexion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailUnique,
        mot_de_passe: 'MotDePasse123!'
      })
    });

    assert.equal(connexionResponse.status, 200);
    const connexionData = await connexionResponse.json();
    assert.ok(connexionData.token);
    assert.equal(connexionData.utilisateur.email, emailUnique);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('le module apprentissage expose des leçons et exercices', async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api`;

  try {
    const leconsResponse = await fetch(`${baseUrl}/apprendre`);
    assert.equal(leconsResponse.status, 200);
    const lecons = await leconsResponse.json();
    assert.ok(Array.isArray(lecons));
    assert.ok(lecons.length > 0);

    const exercicesResponse = await fetch(`${baseUrl}/exercices`);
    assert.equal(exercicesResponse.status, 200);
    const exercices = await exercicesResponse.json();
    assert.ok(Array.isArray(exercices));
    assert.ok(exercices.length > 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('le module conversation propose une correction de phrase en français', async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api`;

  try {
    const response = await fetch(`${baseUrl}/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Je mappelle Karim et je suis etudiant.' })
    });

    assert.equal(response.status, 200);
    const data = await response.json();
    assert.ok(data.reponse);
    assert.match(data.reponse.toLowerCase(), /karim|étudiant|je m'appelle/i);
    assert.ok(data.correction);
    assert.ok(data.audioText);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
