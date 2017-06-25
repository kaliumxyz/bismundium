import test from 'ava'
import seed from './lib/seed.js'

test('can seed db',async t => {
	// Make a promise to deal with async stuff.
	let promise = new Promise((res, err) => {
		seed('test', res)
	})
	// Wait till we get the resulting data then pass the test.
	await promise.then(_ => t.pass() )
})

