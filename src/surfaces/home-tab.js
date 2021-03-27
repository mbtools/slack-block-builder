const { AdvancedSurface } = require('./base');
const { SlackDto } = require('../utility/lib');
const { BuilderHelper } = require('../utility/helpers');
const { props, types } = require('../utility/constants');

class HomeTabDto extends SlackDto {
  constructor(params) {
    super();

    this.type = types.surfaces.home;
    this.blocks = params.blocks;
    this.private_metadata = params.privateMetaData;
    this.callback_id = params.callbackId;
    this.external_id = params.externalId;

    this.pruneAndFreeze();
  }
}

class HomeTab extends AdvancedSurface {
  constructor(params = {}) {
    super();

    this.props.privateMetaData = params.privateMetaData;
    this.props.callbackId = params.callbackId;
    this.props.externalId = params.externalId;

    this.finalizeConstruction();
  }

  /**
   * Sets a custom identifier that must be unique for all views on a per-team basis
   *
   * **Slack Validation Rules:**
   *    * Max 255 characters
   *
   * {@link https://api.slack.com/reference/surfaces/views|View in Slack API Documentation}
   *
   * @param {string} string
   * @return {this} The instance on which the method is called
   */

  externalId(string) {
    return this.set(string, props.externalId);
  }

  /**
   * @private
   */

  build() {
    if (!this.hasBeenBuilt) {
      const augmentedProps = {
        blocks: BuilderHelper.getBuilderResults(this.props.blocks),
      };

      this.getResult(HomeTabDto, augmentedProps);
    }

    return this.result;
  }
}

module.exports = {
  HomeTab,
  HomeTabDto,
};

/**
 * {@link https://api.slack.com/reference/surfaces/views|View in Slack API Documentation}
 */
