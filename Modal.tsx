import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { ModalContext, ModalContextType } from '../../../contexts'
import { ComponentPropsType } from '../../../utils'
import { ModalDialog } from './index'

export interface ModalPropsType extends ComponentPropsType, ModalContextType {
  /** Content of modal dialog. */
  children: ReactNode
  /** Optional size of modal content. */
  size?: 'small' | 'large'
}

export const Modal = ({
  children,
  disableDefaultCloseBehavior,
  hide,
  identification,
  isFocused,
  isVisible,
  reference,
  show,
  size,
  testId,
  theme
}: ModalPropsType): JSX.Element => {
  const modalContext = {
    disableDefaultCloseBehavior,
    isVisible,
    isFocused,
    reference,
    identification,
    hide,
    show
  }

  return (
    <ModalContext.Provider value={modalContext}>
      {isVisible
        ? createPortal(
            <ModalDialog size={size} testId={testId} theme={theme}>
              {children}
            </ModalDialog>,
            document.body
          )
        : null}
    </ModalContext.Provider>
  )
}
