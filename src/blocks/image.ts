import { BlockBuilder } from '../base';
import { SlackDto } from '../lib';
import {
  HasAltText,
  HasBlockId,
  HasEnd,
  HasImageUrl,
  HasTitle,
  MustBuild,
} from '../methods';
import { applyMixins, getPlainTextObject } from '../helpers';

export interface ImageParams {
  altText?: string;
  blockId?: string;
  imageUrl?: string;
  title?: string;
}

export interface ImageBuilder extends HasAltText,
  HasBlockId,
  HasEnd,
  HasImageUrl,
  HasTitle,
  MustBuild {
}

/**
 * @@link https://api.slack.com/reference/block-kit/blocks#image
 * @@displayName Image
 */

export class ImageBuilder extends BlockBuilder<ImageParams> {
  public build(): SlackDto {
    const augmentedProps = {
      title: getPlainTextObject(this.props.title),
    };

    return this.getResult<SlackDto>(SlackDto, augmentedProps);
  }
}

applyMixins(ImageBuilder, [
  HasAltText,
  HasBlockId,
  HasEnd,
  HasImageUrl,
  HasTitle,
]);
