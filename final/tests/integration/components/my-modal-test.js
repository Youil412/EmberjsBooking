import { module, test } from 'qunit';
import { setupRenderingTest } from 'booking-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | my-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<MyModal />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <MyModal>
        template block text
      </MyModal>
    `);

    assert.dom().hasText('template block text');
  });
});
