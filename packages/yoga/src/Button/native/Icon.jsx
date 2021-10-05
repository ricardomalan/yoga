import React, { forwardRef } from 'react';
import styled, { withTheme } from 'styled-components';
import { node, oneOfType, func, bool } from 'prop-types';
import Icon from '../../Icon';
import withTouchable from './withTouchable';

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({
    large,
    secondary,
    theme: {
      yoga: {
        components: { button },
      },
    },
    disabled,
    inverted,
    pressed,
  }) => {
    const state = secondary ? 'secondary' : 'primary';

    return `
      border-radius: ${button.border.radius}px;

      background-color: ${
        button.types.contained.backgroundColor[state].default
      };

      width: ${
        large ? button.types.icon.size.large : button.types.icon.size.default
      }px;
      height: ${
        large ? button.types.icon.size.large : button.types.icon.size.default
      }px;

      ${
        !disabled && pressed
          ? `
        background-color: ${button.types.contained.backgroundColor[state].pressed};
      `
          : ''
      }

      ${
        disabled
          ? `
        background-color: ${button.types.contained.backgroundColor.disabled};
      `
          : ''
      }

      ${
        inverted && !disabled
          ? `
          background-color: ${button.types.contained.font.default.color};
        `
          : ''
      }
    `;
  }}
`;

const ButtonIcon = forwardRef(
  (
    {
      icon,
      theme: {
        yoga: {
          components: { button },
        },
      },
      large,
      pressed,
      disabled,
      inverted,
      secondary,
      ...props
    },
    ref,
  ) => {
    const state = secondary ? 'secondary' : 'primary';
    let textColor = button.types.contained.font.default.color;

    if (disabled) {
      textColor = button.types.contained.font.disabled.color;
    } else if (inverted) {
      textColor = button.types.contained.backgroundColor[state].default;
      if (pressed) {
        textColor = button.types.contained.backgroundColor[state].pressed;
      }
    } else if (pressed) {
      textColor = button.types.contained.font.pressed.color;
    }

    return (
      <ButtonContainer
        {...props}
        ref={ref}
        large={large}
        pressed={pressed}
        disabled={disabled}
        inverted={inverted}
        secondary={secondary}
        accessibilityRole="button"
      >
        <Icon
          as={icon}
          fill={textColor}
          size={
            large ? button.types.icon.svg.large : button.types.icon.svg.default
          }
        />
      </ButtonContainer>
    );
  },
);

ButtonIcon.propTypes = {
  large: bool,
  disabled: bool,
  pressed: bool,
  inverted: bool,
  secondary: bool,
  icon: oneOfType([node, func]),
};

ButtonIcon.defaultProps = {
  large: false,
  disabled: false,
  pressed: false,
  inverted: false,
  secondary: false,
  icon: undefined,
};

ButtonIcon.displayName = 'Button.Icon';

export default withTouchable(withTheme(ButtonIcon));
