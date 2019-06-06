import { Rule } from 'glamor'
import { Themer } from '../../../../themer'
import memoizeClassName from '../utils/memoizeClassName'
import scales from '../foundational-styles/scales'
import {
  getTextColorForIntent,
  getPrimaryButtonStylesForIntent
} from '../helpers'
import { defaultControlStyles } from '../shared'

/**
 * Disabled styles are all the same for all buttons.
 */
const { disabled } = defaultControlStyles

/**
 * Get button appearance.
 * @param appearance - default, primary, minimal.
 * @param intent - none, success, warning, danger.
 * @return the appearance of the button.
 */
const getButtonAppearance = (appearance: string, intent: string): Rule => {
  switch (appearance) {
    case 'primary': {
      const { linearGradient, focusColor } = getPrimaryButtonStylesForIntent(
        intent
      )
      return Themer.createButtonAppearance({
        disabled,
        base: {
          color: 'white',
          backgroundColor: 'white',
          backgroundImage: linearGradient.base,
          boxShadow: `inset 0 0 0 1px ${
            scales.neutral.N5A
          }, inset 0 -1px 1px 0 ${scales.neutral.N2A}`
        },
        hover: {
          backgroundImage: linearGradient.hover
        },
        focus: {
          boxShadow: `0 0 0 3px ${focusColor}, inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 -1px 1px 0 ${scales.neutral.N5A}`
        },
        active: {
          backgroundImage: linearGradient.active,
          boxShadow: `inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        },
        focusAndActive: {
          boxShadow: `0 0 0 3px ${focusColor}, inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        }
      })
    }

    case 'minimal': {
      const intentTextColor = getTextColorForIntent(intent, scales.blue.B9)
      return Themer.createButtonAppearance({
        disabled,
        base: {
          color: intentTextColor,
          backgroundColor: 'transparent'
        },
        hover: {
          backgroundColor: scales.neutral.N2A
        },
        focus: {
          boxShadow: `0 0 0 3px ${scales.blue.B5A}`
        },
        active: {
          backgroundImage: 'none',
          backgroundColor: scales.blue.B3A
        },
        focusAndActive: {}
      })
    }

    case 'default':
    default: {
      const intentTextColor = getTextColorForIntent(intent)
      return Themer.createButtonAppearance({
        disabled,
        base: {
          color: intentTextColor,
          ...defaultControlStyles.base
        },
        hover: defaultControlStyles.hover,
        focus: defaultControlStyles.focus,
        active: defaultControlStyles.active,
        focusAndActive: defaultControlStyles.focusAndActive
      })
    }
  }
}

/**
 * Get the className of a `Button`|`IconButton`.
 * @param appearance - default, primary, minimal.
 * @param intent - none, success, warning, danger.
 * @return the appearance class name.
 */
export default memoizeClassName(getButtonAppearance)