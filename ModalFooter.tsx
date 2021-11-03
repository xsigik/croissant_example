import React, { ReactNode } from 'react'

import { ComponentPropsType, cx } from '../../../utils'

export interface ModalFooterPropsType extends ComponentPropsType {
  /** Children to be rendered in the main container. */
  children: ReactNode | ReactNode[]
}

export const ModalFooter = ({ children, testId, theme }: ModalFooterPropsType): JSX.Element => (
  <footer className={cx('c-modal__footer', theme)} data-testid={testId}>
    {children}
  </footer>
)
