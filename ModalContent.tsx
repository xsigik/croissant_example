import React, { ReactNode, useContext } from 'react'

import { ModalContext } from '../../../contexts'
import { ComponentPropsType, cx } from '../../../utils'

export interface ModalContentPropsType extends ComponentPropsType {
  /** Children to be rendered in the main container. */
  children: ReactNode | ReactNode[]
}

export const ModalContent = ({ children, testId, theme }: ModalContentPropsType): JSX.Element => {
  const { identification: identificator } = useContext(ModalContext)
  return (
    <div className={cx('c-modal__body', theme)} data-testid={testId} id={`${identificator}_content"`}>
      {children}
    </div>
  )
}
