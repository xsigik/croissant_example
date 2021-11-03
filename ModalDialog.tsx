import React, { ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react'

import { ModalContext } from '../../../contexts'
import { ComponentPropsType, cx } from '../../../utils'

export interface ModalDialogPropsType extends ComponentPropsType {
  /** Children to be rendered in the main container. */
  children: ReactNode
  /** Optional size of modal content. */
  size?: 'small' | 'large'
}

export const ModalDialog = ({ children, size, testId, theme }: ModalDialogPropsType): JSX.Element => {
  const { disableDefaultCloseBehavior, identification, reference } = useContext(ModalContext)
  const [scroll, setScroll] = useState('')

  const updateSize = () => {
    const modalContent = document.getElementById(`${identification}_content`)
    if (modalContent && modalContent.scrollHeight > modalContent.clientHeight) {
      setScroll('c-modal__content--scrolling')
    } else {
      setScroll('')
    }
  }

  useEffect(() => updateSize, [children])

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <aside
      ref={reference}
      aria-labelledby={`${identification}_title`}
      className={cx('c-modal')}
      data-testid={testId}
      role={disableDefaultCloseBehavior ? 'alertdialog' : 'dialog'}
    >
      <div
        className={cx(
          'c-modal__content',
          {
            [`${scroll}`]: scroll,
            [`c-modal__content--${size}`]: size
          },
          theme
        )}
      >
        {children}
      </div>
    </aside>
  )
}
