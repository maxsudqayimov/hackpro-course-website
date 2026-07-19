import assert from 'node:assert/strict';
import test from 'node:test';
import { labCatalog } from '../src/lab-catalog.mjs';
import { scenarios } from '../labs/web-basics/scenarios.mjs';

test('har bir katalog laboratoriyasi uchun original interaktiv scenario mavjud', () => {
  assert.equal(labCatalog.length, 6);
  assert.deepEqual(Object.keys(scenarios).sort(), labCatalog.map((lab) => lab.id).sort());
  for (const lab of labCatalog) {
    const scenario = scenarios[lab.id];
    assert.ok(scenario.briefing.length > 30);
    assert.ok(Object.keys(scenario.commands).length >= 2);
    assert.ok(scenario.answers.length >= 1);
    assert.ok(lab.xp > 0);
  }
});
